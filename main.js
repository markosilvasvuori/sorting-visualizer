const container = document.querySelector('.sorting-container');
const startBtn = document.querySelector('.btn');

startBtn.addEventListener('click', start);

function start(e) {
    e.preventDefault();

    createLines();
    sortLines();
}

function createLines() {
    const input = document.querySelector('.lines-input');
    const arr = [];
    let height = 10;

    for (let i = 0; i < input.value; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        height += height * 0.005;
        line.style.height = height + '%';
        arr.push(line);
    }

    const shuffledArr = arr.sort((a, b) => 0.5 - Math.random());

    shuffledArr.forEach(line => container.appendChild(line));

    return;
}

function sortLines() {
    const arr = Array.from(container.children);
    console.log(arr)
    
}