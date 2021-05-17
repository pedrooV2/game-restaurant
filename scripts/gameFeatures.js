class Game {
    constructor() {
        this.elCountCharacters = document.querySelector('.count-character');
        this.arrayCharacters = [];
        this.loadGame();
    }

    // Save game in local storage
    saveGame() {
        let arrChars = [];

        this.arrayCharacters.forEach((element) => {
            let left = document.querySelector(`#${element}`).style.left;
            let top = document.querySelector(`#${element}`).style.top;
            arrChars.push([element, left, top]);
        })

        localStorage.setItem('characters', JSON.stringify(arrChars));
    }

    //  Load game from local storage
    loadGame() {
        let arrChars = JSON.parse(localStorage.getItem('characters'));

        if (arrChars != null) {
            arrChars.forEach((item) => {
                let elementOnScreen = document.querySelector(`#${item[0]}`);
                elementOnScreen.style.position = 'absolute'
                elementOnScreen.style.left = item[1];
                elementOnScreen.style.top = item[2];

                this.arrayCharacters.push(elementOnScreen.id)
            })
        }
        this.updateCounter();
    }

    // Update counter
    updateCounter() {
        // let elCountCharacters = document.querySelector('.count-character');
        this.elCountCharacters.textContent = this.arrayCharacters.length;
    }

    drawSavedGameSettings() {
        localStorage.removeItem('characters');
        localStorage.removeItem('playingTime');
    }

    checkStatedTimeHasBeenSet(){
        let startedAtExists = localStorage.getItem('startedAt');
        
        if(startedAtExists == null || startedAtExists == ""){
            let startedAt = new Date().toISOString()
            localStorage.setItem('startedAt', startedAt);
        }
    }

    async endGame() {
        let gameResult = [];

        const ad = localStorage.getItem('player');
        const startedAt = localStorage.getItem('startedAt');

        const gameHandler = new GameHandler();

        this.arrayCharacters.forEach((item) => {
            let element = document.querySelector(`#${item}`);

            let positionX = parseInt(element.style.left, 10) + (element.offsetWidth / 2);
            let positionY = parseInt(element.style.top, 10) + element.offsetHeight;

            let result = {
                character: element.id,
                positionX,
                positionY,
                playerAd: ad
            }

            gameResult.push(result);
        })

        let player = {
            ad,
            played: true,
            startedAt,
            EndedAt: gameHandler.setCurrentDate()
        };

        const api = new Api();

        const playerExists = await api.getRequest(`/players/${ad}`)            
        .then(response => {
            return response;         
        })

        if(playerExists.ok){
            window.location.href = "played.html"
        } 
        else {
            const playerRegistered = await api.postRequest(`/players/`, player)
            .then(response => { return response })
    
            if(playerRegistered.ok){
                if(gameResult != []){
                    await api.postRequest(`/results/`, gameResult)
                    .then(response => {
                        if(response.ok){
                            window.location.href = "success.html"
                        }
                    })
                }
            }
        }

        this.drawSavedGameSettings();
        closeModal('modal-end-game');        
    }
}

var game = new Game();
game.checkStatedTimeHasBeenSet();