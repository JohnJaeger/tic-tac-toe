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

    const players = {
        player1: {
            symbol: "X",
            points: 0
        },
        player2: {
            symbol: "O",
            points: 0
        }
    }

    return {
        gameBoard,
        players
    };
})();