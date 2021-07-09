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
    let height = 10;

    if (input.value > 0 && container.children.length === 0 && errors.length === 0) {
        for (let i = 0; i < input.value; i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            height += height * 0.005;
            line.style.height = height + '%';
            arr.push(line);
        }

        const shuffledArr = arr.sort((a, b) => 0.5 - Math.random());

        shuffledArr.forEach(line => container.appendChild(line));

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

    if (!sorted) {
        const arr = Array.from(container.children);

        // Sort lines from shortest to tallest
        arr.sort((a, b) => a.style.height > b.style.height ? 1 : -1);

        rearrangeLines(arr);
        sorted = true;
    }
}

function rearrangeLines(arr) {
    for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
            for (let j = 0; j < container.children.length; j++) {
                if (arr[i].style.height === container.children[j].style.height) {
                    container.children[j].remove();
                    container.appendChild(arr[i]);
                }
            }
        }, i * 30);
    }
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
    msg.innerText = '';
}

function handleErrors(action) {

    errors = [];

    const btn = action

    if (container.children.length === 0) {

        if (btn == 'add' && input.value > 400 || btn == 'add' && input.value < 10) {
            errors.push('Empty field');

            input.style.border = '2px solid red';
            msg.style.display = 'flex';
            msg.innerText = 'Add a number between 10-400';
        }
    
        if (btn == 'sort') {
            errors.push('No lines');

            input.style.border = '2px solid red';
            msg.style.display = 'flex';
            msg.innerText = 'Add lines';
        }
    }
}