// (function (){
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
            summaryContainer.appendChild(title);
            this.$board.appendChild(summaryContainer);
            summaryContainer.appendChild(continueButton);
            summaryContainer.appendChild(resetButton);
        },
        victoryScreen: function (){
            this.createSummary();
            let title = document.querySelector(`.title`);
            let winner;
                if(gameBoard.winnerStatus !== `tie`){
                    winner = gameBoard.winnerStatus;
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
                    gameBoard.winnerStatus = arr[a];
                }
            });
            if(!arr.includes(``)){
                gameBoard.winnerStatus = `tie`;
            }
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
            let random = document.createElement(`button`);
            random.className = `confirm`;
            random.textContent = `Bot is random`;
            random.addEventListener(`click`, () => {
                gameBoard.cpuRandom = 1;
                gameBoard.cpuMinimax = 0;
                document.querySelector(`.select-container`).remove();
                gameBoard.init();
            });
            let minimax = document.createElement(`button`);
            minimax.className = `confirm`;
            minimax.textContent = `Bot is minimaxed!`;
            minimax.addEventListener(`click`, () => {
                gameBoard.cpuRandom = 0;
                gameBoard.cpuMinimax = 1
                document.querySelector(`.select-container`).remove();
                gameBoard.init();
            });
            let no = document.createElement(`button`);
            no.className = `confirm`;
            no.textContent = `No`;
            no.addEventListener(`click`, () => {
                gameBoard.cpuRandom = 0;
                gameBoard.cpuMinimax = 0;
                document.querySelector(`.select-container`).remove();
                gameBoard.init();
            });
            confirmContainer.appendChild(random);
            confirmContainer.appendChild(minimax);
            confirmContainer.appendChild(no);
            let selectContainer = document.querySelector(`.select-container`);
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
            console.log(`----start----`);
            const remainingChoices = [];
            for (let i = 0; i < gameBoard.array.length; i++) {
                if (gameBoard.array[i] === ``){
                    remainingChoices.push(i);
                }
            }
            let bestPosition;
            let bestScore = -Infinity;
            for(let i = 0; i < remainingChoices.length; i++){
                gameBoard.array[remainingChoices[i]] = `O`;
                gameBoard.checkVictory(gameBoard.array);
                let score = 0;
                if(gameBoard.winnerStatus == `O`){
                    return gameBoard.array[i] = gameBoard.switchPlayer();
                }
                else{
                    score = this.minimax(gameBoard.array, 0, false);
                }
                gameBoard.array[remainingChoices[i]] = ``;
                console.log(`score of ${i} position: ${score}`);
                if(score > bestScore){
                    bestScore = score;
                    bestPosition = remainingChoices[i];
                }
                if(score === bestScore){
                    let randomizer = Math.random();
                    if(randomizer <= .5){
                        bestPosition = remainingChoices[i];
                    }
                }
            };
            console.log(`-----end-----`);
            gameBoard.array[bestPosition] = gameBoard.switchPlayer();
        },
        winnerValue: {X: -1, O: 1, tie: 0},
        minimax: function(array, depth, maximizingPlayer){
            gameBoard.checkVictory(array);
            let score = 0;
            if(gameBoard.winnerStatus){
                score = cpuLogic.winnerValue[gameBoard.winnerStatus];
                gameBoard.winnerStatus = false;
                return score;
            }
            gameBoard.winnerStatus = false;
            if(maximizingPlayer){
                let remainingChoices = [];
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === ``) {
                        remainingChoices.push(i);
                    }
                }
                let maxEval = -Infinity;
                let eval = null;
                for(let i = 0; i < remainingChoices.length; i++){
                    array[remainingChoices[i]] = `O`;
                    eval = cpuLogic.minimax(array, depth - 1, false);
                    maxEval =  Math.max(maxEval, eval);
                    array[remainingChoices[i]] = ``;
                }
                return maxEval;
            }
            else{
                let remainingChoices = [];
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === ``) {
                        remainingChoices.push(i);
                    }
                }
                let minEval = Infinity;
                let eval = null;
                for(let i = 0; i < remainingChoices.length; i++){
                    array[remainingChoices[i]] = `X`;
                    eval = this.minimax(array, depth - 1, true);
                    minEval = Math.min(minEval, eval);
                    array[remainingChoices[i]] = ``;
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