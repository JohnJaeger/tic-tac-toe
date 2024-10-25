const game = (function(){
    const gameBoard = {
        cells: { TL: '', TM: '', TR: '',
                 ML: '', MM: '', MR: '',
                 BL: '', BM: '', BR: '' },
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
            symbol: "X",
            points: 0,
            reset: function(){
                this.points = 0;
            }
        },
        {
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
        checkRoundWin: function(){
            for (const winningPattern of this.winningPatterns){
                const [a, b, c] = winningPattern;
                if (gameBoard.cells[a] === gameBoard.cells[b] &&
                    gameBoard.cells[b] === gameBoard.cells[c] &&
                    gameBoard.cells[a] !== ''){
                    return gameBoard.cells[a];
                }
            }
            return null;
        },
        roundWin: function(){
            for (const player of players){
                if (player.symbol === this.checkRoundWin()){
                    player.points += 1;
                }
            }
        },
        checkGameWin: function(){
            for (const player of players){
                if (player.points === 3){
                    return player;
                }
            }
            return null;
        },
        gameWin: function(){
            for (const player of players){
                if (player === this.checkGameWin()){
                    console.log(player + " Wins!");
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