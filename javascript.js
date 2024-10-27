const game = (function(){
    const gameBoard = {
        cells: { TL: '', TM: '', TR: '',
                 ML: '', MM: '', MR: '',
                 BL: '', BM: '', BR: '' },
        update: function(symbol, choice){
            this.cells[choice] = symbol;
        },
        isFull: function(){
            const allFull = Object.values(this.cells).every(value => value !== '');
            return allFull;
        },
        reset: function(){
            for (let prop in this.cells){
                if (this.cells.hasOwnProperty(prop)){
                    this.cells[prop] = '';
                }
            }
        },
    };

    const players = [
        {
            name: "Player 1",
            symbol: "X",
            points: 0,
            reset: function(){
                this.points = 0;
            }
        },
        {
            name: "Player 2",
            symbol: "O",
            points: 0,
            reset: function(){
                this.points = 0;
            }
        }
    ];

    const gameRules = {
        winningPatterns:  [["TL", "TM", "TR"],
                           ["ML", "MM", "MR"],
                           ["BL", "BM", "BR"],
                           ["TL", "ML", "BL"],
                           ["TM", "MM", "BM"],
                           ["TR", "MR", "BR"],
                           ["TL", "MM", "BR"],
                           ["BL", "MM", "TR"]],
        checkRoundWin: function(board, players){
            for (const winningPattern of this.winningPatterns){
                const [a, b, c] = winningPattern;
                if (board.cells[a] === board.cells[b] &&
                    board.cells[b] === board.cells[c] &&
                    board.cells[a] !== ''){
                    for (const player of players){
                        if (player.symbol === board.cells[a]){
                            return player;
                        }
                    }
                }
            }
            return null;
        },
        checkGameWin: function(players){
            for (const player of players){
                if (player.points === 3){
                    return player;
                }
            }
            return null;
        }
    }

    const gameController = {
        currentPlayer: null,
        getPlayerInput: function() {
            return new Promise((resolve) => {
                this.resolveInput = resolve;
            });
        },
        makeMove: function(board, event) {
            if (event.target.matches('.game-board-cell')) {
                if (this.currentPlayer) {
                    const cellId = event.target.id;
                    if (board.cells[cellId] === '') {
                        if (this.resolveInput) {
                            this.resolveInput(cellId);
                            this.resolveInput = null;
                        }
                    }
                }
            }
        },
        roundWin: function(player){
            player.points += 1;
        },
        gameWin: function(player, UIController){
            UIController.displayGameWin(player);
        },
        resetGame: function(board, players, UIController){
            board.reset();
            for (const player of players){
                player.reset();
            }
            UIController.update(board, players);
        },
        playRound: async function(board, players, gameRules, UIController){
            outerLoop: while (true){
                innerLoop: for (const player of players){
                    this.currentPlayer = player;
                    let playerChoice = await this.getPlayerInput();
                    board.update(player.symbol, playerChoice);
                    UIController.update(board, players);
                    let roundWinStatus = gameRules.checkRoundWin(board, players);
                    if (roundWinStatus !== null) {
                        this.roundWin(roundWinStatus);
                        board.reset();
                        UIController.update(board, players);
                        return;
                    }
                    if (board.isFull() === true){
                        board.reset();
                        UIController.update(board, players);
                    }
                }
            }
        },
        playGame: async function(board, players, gameRules, UIController) {
            this.resetGame(board, players, UIController);
            while (true) {
                await this.playRound(board, players, gameRules, UIController);
                let gameWinStatus = gameRules.checkGameWin(players);
                if (gameWinStatus !== null) {
                    this.gameWin(gameWinStatus, UIController);
                    break;
                }
            }
        }
    };

    const UIController = {
        elements: {
            mainTitle: document.querySelector(".main-title"),
            playerOneScore: document.querySelector("#player-one-score"),
            playerTwoScore: document.querySelector("#player-two-score"),
            gameBoard: document.querySelector(".game-board"),
            TL: document.querySelector("#TL"),
            TM: document.querySelector("#TM"),
            TR: document.querySelector("#TR"),
            ML: document.querySelector("#ML"),
            MM: document.querySelector("#MM"),
            MR: document.querySelector("#MR"),
            BL: document.querySelector("#BL"),
            BM: document.querySelector("#BM"),
            BR: document.querySelector("#BR")
        },
        update: function(board, players){
            for (const player of players){
                if (player.name === "Player 1"){
                    this.elements.playerOneScore.textContent = "Player 1: " + player.points;
                }
                if (player.name === "Player 2"){
                    this.elements.playerTwoScore.textContent = "Player 2: " + player.points;
                }
            }
            for (const cellkey in board.cells){
                if (board.cells.hasOwnProperty(cellkey) &&
                    this.elements.hasOwnProperty(cellkey)){
                    this.elements[cellkey].textContent = board.cells[cellkey];
                }
            }
        },
        displayGameWin: function(player){
            this.elements.mainTitle.textContent = player.name + " Wins!"
        },
        initializeEventListeners: function(board, gameController) {
            this.elements.gameBoard.addEventListener('click', (event) => {
                gameController.makeMove(board, event);
            });
        }
    }

    UIController.initializeEventListeners(gameBoard, gameController);

    const returnObject = {
        start: function(){
            gameController.playGame(gameBoard, players, gameRules, UIController);
        },
        reset: function(){
            gameController.resetGame(gameBoard, players, UIController);
        }
    };

    const {start, reset} = returnObject;

    return {
        start,
        reset
    };
})();

game.start();