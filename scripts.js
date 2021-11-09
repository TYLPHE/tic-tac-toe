(function (){
    let gameBoard = {
        array: [
            ``, ``, ``,
            ``, ``, ``,
            ``, ``, ``,
        ],
        playerTurn: 0,
        cpuRandom: 0,
        cpuMinimax: 0,
        winnerStatus: false,
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
            gameBoard.checkVictory(this.array);
            if(gameBoard.winnerStatus){
                gameBoard.victoryScreen();
            }
            else{
                gameBoard.cpuTurn();
                if(!this.winnerStatus){
                    gameBoard.addListeners();
                    gameBoard.removeListeners(); 
                }
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
            if(gameBoard.cpuRandom === 1 && gameBoard.playerTurn === 1){
                    cpuLogic.cpuRandom();
                    gameBoard.wipeGrid();
                    gameBoard.renderGrid();   
            }
            else if(gameBoard.cpuMinimax === 1 && gameBoard.playerTurn === 1){
                    cpuLogic.cpuMinimax();
                    gameBoard.wipeGrid();
                    gameBoard.renderGrid();
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
            gameBoard.winnerStatus = false;
            document.querySelector(`.sum-container`).remove();
            gameBoard.renderGrid();
        },
        reset: function(){
            gameBoard.array = [
                ``, ``, ``,
                ``, ``, ``,
                ``, ``, ``,
            ];
            gameBoard.playerTurn = 0;
            gameBoard.cpuRandom = 0;
            gameBoard.cpuMinimax = 0;
            gameBoard.winnerStatus = false;
            player1.getColor = ``;
            player2.getColor = ``;
            document.querySelector(`.sum-container`).remove();
            playerSelect.selectContainer();
        },
        createSummary: function(){
            gameBoard.wipeGrid();
            let summaryContainer = document.createElement(`div`);
                summaryContainer.className = `sum-container`;
            let miniGridContainer = document.createElement(`div`);
                miniGridContainer.className = `mini-grid-container`;
            let miniGrid = document.createElement(`div`);
                miniGrid.className = `mini-grid`;
            for(i = 0; i < this.array.length; i++){
                let miniBoxes = document.createElement(`div`);
                miniGrid.appendChild(miniBoxes);
                miniBoxes.className = `mini-box ${i}`;
                miniBoxes.id = i;
                miniBoxes.textContent = this.array[i];
                if(this.array[i] === `X`){
                    miniBoxes.style.color = player1.getColor;
                }
                if(this.array[i] === `O`){
                    miniBoxes.style.color = player2.getColor;
                }
            };
                miniGridContainer.appendChild(miniGrid);
            let continueButton = document.createElement(`button`);
                continueButton.className = `continue`;
                continueButton.textContent = `Continue`;
                continueButton.addEventListener(`click`, this.continue);
            let resetButton = document.createElement(`button`);
                resetButton.className = `continue`;
                resetButton.textContent = `Reset to color selection`;
                resetButton.addEventListener(`click`, this.reset);
            let title = document.createElement(`div`);
                title.className = `title`;
                title.textContent = ``;
            summaryContainer.append(title, miniGridContainer, continueButton, resetButton);
            this.$board.appendChild(summaryContainer);
        },
        victoryScreen: function (){
            this.createSummary();
            let title = document.querySelector(`.title`);
                if(gameBoard.winnerStatus !== `tie`){
                    let winner = gameBoard.winnerStatus;
                    title.textContent = `${winner} wins!`;
                }
                else{
                    title.textContent = `It's a tie!`;
                };
        },
        checkVictory: function(arr){
            let winningCombos = [
                [0, 1, 2],[3, 4, 5],[6, 7, 8],
                [0, 3, 6],[1, 4, 7],[2, 5, 8],
                [0, 4, 8],[2, 4, 6]];
                winningCombos.forEach(combo => {
                const [a, b, c] = combo;
                if(arr[a] === arr[b] && 
                   arr[a] === arr[c] &&
                   arr[a] !== ``){
                    return gameBoard.winnerStatus = arr[a];
                }
                if(!arr.includes(``) && !gameBoard.winnerStatus){
                    gameBoard.winnerStatus = `tie`;
                }
            });
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
            let colorContainer = document.createElement(`div`);
                colorContainer.className = `color-container`;
                if(player1.getColor === ``){
                    selectTitle.textContent = `Player X color`;  
                }
                else{
                    selectTitle.textContent = `Player O color`;
                }

            selectContainer.appendChild(selectTitle);
            selectContainer.appendChild(colorContainer);
            document.querySelector(`.game-board`).appendChild(selectContainer);
            this.colorGenerator();
        },
        colorGenerator: function(){
            let container = document.querySelector(`.color-container`);
            if(player1.getColor === ``){
                container.style.clipPath = `polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)`;
            }
            else{
                container.style.clipPath = `circle(245px at 50% 50%)`;
                let donutHole = document.createElement(`div`);
                donutHole.className = `donut-hole`;
                container.appendChild(donutHole);
            }
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
            let selectContainer = document.querySelector(`.select-container`);
            let selectTitle = document.querySelector(`.select-title`);
            selectTitle.textContent = `Play vs bot?`;
            document.querySelector(`.color-container`).remove();
            let confirmContainer = document.createElement(`div`);
            confirmContainer.className = `confirm-container`;
            let random = document.createElement(`button`);
            random.className = `confirm`;
            random.textContent = `Bot is random`;
            random.addEventListener(`click`, () => {
                gameBoard.cpuRandom = 1;
                gameBoard.cpuMinimax = 0;
                selectContainer.remove();
                gameBoard.init();
            });
            let minimax = document.createElement(`button`);
            minimax.className = `confirm`;
            minimax.textContent = `Bot is minimaxed!`;
            minimax.addEventListener(`click`, () => {
                gameBoard.cpuRandom = 0;
                gameBoard.cpuMinimax = 1
                selectContainer.remove();
                gameBoard.init();
            });
            let no = document.createElement(`button`);
            no.className = `confirm`;
            no.textContent = `No bot`;
            no.addEventListener(`click`, () => {
                gameBoard.cpuRandom = 0;
                gameBoard.cpuMinimax = 0;
                selectContainer.remove();
                gameBoard.init();
            });
            confirmContainer.append(random, minimax, no);
            selectContainer.appendChild(confirmContainer);
        },
    }
    const cpuLogic = {
        cpuRandom: function(){
            const remainingChoices = [];
            gameBoard.array.forEach((x, y)  => {
                if(x === ``){
                    remainingChoices.push(y);
                }
            });
            gameBoard.array[remainingChoices[parseInt(Math.random() * remainingChoices.length)]] = gameBoard.switchPlayer();
        },
        cpuMinimax: function(){
            const remainingChoices = [];
            gameBoard.array.forEach((element, index) => {
                if (element === ``){
                    remainingChoices.push(index);
                }
            });
            let maxEval = -Infinity;
            let bestPosition;
            console.log(`----start----`);
            for(i = 0; i < remainingChoices.length; i++){
                gameBoard.array[remainingChoices[i]] = `O`;
                gameBoard.checkVictory(gameBoard.array);
                let eval = 0
                if(gameBoard.winnerStatus == `O`){
                    return gameBoard.array[remainingChoices[i]] = gameBoard.switchPlayer();
                }
                else{
                    eval = this.minimax(gameBoard.array, 0, false);
                }
                gameBoard.array[remainingChoices[i]] = ``;
                console.log(`eval of board position ${remainingChoices[i]}: ${eval}`);
                if(eval > maxEval){
                    maxEval = eval;
                    bestPosition = remainingChoices[i];
                }
                if(eval === maxEval){
                    let randomizer = Math.random();
                    if(randomizer <= .5){
                        bestPosition = remainingChoices[i];
                    }
                }  
            }
            console.log(`-----end-----`);
            gameBoard.array[bestPosition] = gameBoard.switchPlayer();
        },
        winnerValue: {X: -1, O: 1, tie: 0},
        minimax: function(array, depth, maximizingPlayer){
            gameBoard.checkVictory(array);
            let eval = null;
            if(gameBoard.winnerStatus){
                eval = cpuLogic.winnerValue[gameBoard.winnerStatus];
                gameBoard.winnerStatus = false;
                return eval;
            }
            gameBoard.winnerStatus = false;
            if(maximizingPlayer){
                let remainingChoices = [];
                array.forEach((element, index) => {
                    if (element === ``){
                        remainingChoices.push(index);
                    }
                });
                let maxEval = -Infinity;
                let eval = null;
                remainingChoices.forEach(element => {
                    array[element] = `O`;
                    eval = cpuLogic.minimax(array, depth - 1, false);
                    maxEval =  Math.max(maxEval, eval);
                    array[element] = ``
                });
                return maxEval;
            }
            else{
                let remainingChoices = [];
                array.forEach((element, index) => {
                    if (element === ``){
                        remainingChoices.push(index);
                    }
                });
                let minEval = Infinity;
                let eval = null;
                remainingChoices.forEach(element => {
                    array[element] = `X`;
                    eval = this.minimax(array, depth - 1, true);
                    minEval = Math.min(minEval, eval);
                    array[element] = ``;
                });
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
})();