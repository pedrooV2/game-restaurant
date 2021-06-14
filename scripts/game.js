const gameHandler = new GameHandler();
gameHandler.checkInvalidAuthentication();

var dragOfX = 0,
    dragOfY = 0,
    startPositionLeft = 0,
    startPositionTop = 0;

var element;

const elPage = document.querySelector('.flex-container');
const elGameScreen = document.querySelector('#game-screen');
const elCharacters = document.querySelectorAll('.character');
const elModalLimit = document.querySelector("#modal-limit");


elCharacters.forEach(e => {
    e.addEventListener('mousedown', dragStart);
});

function dragStart(e) {
    // Set current element dragging
    element = this;
    startPositionTop = element.offsetTop;
    startPositionLeft = element.offsetLeft;

    dragOfX = e.pageX - element.offsetLeft;
    dragOfY = e.pageY - element.offsetTop;

    addEventListener('mousemove', dragMove);
    addEventListener('mouseup', dragEnd);
}

function dragMove(e) {
    element.style.position = 'absolute';
    element.style.left = (e.pageX - dragOfX) + 'px';
    element.style.top = (e.pageY - dragOfY) + 'px';
}

function dragEnd() {

    removeEventListener('mousemove', dragMove);
    removeEventListener('mouseup', dragEnd);

    if (elPage.classList.contains('shake-horizontal')) {
        elPage.classList.remove('shake-horizontal');
    }

    // Check if that element is in the array
    if (game.arrayCharacters.indexOf(element.id) == -1) {
        // Check if the position of the element is within the game
        if (calcelGameScreenAndElementWidth(element) && calcelGameScreenAndElementHeight(element)) {
            // Check the length of the array is less than the max length
            if (game.arrayCharacters.length < 18) {
                game.arrayCharacters.push(element.id);
                game.updateCounter();
                game.saveGame();
            } else {
                returnToStartPosition(element);
                elPage.classList.add('shake-horizontal');
                elModalLimit.style.display = "block";
            }
        } else {
            returnToStartPosition(element);
        }
    } else {
        // Check if the element is still in the array. If not, remove element from the array
        if (!calcelGameScreenAndElementWidth(element) || !calcelGameScreenAndElementHeight(element)) {
            game.arrayCharacters.splice(game.arrayCharacters.indexOf(element.id), 1);
            returnToStartPosition(element);
            game.updateCounter();
            game.saveGame();
        } else {
            // If the element is already in the array, just update its position
            game.saveGame();
        }
    }
}

// Calc element position Left
var calcelGameScreenAndElementWidth = (element) =>
    element.offsetLeft <= elGameScreen.offsetWidth;

// Calc element position Top
var calcelGameScreenAndElementHeight = (element) =>
    element.offsetTop <= elGameScreen.offsetHeight;

// Return element to original position
var returnToStartPosition = (element) => {
    element.style.position = '';
    element.style.top = '';
    element.style.left = '';
}

// Close modal
function closeModal(modal) {
    let elModal = document.querySelector(`#${modal}`);
    elModal.style.display = 'none';
}

// Modal End Game
const endGameBtn = document.querySelector(".end-game").children[0];
endGameBtn.onclick = () => {
    document.querySelector("#modal-end-game").style.display = "block";
}

// End Game
const confirmBtn = document.querySelector(".btn-confirm").children[0];

confirmBtn.onclick = async (e) => {
    loaderHandler(true);
    console.log('ativo')

    await game.endGame();
    
    loaderHandler(false);
    closeModal('modal-end-game');
}

// Toggle loader confirm button end game
function loaderHandler(activeLoader){
    const loader = document.querySelector("#loaderEndGame");
    const confirmText = document.querySelector("#confirmText");

    if(activeLoader){
        confirmBtn.disabled = true;
        loader.style.display = "flex"
        confirmText.innerHTML = ""
    } else {
        loader.style.display = "none"
        confirmText.innerHTML = "Confirmar"
    }
}
