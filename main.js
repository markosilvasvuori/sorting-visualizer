const container = document.querySelector('.sorting-container');
const addBtn = document.querySelector('#add-btn');
const sortBtn = document.querySelector('#sort-btn');
const resetBtn = document.querySelector('#reset-btn');
const input = document.querySelector('.lines-input');
const msg = document.querySelector('.msg');
let errors = [];
let sorted = false;

addBtn.addEventListener('click', createLines);
sortBtn.addEventListener('click', sortLines);
resetBtn.addEventListener('click', reset)

function createLines(e) {
    e.preventDefault();

    handleErrors('add');

    const arr = [];
    let height = 90;

    if (input.value > 0 && container.children.length === 0 && errors.length === 0) {
        for (let i = 0; i < input.value; i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            height -= height * 0.007;
            line.style.height = height + '%';
            arr.push(line);
        }

        const shuffledArr = arr.sort((a, b) => 0.5 - Math.random());

        // shuffledArr.forEach(line => container.appendChild(line));

        for (let i = 0; i < shuffledArr.length; i++) {
            setTimeout(() => {
                container.appendChild(shuffledArr[i]);
            }, i * 2);
        }

        input.value = '';
        sorted = false;
        input.style.border = 'none';
        msg.style.display = 'none';
        msg.innerText = '';
    }
}

function sortLines(e) {
    e.preventDefault();

    handleErrors('sort');

    if (!sorted && errors.length === 0) {
        const arr = Array.from(container.children);

        // Sort lines from shortest to tallest
        arr.sort((a, b) => a.style.height > b.style.height ? 1 : -1);

        rearrangeLinesInDOM(arr);

        msg.style.display = 'none';
        msg.innerText = '';
        sorted = true;
    }
}

function rearrangeLinesInDOM(arr) {
    const len = arr.length;
    let counter = 0;
    let done = false;

    for (let i = 0; i < len; i++) {
        setTimeout(() => {
            if (i < len-1) {
                arr[i+1].classList.add('line-mask');
                counter++
            } else {
                done = true;
            }
            
            arr[i].classList.remove('line-mask');

            for (let j = 0; j < len; j++) {
                if (arr[i].style.height === container.children[j].style.height) {
                    container.children[j].remove();
                    container.appendChild(arr[i]);
                }
            }

            if (done) {
                msg.style.backgroundColor = 'green';
                msg.style.display = 'flex';
                msg.innerText = 'Done!';
            }

        }, i * 30);
    }
    return;
}

function reset(e) {
    e.preventDefault();

    const lines = document.querySelectorAll('.line');

    for (let i = 0; i < lines.length; i++) {
        lines[i].remove();
    }

    errors = [];
    sorted = false;
    input.value = '';
    input.style.border = 'none';
    msg.style.display = 'none';
    msg.style.backgroundColor = '#D54C4C';
    msg.innerText = '';
}

function handleErrors(action) {

    errors = [];

    const btn = action;

    if (container.children.length === 0) {

        if (btn == 'add' && input.value > 200 || btn == 'add' && input.value < 10) {
            errors.push('Empty field');

            input.style.border = '2px solid #D54C4C';
            msg.style.display = 'flex';
            msg.innerText = 'Add a number between 10-200';
        }
    
        if (btn == 'sort') {
            errors.push('No lines');

            input.style.border = '2px solid #D54C4C';
            msg.style.display = 'flex';
            msg.innerText = 'Add lines';
        }
    } else if (container.children.length !== 0 && sorted) {
        msg.style.display = 'flex';
        msg.innerText = 'Click "Reset"';
    } else {
        msg.style.display = 'flex';
        msg.innerText = 'Click "Sort"';
    }
}