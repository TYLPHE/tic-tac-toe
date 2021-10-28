// (function () {
    let gameBoard = {
        array: [
            `x`, `x`, `x`,
            `x`, `x`, `x`,
            `x`, `x`, `o`,
        ],
        init: function(){
            this.domDefine();
            this.renderGrid();
        },
        domDefine: function(){
            this.$board = document.querySelector(`.game-board`);
            this.$boardChild = document.querySelector(`.game-board-child`);
        },
        render: function(){
            let data = this.array;
            this.$boardChild.textContent = ``;
            for(let i = 0; i < data.length; i++){
                this.$boardChild.textContent += `${data[i]}, `;
            };
        },
        renderGrid: function(){
            for(i = 0; i < this.array.length; i++){
                let grid = document.createElement(`div`);
                this.$board.appendChild(grid);
                grid.className = `grid ${i}`;
                grid.textContent = i;
            }
        }
    };
    gameBoard.init();
// })();