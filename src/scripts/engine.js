const state = {
    view: {
        //alteram a visualizacão, sentido semântico, variáveis que alteram elemento visual
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        //ponto de colisão para seguir o inimigo
        hitPosition: 0, 
        // para guardar pontuacão geral
        result: 0,
        currentTime: 60,
    },
    actions: {
        countDownTimeId: setInterval(countDown, 1000),
    }
}

//funcão para diminuir o tempo do jogo
function countDown(){
    //variável para lidar com o tempo internamente
    state.values.currentTime--;
    //variável que cuida do tempo visualmente
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0){
        //limpar resultados no sistema, da memória
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.values.timerId);
        alert("GAME OVER! O seu resultado foi: " + state.values.result);
    }
}

//funcão para tocar um áudio
function playSound(audioName) {
    //instanciar um áudio
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

//sortear um inimigo, limpando a classe inimiga dos quadrados
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    // floor arredonda os números
    let randomNumber = Math.floor(Math.random()*9)

    // adiciona a classe inimiga dentro de um quadrado aleatório
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    // para guardar a posicão do inimigo
    state.values.hitPosition = randomSquare.id;
}

// 
function moveEnemy (){
    //criar um intervalo de tempo para movimentar o inimigo nos quadrados
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

//adicionar evento de click
function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () =>{
            //quando o quadrado clicado for o mesmo quadrado sorteado para aparecer o inimigo soma pontos
            if(square.id === state.values.hitPosition){
                state.values.result++
                //para guardar resultado(pontuacão)
                state.view.score.textContent = state.values.result;
                //retornar resultado para o nulo para o usuário não clicar no mesmo lugar infinitamente
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}
//funcão principal que chama funcões iniciais
function initialize(){
    moveEnemy();
    addListenerHitBox();
}

initialize();