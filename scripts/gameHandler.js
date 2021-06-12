class GameHandler {

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

    setCurrentDate(){
        let now = new Date();
        let date = now.toLocaleDateString();
        let hour = now.toLocaleTimeString();

        let currentDate = date.split("/");
        currentDate = currentDate[2] + "-" + currentDate[1] + "-" + currentDate[0];
        currentDate = currentDate + "T" + hour;

        return currentDate;
    }

    async authenticate(player){
        const api = new Api();

        let response = await api.postRequest('/api/authentication', player);
        
        if(!response.ok){
            if(response.status == 404){
                document.querySelector('#modal-authentication').style.display = 'block'
                return;
            }

            window.location.href = "error.html";
            return;
        }

        let playerAuthorized = await response.json();
        console.log(playerAuthorized)

        let startedAt = gameHandler.setCurrentDate();
        localStorage.setItem('startedAt', startedAt);
    }
}
