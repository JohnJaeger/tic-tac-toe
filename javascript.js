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
                if (board[a] === board[b] &&
                    board[b] === board[c] &&
                    board[a] !== ''){
                    for (const player of players){
                        if (player.symbol === board[a]){
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
            console.log(player + " Wins!");
        },
        getPlayerInput: function(player){
            const playerChoice = prompt("What is your choice?", "");
            return {player, playerChoice}
        }
    };

    return {
        gameBoard,
        players,
        gameLogic
    };
})();