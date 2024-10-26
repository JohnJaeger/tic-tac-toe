const game = (function(){
    const gameBoard = {
        cells: { TL: '', TM: '', TR: '',
                 ML: '', MM: '', MR: '',
                 BL: '', BM: '', BR: '' },
        update: function(symbol, choice){
            this.cells[choice] = symbol;
        },
        display: function(){
            console.log(this.cells.TL + " | " + this.cells.TM + " | " + this.cells.TR);
            console.log("----------");
            console.log(this.cells.ML + " | " + this.cells.MM + " | " + this.cells.MR);
            console.log("----------");
            console.log(this.cells.BL + " | " + this.cells.BM + " | " + this.cells.BR);
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

    const gameLogic = {
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
        roundWin: function(player){
            player.points += 1;
        },
        checkGameWin: function(players){
            for (const player of players){
                if (player.points === 3){
                    return player;
                }
            }
            return null;
        },
        gameWin: function(player){
            console.log(player.name + " Wins!");
        },
        getPlayerInput: function(player){
            const playerChoice = prompt(player.name + " what is your choice?", "").toUpperCase();
            return {player, playerChoice};
        },
        playRound: function(board, players){
            for (const player of players){
                console.log(player.name + ": " + player.points);
            }
            outerLoop: while (true){
                innerLoop: for (const player of players){
                    board.display();
                    let playerInput = this.getPlayerInput(player);
                    board.update(playerInput.player.symbol, playerInput.playerChoice);
                    let roundWinStatus = this.checkRoundWin(board, players);
                    if (roundWinStatus !== null){
                        this.roundWin(roundWinStatus);
                        board.display();
                        board.reset();
                        break outerLoop;
                    } else {
                        continue;
                    }
                }
            }
        },
        playGame: function(board, players){
            while (true){
                this.playRound(board, players);
                let gameWinStatus = this.checkGameWin(players);
                if (gameWinStatus !== null){
                    this.gameWin(gameWinStatus);
                    break;
                }
            }
        }
    };

    return {
        gameBoard,
        players,
        gameLogic
    };
})();