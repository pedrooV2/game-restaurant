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


    async endGame() {
        const gameHandler = new GameHandler();
        const api = new Api();

        let gameResult = [];

        const ad = localStorage.getItem('ad');
        const cpf = localStorage.getItem('cpf');
        const startedAt = localStorage.getItem('startedAt');

        if(!gameHandler.isAuthenticated()){
            window.location.href = "404.html";
            return;
        }

        let player = {
            ad,
            cpf,
            played: true,
            startedAt,
            endedAt: gameHandler.setCurrentDate()
        };

        this.arrayCharacters.forEach((item) => {
            let element = document.querySelector(`#${item}`);

            let positionX = parseInt(element.style.left, 10) + (element.offsetWidth / 2);
            let positionY = parseInt(element.style.top, 10) + element.offsetHeight;

            let result = {
                character: element.id,
                positionX,
                positionY,
                player
            }

            gameResult.push(result);
        })

        let response = await api.getRequest('/players', `?ad=${player.ad}&cpf=${player.cpf}`);
        
        if(!gameHandler.responseValidator(response)) return;
        
        let getPlayer = await response.json();

        if(getPlayer.played){
            window.location.href = "played.html";
            gameHandler.drawSavedGameSettings();
            return;
        }
        else {
            if(gameResult.length !== 0){
                response = await api.postRequest('/results', gameResult);
                if(!gameHandler.responseValidator(response)) return;
            }
    
            response = await api.putRequest('/players', player)   
            if(!gameHandler.responseValidator(response)) return;
        }

        window.location.href = "success.html";
        gameHandler.drawSavedGameSettings();
    }
}

var game = new Game();

