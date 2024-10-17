let display = "";
let n1, n2, oper;

function numberPress(n)
{
    document.getElementById('schermo').innerText += n;
}

function deleteAll()
{
    n1 = 0;
    n2 = 0;
    display = "";
    document.getElementById('schermo').innerText = display;
}

function operPress(op)
{
    n1 = document.getElementById('schermo').innerText;
    document.getElementById('schermo').innerText = "";
    oper = op;
}

function drawRes(){
    n2 = document.getElementById('schermo').innerText;
    n1 = parseInt(n1);
    n2 = parseInt(n2);

    switch(oper){
        case '+':
            display = n1 + n2;
            break;
        case '-':
            display = n1 - n2;
            break;
        case '*':
            display = n1 * n2;
            break;
        case '/':
            if (n2 != 0)
                display = n1 / n2;
            else
                display = "Divisione per 0";
            break;
        case '^':
            display = n1 ** n2;
            break;
    }

    document.getElementById('schermo').innerText = display;
}