// (function () {
    let gameBoard = {
        array: [
            ``, ``, ``,
            ``, ``, ``,
            ``, ``, ``,
        ],
        init: function(){
            this.domDefine();
            this.renderGrid();
        },
        domDefine: function(){
            this.$board = document.querySelector(`.game-board`);
            this.$boardChild = document.querySelector(`.game-board-child`);
        },
        renderGrid: function(){
            for(i = 0; i < this.array.length; i++){
                let grid = document.createElement(`div`);
                this.$board.appendChild(grid);
                grid.className = `grid ${i}`;
                grid.id = i;
                grid.textContent = this.array[i];
            };
            gameBoard.addListeners();
        },
        wipeGrid: function(){
            for(i = 0; i < this.array.length; i++){
                document.getElementById(i).remove();
            };
        },
        addListeners: function(){
            for(i = 0; i < this.array.length; i++){
                document.getElementById(i).addEventListener(`click`, this.markBoard);
            };
        },
        markBoard: function(){
            // for(const num of this.array){
            //     this.array[num]
            // }
            gameBoard.array[this.id] = player1.getShape;
            gameBoard.wipeGrid();
            gameBoard.renderGrid();
        },
        roundCounter: function(){
            let round = 0;
            
        }
    };
    const player = function(name, shape){
        const getShape = shape;
        const getName = name;
        const selectGrid = function(){
            console.log(`hello`);
        };
        return {selectGrid, getShape, getName}
    };
    const player1 = player(`player 1`, `X`);
    const player2 = player(`Player 2`, `O`);
    gameBoard.init();
// })();