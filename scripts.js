(function (){
    let gameBoard = {
        array: [
            ``, ``, ``,
            ``, ``, ``,
            ``, ``, ``,
        ],
        playerTurn: 0,
        init: function(){
            this.domSet();
            this.renderGrid();
        },
        domSet: function(){
            gameBoard.$board = document.querySelector(`.game-board`);
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
                document.getElementById(i).addEventListener(`click`, gameBoard.markBoard);
            };
        },
        removeListeners: function(){
            for(i = 0; i < this.array.length; i++){
                if(this.array[i] !== ``){
                    document.getElementById(i).removeEventListener(`click`, gameBoard.markBoard);
                };
            };
        },
        markBoard: function(){
            gameBoard.array[this.id] = gameBoard.playerplayerTurn();
            gameBoard.wipeGrid();
            gameBoard.renderGrid();
            gameBoard.removeListeners();
            gameBoard.checkVictory();
        },
        playerplayerTurn: function(){
            if(this.playerTurn == 1){
                gameBoard.playerTurn = 0;
                return player2.getShape;
            }
            else{
                gameBoard.playerTurn = 1;
                return player1.getShape;
            }
        },
        continue: function(){
            gameBoard.array = [
                ``, ``, ``,
                ``, ``, ``,
                ``, ``, ``,
            ];
            document.querySelector(`.sum-container`).remove();
            gameBoard.renderGrid();
        },
        createSummary: function(){
            gameBoard.wipeGrid();
            let summaryContainer = document.createElement(`div`);
                summaryContainer.className = `sum-container`;
            let continueButton = document.createElement(`button`);
                continueButton.className = `continue`;
                continueButton.textContent = `Continue`;
                continueButton.addEventListener(`click`, this.continue);
            let title = document.createElement(`div`);
                title.className = `title`;
                title.textContent = ``;
            summaryContainer.appendChild(title);
            this.$board.appendChild(summaryContainer);
            summaryContainer.appendChild(continueButton);
        },
        tieScreen: function(){
            this.createSummary();
            let title = document.querySelector(`.title`);
            title.textContent = `It's a tie!`;
        },
        victoryScreen: function (){
            this.createSummary();
            let title = document.querySelector(`.title`);
            let winner;
                if(this.playerTurn == 0){
                    winner = player2.getShape;
                }
                else{
                    winner = player1.getShape;
                };
            title.textContent = `${winner} wins!`;
        },
        checkVictory: function (){
            switch(true){
                case (!gameBoard.array.includes(``)):
                    gameBoard.tieScreen();
                    break;
                case (gameBoard.array[0] == `X` && 
                      gameBoard.array[1] == `X` && 
                      gameBoard.array[2] == `X` ||
                      gameBoard.array[0] == `O` && 
                      gameBoard.array[1] == `O` && 
                      gameBoard.array[2] == `O` ):
                    gameBoard.victoryScreen();
                    break;
                case (gameBoard.array[3] == `X` && 
                      gameBoard.array[4] == `X` && 
                      gameBoard.array[5] == `X` ||
                      gameBoard.array[3] == `O` && 
                      gameBoard.array[4] == `O` && 
                      gameBoard.array[5] == `O` ):
                    gameBoard.victoryScreen();
                    break;
                case (gameBoard.array[6] == `X` && 
                      gameBoard.array[7] == `X` && 
                      gameBoard.array[8] == `X` ||
                      gameBoard.array[6] == `O` && 
                      gameBoard.array[7] == `O` && 
                      gameBoard.array[8] == `O` ):
                    gameBoard.victoryScreen();
                    break;
                case (gameBoard.array[0] == `X` && 
                      gameBoard.array[3] == `X` && 
                      gameBoard.array[6] == `X` ||
                      gameBoard.array[0] == `O` && 
                      gameBoard.array[3] == `O` && 
                      gameBoard.array[6] == `O` ):
                    gameBoard.victoryScreen();
                    break;
                case (gameBoard.array[1] == `X` && 
                      gameBoard.array[4] == `X` && 
                      gameBoard.array[7] == `X` ||
                      gameBoard.array[1] == `O` && 
                      gameBoard.array[4] == `O` && 
                      gameBoard.array[7] == `O` ):
                    gameBoard.victoryScreen();
                    break;
                case (gameBoard.array[2] == `X` && 
                      gameBoard.array[5] == `X` && 
                      gameBoard.array[8] == `X` ||
                      gameBoard.array[2] == `O` && 
                      gameBoard.array[5] == `O` && 
                      gameBoard.array[8] == `O` ):
                    gameBoard.victoryScreen();
                    break;
                case (gameBoard.array[0] == `X` && 
                      gameBoard.array[4] == `X` && 
                      gameBoard.array[8] == `X` ||
                      gameBoard.array[0] == `O` && 
                      gameBoard.array[4] == `O` && 
                      gameBoard.array[8] == `O` ):
                    gameBoard.victoryScreen();
                    break;
                case (gameBoard.array[2] == `X` && 
                      gameBoard.array[4] == `X` && 
                      gameBoard.array[6] == `X` ||
                      gameBoard.array[2] == `O` && 
                      gameBoard.array[4] == `O` && 
                      gameBoard.array[6] == `O` ):
                    gameBoard.victoryScreen();
                    break;
            };
        },
    };
    let playerSelect = {
        continue: function(){
            document.querySelector(`.select-container`).remove();
            gameBoard.init();
        },
        colors: ["#F800FF","#FFF800","#00FFF8","#4300FF","#FF4300","#00FF43"],
        selectContainer: function (){
            let selectContainer = document.createElement(`div`);
                selectContainer.className = `select-container`;
            let selectTitle = document.createElement(`div`);
                selectTitle.className = `select-title`;
                selectTitle.textContent = `Player X color:`;
            let colorContainer = document.createElement(`div`);
                colorContainer.className = `color-container`;
                this.colorGenerator();
            let continueButton = document.createElement(`button`);
                continueButton.className = `continue`;
                continueButton.textContent = `Next`;
                continueButton.addEventListener(`click`, this.continue);
            selectContainer.appendChild(selectTitle);
            selectContainer.appendChild(colorContainer);
            document.querySelector(`.game-board`).appendChild(selectContainer);
            selectContainer.appendChild(continueButton);
        },
        colorGenerator: function(){
            for(let i = 0; i < playerSelect.colors.length; i++){
                console.log(`color`);
            }
        }
    }
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
    // gameBoard.init();
    playerSelect.selectContainer();
})();