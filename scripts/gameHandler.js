class GameHandler {

    // Não é mais utilizado
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

    isAuthenticated() {
        let player = localStorage.getItem('ad');
        return (player != null && player != "") ? true : false;
    }

    checkInvalidAuthentication() {
        if (!this.isAuthenticated()) {
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
    
    drawSavedGameSettings() {
        localStorage.clear();
    }

    async authenticate(player){
        const api = new Api();

        let response = await api.postRequest('/authentication', player);
        
        if(!response.ok){
            if(response.status == 404){
                document.querySelector('#modal-authentication').style.display = 'block'
                return;
            }

            window.location.href = "error.html";
            return;
        }

        let playerAuthorized = await response.json();
        let startedAt = gameHandler.setCurrentDate();


        localStorage.setItem('ad', playerAuthorized.ad);
        localStorage.setItem('cpf', playerAuthorized.cpf);
        localStorage.setItem('startedAt', startedAt);

        window.location.href = 'instructions.html';
    }

    responseValidator(response){
        if(!response.ok){
            if(response.status == 404 || response.status == 400){
                window.location.href = "404.html";
            } 
            else {
                window.location.href = "error.html";
            }

            this.drawSavedGameSettings();
            return false;
        }

        return true;
    }
    
}

