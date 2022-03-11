# Tic-tac-toe

![](https://github.com/TYLPHE/TYLPHE/blob/main/readmeAssets/tic-tac-toe.gif)

## Links
[Play Tic-tac-toe here!](https://TYLPHE.github.io/tic-tac-toe/)

[See the assignment here](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/tic-tac-toe)

## Features
- Play the unbeatable bot
- Select player colors

## About
Tic-tac-toe is a 1-2 player game. It's a relatively simple app but contains one of my proudest functions, minimax, which creates an unbeatable bot! Please give it a try!

## Challenges
### Minimax
```
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
}
```

Minimax is a function where the computer will simulate all future moves for the user and itself to determine the best possible move. The [wiki for minimax](https://en.wikipedia.org/wiki/Minimax) contains pseudocode that took me a while to completely understand. This function is recursive and will continue to run until a winner is decided and then returns a score.

I left the score tallying in the console to see what the function is actually doing:

```
----start---- scripts.js:331:21
eval of board position 1: -1 scripts.js:343:25
eval of board position 2: -1 scripts.js:343:25
eval of board position 3: 0 scripts.js:343:25
eval of board position 5: -1 scripts.js:343:25
eval of board position 7: -1 scripts.js:343:25
-----end-----
```

In the example above, the computer would lose if it chooses any square except position 3. The position of the tic-tac-toe board is listed in an array from 0 - 8.

## Computer is boring
With the way minimax is programmed, it will select the first save/winning move. I added some extra lines to the app to make each game a little more unique:

```
if(eval === maxEval){
    let randomizer = Math.random();
    if(randomizer <= .5){
        bestPosition = remainingChoices[i];
    }
}  
```

This means that if the next calculated move also results in a tie, this gives the bot a 50% chance to select the other move that ties the game. The result is that when the player plays the same strategy, the computer will seemingly try new moves to trick the player.
