const instructions = document.querySelectorAll('.instructions');
const btnNext = document.querySelector('#btn-next');
const btnPreview = document.querySelector('#btn-preview');
const btnPlay = document.querySelector('#btn-play');

instructions[0].classList.add('show');

var currentInstruction = 0;

btnNext.onclick = () => {

    if (currentInstruction != instructions.length - 1) {
        instructions[currentInstruction].classList.remove('show');
        currentInstruction += 1;
        instructions[currentInstruction].classList.add('show');
    }

    verifyBtnPreview()
    verifyCurrentInstruction()
};

btnPreview.onclick = () => {

    if (currentInstruction >= 0) {
        instructions[currentInstruction].classList.remove('show');
        currentInstruction -= 1;
        instructions[currentInstruction].classList.add('show');
    }

    if (currentInstruction == instructions.length - 1) {
        btnNext.style.display = 'none';
        btnPlay.style.display = 'block';
    }

    verifyBtnPreview()
    verifyCurrentInstruction()
};

function verifyBtnPreview() {
    if (currentInstruction != 0) {
        btnPreview.style.display = 'block';
    } else {
        btnPreview.style.display = 'none';
    }
}

function verifyCurrentInstruction() {
    if (currentInstruction == instructions.length - 1) {
        btnNext.style.display = 'none';
        btnPlay.style.display = 'flex';
    } else {
        btnNext.style.display = 'flex';
        btnPlay.style.display = 'none';
    }
}