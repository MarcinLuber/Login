let ruch = 0;
let pos;
let poz;
let code;
let wynik;
let WinnerPositionArray;
const player1 = 'url(img/o.jpg)';
const player2 = 'url(img/x.jpg)';

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [0, 1, 2], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6],
];
const winConditionsColor = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [0, 1, 2], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6],
];
let turn = player1;     //domyślnie zaczyna gracz 1
function tekst(text, color) {
    document.querySelector("#board").style.backgroundColor = color;
    document.querySelector("#board").textContent = text;
}

function light() {
    for (let y = 0; y < 3; y++) {
        poz = winConditionsColor[WinnerPositionArray][y];
        function redLightInterval(poz) {
            setInterval(function () {
                redLight(poz + 1);
            }, 2000);
        }
        redLightInterval(poz);
    }
}





function changePlayer() {
    if (ruch < 1) {
        if (turn === player2) {
            turn = player1;
            tekst('ZMIENIONO NA ⦾', 'red');
            document.querySelector("button").style.backgroundColor = 'red';
        } else {
            turn = player2;
            tekst('ZMIENIONO NA ⊗', 'blue');
            document.querySelector("button").style.backgroundColor = 'blue';
        }
    } else {
        alert('NIE MOŻNA ZMIENIAĆ GRACZA PODCZAS GRY!');
    }
}

function checkWin() {
    if (ruch === 9 && wynik === false) {
        tekst('REMIS', 'green');
    }

    for (let x = 0; x < 9; x++) {
        let isBelowThreshold = (currentValue) => currentValue === 'o';
        wynik = winConditions[x].every(isBelowThreshold);
        if (wynik === true) {
            WinnerPositionArray = x;
            tekst('WYGRAŁ GRACZ ⦾', 'green');
            light();
            code = true;
        }
    }
    for (let x = 0; x < 9; x++) {
        let isBelowThreshold = (currentValue) => currentValue === 'x';
        wynik = winConditions[x].every(isBelowThreshold);
        if (wynik === true) {
            WinnerPositionArray = x;
            tekst('WYGRAŁ GRACZ ⊗', 'green');
            light();
            code = true;
        }
    }
}

function checkAll(tekst) {
    for (let x = 0; x < 9; x++) {
        spr(x);
    }

    function spr(x) {
        for (let y = 0; y < 3; y++) {
            if (winConditions[x][y] == pos) {
                winConditions[x][y] = tekst;
            }
        }
    }
}

function kliknij(x) {
    x.addEventListener("click", function () {
        if (!x.classList.contains('clicked')) {
            if (!code) {
                if (turn === player1) {
                    x.style.backgroundImage = player1;
                    tekst('KOLEJ GRACZA : ⊗', 'blue');
                    pos = x.getAttribute("data-position");
                    checkAll('o');
                    ruch++;
                    turn = player2;
                } else {
                    x.style.backgroundImage = player2;
                    turn = player1;
                    tekst('KOLEJ GRACZA : ⦾', 'red');
                    pos = x.getAttribute("data-position");
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

const array1 = [t1, t2, t3, t4, t5, t6, t7, t8, t9];
array1.forEach(element => kliknij(element));

function flash(id, kolor, czas, kolor2) {
    let identyfikator = '#t' + id;
    document.querySelector(identyfikator).style.border = kolor;
    setTimeout(function () {
        document.querySelector(identyfikator).style.border = kolor2;
    }, czas);
}

function redLight(x) {
    flash(x, '5px solid red', 500, '5px dotted blue', 500);
}


