let ruch: number = 0;
let pos: number;
let poz: number;
let code: boolean;
let wynik: boolean;
let WinnerPositionArray: number;
const player1: string = 'url(img/o.jpg)';
const player2: string = 'url(img/x.jpg)';

const winConditions: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [0, 1, 2], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6],
];
const winConditionsColor: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [0, 1, 2], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6],
];
let turn: string = player1; // Default start is player 1

function tekst(text: string, color: string): void {
    const boardElement = document.querySelector < HTMLElement > ("#board");
    if (boardElement) {
        boardElement.style.backgroundColor = color;
        boardElement.textContent = text;
    }
}

function light(): void {
    for (let y = 0; y < 3; y++) {
        poz = winConditionsColor[WinnerPositionArray][y];
        function redLightInterval(poz: number): void {
            setInterval(function () {
                redLight(poz + 1);
            }, 2000);
        }
        redLightInterval(poz);
    }
}

function changePlayer(): void {
    if (ruch < 1) {
        if (turn === player2) {
            turn = player1;
            tekst('ZMIENIONO NA ⦾', 'red');
            const buttonElement = document.querySelector < HTMLElement > ("button");
            if (buttonElement) {
                buttonElement.style.backgroundColor = 'red';
            }
        } else {
            turn = player2;
            tekst('ZMIENIONO NA ⊗', 'blue');
            const buttonElement = document.querySelector < HTMLElement > ("button");
            if (buttonElement) {
                buttonElement.style.backgroundColor = 'blue';
            }
        }
    } else {
        alert('NIE MOŻNA ZMIENIAĆ GRACZA PODCZAS GRY!');
    }
}

function checkWin(): void {
    if (ruch === 9 && wynik === false) {
        tekst('REMIS', 'green');
    }

    for (let x = 0; x < 9; x++) {
        let isBelowThreshold = (currentValue: string) => currentValue === 'o';
        wynik = winConditions[x].every(isBelowThreshold);
        if (wynik === true) {
            WinnerPositionArray = x;
            tekst('WYGRAŁ GRACZ ⦾', 'green');
            light();
            code = true;
        }
    }

    for (let x = 0; x < 9; x++) {
        let isBelowThreshold = (currentValue: string) => currentValue === 'x';
        wynik = winConditions[x].every(isBelowThreshold);
        if (wynik === true) {
            WinnerPositionArray = x;
            tekst('WYGRAŁ GRACZ ⊗', 'green');
            light();
            code = true;
        }
    }
}

function checkAll(tekst: string): void {
    for (let x = 0; x < 9; x++) {
        spr(x);
    }

    function spr(x: number): void {
        for (let y = 0; y < 3; y++) {
            if (winConditions[x][y] == pos) {
                winConditions[x][y] = tekst;
            }
        }
    }
}

function kliknij(x: HTMLElement): void {
    x.addEventListener("click", function () {
        if (!x.classList.contains('clicked')) {
            if (!code) {
                if (turn === player1) {
                    (x as HTMLElement).style.backgroundImage = player1;
                    tekst('KOLEJ GRACZA : ⊗', 'blue');
                    pos = Number(x.getAttribute("data-position"));
                    checkAll('o');
                    ruch++;
                    turn = player2;
                } else {
                    (x as HTMLElement).style.backgroundImage = player2;
                    turn = player1;
                    tekst('KOLEJ GRACZA : ⦾', 'red');
                    pos = Number(x.getAttribute("data-position"));
                    checkAll('x');
                    ruch++;
                }
            }
            x.classList.add('clicked');
            console.log('wykonano : ' + ruch + ' ruch');
            checkWin();
        }
    });
}

const array1: HTMLElement[] = [t1, t2, t3, t4, t5, t6, t7, t8, t9];
array1.forEach(element => kliknij(element));

function flash(id: number, kolor: string, czas: number, kolor2: string): void {
    let identyfikator = '#t' + id;
    const element = document.querySelector < HTMLElement > (identyfikator);
    if (element) {
        element.style.border = kolor;
        setTimeout(function () {
            element.style.border = kolor2;
        }, czas);
    }
}

function redLight(x: number): void {
    flash(x, '5px solid red', 500, '5px dotted blue');
}