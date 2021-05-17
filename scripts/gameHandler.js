class GameHandler {

    constructor() {
        this.setPlayerByUrl();
    }

    setPlayerByUrl() {
        let url = new URL(window.location.href);
        let params = url.searchParams;

        if (params.has('player')) {
            let getPlayer = localStorage.getItem('player');

            if (getPlayer == null) {
                let player = params.get('player')
                localStorage.setItem('player', player);
            }

            params.delete('player')
            window.location = url;
        }
    }

    checkPlayerExists() {
        let player = localStorage.getItem('player');
        return (player != null && player != "") ? true : false;
    }

    invalidateGame() {
        if (!this.checkPlayerExists()) {
            window.location.href = "404.html"
        }
    }

    countSecondsPlayed() {
        let chronometer = localStorage.getItem('chronometer')

        if (chronometer != null) {
            chronometer++;
            localStorage.setItem('chronometer', chronometer)
        }
    }

    setCurrentDate(){
        let now = new Date();
        let date = now.toLocaleDateString();
        let hour = now.toLocaleTimeString();

        //to timestamp
        let currentDate = date.split("/");
        currentDate = currentDate[2] + "-" + currentDate[1] + "-" + currentDate[0];
        currentDate = currentDate + "T" + hour;

        return currentDate;
    }
}

const gameHandler = new GameHandler();

gameHandler.invalidateGame();
