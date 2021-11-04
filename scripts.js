// (function (){
    let gameBoard = {
        array: [
            ``, ``, ``,
            ``, ``, ``,
            ``, ``, ``,
        ],
        playerTurn: 0,
        cpu: 0,
        winnerStatus: 0,
        init: function(){
            this.domSet();
            this.renderGrid();
            gameBoard.addListeners();
            gameBoard.removeListeners();
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
                if(this.array[i] === `X`){
                    grid.style.color = player1.getColor;
                }
                if(this.array[i] === `O`){
                    grid.style.color = player2.getColor;
                }
            };
            gameBoard.checkVictory();
            if(gameBoard.winnerStatus !== 0){
                gameBoard.victoryScreen();
            }
            else{
                gameBoard.cpuTurn();
            }
        },
        wipeGrid: function(){
            for(i = 0; i < this.array.length; i++){
                document.getElementById(i).remove();
            };
        },
        addListeners: function(){
            for(i = 0; i < this.array.length; i++){
                document.getElementById(i).addEventListener(`mouseover`, gameBoard.hoverShape);
                document.getElementById(i).addEventListener(`mouseout`, gameBoard.removeHoverShape);
                document.getElementById(i).addEventListener(`click`, gameBoard.markBoard);
            };
        },
        removeListeners: function(){
            for(i = 0; i < this.array.length; i++){
                if(this.array[i] !== ``){
                    document.getElementById(i).removeEventListener(`click`, gameBoard.markBoard);
                    document.getElementById(i).removeEventListener(`mouseover`, gameBoard.hoverShape);
                    document.getElementById(i).removeEventListener(`mouseout`, gameBoard.removeHoverShape);
                };
            };
        },
        cpuTurn: function(){
            if(gameBoard.cpu === 1 && gameBoard.playerTurn === 1){
                cpuLogic.cpuMinimax();
                setTimeout(() => {
                    gameBoard.wipeGrid();
                    gameBoard.renderGrid();
                    gameBoard.addListeners();
                    gameBoard.removeListeners();    
                },Math.random() * 600);
            }
            else{
                gameBoard.addListeners();
                gameBoard.removeListeners();
            }
        },

        markBoard: function(){
            gameBoard.array[this.id] = gameBoard.switchPlayer();
            gameBoard.removeListeners();
            gameBoard.wipeGrid();
            gameBoard.renderGrid();
        },
        switchPlayer: function(){
            if(this.playerTurn === 1){
                gameBoard.playerTurn = 0;
                return player2.getShape;
            }
            else{
                gameBoard.playerTurn = 1;
                return player1.getShape;
            }
        },
        hoverShape: function(){
            document.getElementById(this.id).style.color = `#ffffff59`;
            if(gameBoard.playerTurn === 1){
                document.getElementById(this.id).textContent = player2.getShape;
            }
            else{
                document.getElementById(this.id).textContent = player1.getShape;
            }
        },
        removeHoverShape: function(){
            document.getElementById(this.id).textContent = ``;
        },
        continue: function(){
            gameBoard.array = [
                ``, ``, ``,
                ``, ``, ``,
                ``, ``, ``,
            ];
            document.querySelector(`.sum-container`).remove();
            gameBoard.winnerStatus = 0;
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
                if(this.playerTurn === 0){
                    winner = player2.getShape;
                }
                else{
                    winner = player1.getShape;
                };
            title.textContent = `${winner} wins!`;
        },
        checkVictory: function (){
            switch(true){
                case (gameBoard.array[0] === `X` && 
                      gameBoard.array[1] === `X` && 
                      gameBoard.array[2] === `X` ||
                      gameBoard.array[0] === `O` && 
                      gameBoard.array[1] === `O` && 
                      gameBoard.array[2] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[0];
                break;
                case (gameBoard.array[3] === `X` && 
                      gameBoard.array[4] === `X` && 
                      gameBoard.array[5] === `X` ||
                      gameBoard.array[3] === `O` && 
                      gameBoard.array[4] === `O` && 
                      gameBoard.array[5] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[3];
                break;
                case (gameBoard.array[6] === `X` && 
                      gameBoard.array[7] === `X` && 
                      gameBoard.array[8] === `X` ||
                      gameBoard.array[6] === `O` && 
                      gameBoard.array[7] === `O` && 
                      gameBoard.array[8] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[6];
                break;
                case (gameBoard.array[0] === `X` && 
                      gameBoard.array[3] === `X` && 
                      gameBoard.array[6] === `X` ||
                      gameBoard.array[0] === `O` && 
                      gameBoard.array[3] === `O` && 
                      gameBoard.array[6] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[0];
                break;
                case (gameBoard.array[1] === `X` && 
                      gameBoard.array[4] === `X` && 
                      gameBoard.array[7] === `X` ||
                      gameBoard.array[1] === `O` && 
                      gameBoard.array[4] === `O` && 
                      gameBoard.array[7] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[1];
                break;
                case (gameBoard.array[2] === `X` && 
                      gameBoard.array[5] === `X` && 
                      gameBoard.array[8] === `X` ||
                      gameBoard.array[2] === `O` && 
                      gameBoard.array[5] === `O` && 
                      gameBoard.array[8] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[2];
                break;
                case (gameBoard.array[0] === `X` && 
                      gameBoard.array[4] === `X` && 
                      gameBoard.array[8] === `X` ||
                      gameBoard.array[0] === `O` && 
                      gameBoard.array[4] === `O` && 
                      gameBoard.array[8] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[0];
                break;
                case (gameBoard.array[2] === `X` && 
                      gameBoard.array[4] === `X` && 
                      gameBoard.array[6] === `X` ||
                      gameBoard.array[2] === `O` && 
                      gameBoard.array[4] === `O` && 
                      gameBoard.array[6] === `O` ):
                    gameBoard.winnerStatus = gameBoard.array[2];
                break;
                case (!gameBoard.array.includes(``)):
                    gameBoard.winnerStatus = `tie`;
                break;
            };
        },
    };
    let playerSelect = {
        continue: function(){
            document.querySelector(`.select-container`).remove();
            if(player2.getColor !== ``){
                playerSelect.setCPU();
            }
            else{
                playerSelect.selectContainer();
            }
        },
        colors: ["#f18df5","#FFF800","#65dffd","#ffffff","#ff7474","#73ffbe"],
        selectContainer: function (){
            let selectContainer = document.createElement(`div`);
                selectContainer.className = `select-container`;
            let selectTitle = document.createElement(`div`);
                selectTitle.className = `select-title`;
                if(player1.getColor === ``){
                    selectTitle.textContent = `Player X color`;  
                }
                else{
                    selectTitle.textContent = `Player O color`;
                }
            let colorContainer = document.createElement(`div`);
                colorContainer.className = `color-container`;
            selectContainer.appendChild(selectTitle);
            selectContainer.appendChild(colorContainer);
            document.querySelector(`.game-board`).appendChild(selectContainer);
            this.colorGenerator();
        },
        colorGenerator: function(){
            let container = document.querySelector(`.color-container`);
            for(let i = 0; i < playerSelect.colors.length; i++){
                let colorSquare = document.createElement(`div`);
                colorSquare.className = `color-square`;
                colorSquare.id = `${i}`;
                colorSquare.style.backgroundColor = this.colors[i];
                container.appendChild(colorSquare);
            };
            this.colorEventListeners();
        },
        colorEventListeners: function (){
            for(let i = 0; i < playerSelect.colors.length; i++){
                let event = document.getElementById(`${i}`);
                event.addEventListener(`click`, this.setPlayerColor);
                event.addEventListener(`mouseover`, this.colorHover)
            }
        },
        colorHover: function(){
            document.querySelector(`.select-title`).style.color = playerSelect.colors[this.id];
        },
        setPlayerColor: function (){
            if(player1.getColor === ``){
                player1.getColor = playerSelect.colors[this.id];
                playerSelect.continue();
            }
            else{
                player2.getColor = playerSelect.colors[this.id];
                document.querySelector(`.select-title`).style.color = playerSelect.colors[this.id];
                playerSelect.continue();
            }
        },
        setCPU: function(){
            this.selectContainer();
            let selectTitle = document.querySelector(`.select-title`);
            selectTitle.textContent = `Play vs bot?`;
            document.querySelector(`.color-container`).remove();
            let confirmContainer = document.createElement(`div`);
            confirmContainer.className = `confirm-container`;
            let yes = document.createElement(`button`);
            yes.className = `confirm`;
            yes.textContent = `Yes`;
            yes.addEventListener(`click`, () => {
                gameBoard.cpu = 1;
                document.querySelector(`.select-container`).remove();
                gameBoard.init();
            });
            let no = document.createElement(`button`);
            no.className = `confirm`;
            no.textContent = `No`;
            no.addEventListener(`click`, () => {
                gameBoard.cpu = 0;
                document.querySelector(`.select-container`).remove();
                gameBoard.init();
            });
            confirmContainer.appendChild(yes);
            confirmContainer.appendChild(no);
            let selectContainer = document.querySelector(`.select-container`);
            selectContainer.appendChild(confirmContainer);
        },
    }
    const cpuLogic = {
        cpuRandom: function(){
            const newArray = [];
            gameBoard.array.forEach((x, y)  => {
                if(x === ``){
                    newArray.push(y);
                }
            });
            gameBoard.array[newArray[parseInt(Math.random() * newArray.length)]] = gameBoard.switchPlayer();
        },
        cpuMinimax: function(){
            const newArray = [];
            let newScore;
            gameBoard.array.forEach((x,y) => {
                if(x === ``){
                    newArray.push(y);
                }
            });
            let bestScore = -Infinity;
            for(let i = 0; i < newArray.length; i++){
                gameBoard.array[i] = `O`;
                let score = this.minimax(gameBoard.array, 0, true);
                gameBoard.array[i] = ``;
                if(score > bestScore){
                    bestScore = score;
                    console.log(i);
                }
            };
            gameBoard.array[newScore] = gameBoard.switchPlayer();
        },
        scores: {X: -1, O: 1, tie: 0},
        minimax: function(array, depth, maximizingPlayer){
            let result = gameBoard.checkVictory();
            if(gameBoard.winnerStatus !== 0){
                let score = this.scores[result];
                gameBoard.winnerStatus = 0;
                return score;
            }
            if(maximizingPlayer){
                let maxEval = -Infinity;
                let maxChildArray = [];
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === "") {
                        maxChildArray.push(i);
                    }
                }
                for(let i = 0; i < maxChildArray.length; i++){
                    array[i] = `O`;
                    console.log(array);
                    let eval = this.minimax(maxChildArray[i], depth - 1, false);
                    array[i] = ``;
                    maxEval = Math.max(maxEval, eval);
                }
                return maxEval;
            }
            else{
                let minEval = Infinity;
                let minChildArray = [];
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === "") {
                        minChildArray.push(i);
                    }
                }
                for(let i = 0; i < minChildArray.length; i++){
                    array[i] = `X`;
                    console.log(array);
                    let eval = this.minimax(minChildArray[i], depth - 1, true);
                    array[i] = ``;
                    minEval = Math.min(minEval, eval);
                }
                return minEval;
            }
        },
    }
    const player = function(name, shape, color){
        const getShape = shape;
        const getName = name;
        const getColor = color;
        return {getShape, getName, getColor}
    };
    const player1 = player(`player 1`, `X`, ``);
    const player2 = player(`Player 2`, `O`, ``);
    playerSelect.selectContainer();
// })();