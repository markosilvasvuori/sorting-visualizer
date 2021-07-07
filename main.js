const container = document.querySelector('.sorting-container');
const addBtn = document.querySelector('#add-btn');
const sortBtn = document.querySelector('#sort-btn');

addBtn.addEventListener('click', createLines);
sortBtn.addEventListener('click', sortLines);

function createLines(e) {
    e.preventDefault();

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

function sortLines(e) {
    e.preventDefault();

    const arr = Array.from(container.children);

    // Sort lines from shortest to tallest
    arr.sort((a, b) => a.style.height > b.style.height ? 1 : -1);

    // rearrangeLines(arr);

    // Testing my own custom loop
    const amountOfItems = arr.length;
    let arrIndex = 0;
    let containerIndex = 0;
    rearrangeLines(arr, amountOfItems, arrIndex, containerIndex);
}

function rearrangeLines(arr, amountOfItems, arrIndex, containerIndex) {
    setTimeout(() => {
        console.log('Amount of items to sort: ' + amountOfItems)
        if (amountOfItems > 0) {
            if (arr[arrIndex].style.height !== container.children[containerIndex].style.height) {
                console.log('No match')
                containerIndex++
                rearrangeLines(arr, amountOfItems, arrIndex, containerIndex);
            } else {
                console.log('Match')
                container.children[containerIndex].remove();
                container.appendChild(arr[arrIndex]);
                amountOfItems--;
                arrIndex++;
                containerIndex = 0;
                rearrangeLines(arr, amountOfItems, arrIndex, containerIndex);
            }
        } else {
            console.log('DONE');
        }
    }, 1);
}

// function rearrangeLines(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < container.children.length; j++) {
//             if (arr[i].style.height === container.children[j].style.height) {
//                 container.children[j].remove();
//                 container.appendChild(arr[i]);
//             }
//         }
//     }
// }