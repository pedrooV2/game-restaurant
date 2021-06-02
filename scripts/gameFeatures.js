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

    checkStartedTimeHasBeenSet() {
        let startedAtExists = localStorage.getItem('startedAt');

        if (startedAtExists == null || startedAtExists == "") {
            let now = new Date();
            let date = now.toLocaleDateString();
            let hour = now.toLocaleTimeString();

            let currentDate = date.split("/");
            currentDate = currentDate[2] + "-" + currentDate[1] + "-" + currentDate[0];
            currentDate = currentDate + "T" + hour;
            localStorage.setItem('startedAt', currentDate);
        }
    }

    async endGame() {
        let gameResult = [];
        const gameHandler = new GameHandler();
        const api = new Api();

        const ad = localStorage.getItem('player');
        const startedAt = localStorage.getItem('startedAt');

        if (ad == null || ad == "") {
            window.location.href = "404.html";
            return;
        }

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

        let response = await api.getRequest(`/players/${ad}`)

        if (response.status == 200) {
            window.location.href = "played.html";
            this.drawSavedGameSettings();
            closeModal('modal-end-game');
            return;
        }

        if (response.ok && response.status == 204) {
            response = await api.postRequest(`/players/`, player)

            if (response.ok) {
                if (gameResult != []) {
                    await api.postRequest(`/results/`, gameResult)
                }
            } 
        }

        if(response.ok){
            window.location.href = "success.html";
        } else {
            window.location.href = "error.html";
        }

        this.drawSavedGameSettings();
        closeModal('modal-end-game');
    }
}

var game = new Game();
game.checkStartedTimeHasBeenSet();
