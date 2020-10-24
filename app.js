const cells = document.querySelectorAll('.cell');
cells.forEach((element) => element.addEventListener('click', fireOnCells));

// memory-------------
let currentPlayer = 1;
let gameTurnsLeft = 9;

let gameOn = true;
// -------------------

function fireOnCells(event) {
  if (currentPlayer === 1) {
    // need check to not le click alredy clicked cells
    if (event.target.textContent === 'o' || event.target.textContent === 'x') {
      console.log('trying click wrong cell,do nothing');
    } else {
      // im clicking on a valid cell, so let's conquer it!
      event.target.textContent = 'x';
      //   update the remaining turns
      gameTurnsLeft--;
      console.log(gameTurnsLeft);
      currentPlayer = 0;

      /*  cant win before turn 3
      if (gameTurnsLeft >= 4) {
        //checkWinner()
      } else {
        //pass the turn
        currentPlayer = 0;
      } */
    }

    // play as X
    // check if the game is won
    // if so stop the game //hilight winner
    // else change the player
  } else {
    // & play as O
    // check if the game is won
    // if so stop the game //hilight winner
    // else change the player
    if (event.target.textContent === 'o' || event.target.textContent === 'x') {
      console.log('trying click wrong cell,do nothing');
    } else {
      // im clicking on a valid cell, so let's conquer it!
      event.target.textContent = 'o';
      //   update the remaining turns
      gameTurnsLeft--;
      console.log(gameTurnsLeft);
      currentPlayer = 1;

      /*  cant win before turn 3
        if (gameTurnsLeft >= 4) {
          //checkWinner()
        } else {
          //pass the turn
          currentPlayer = 0;
        } */
    }
  }
}

// x=>1 o=>0

// im goona need to check if the cell is empty or not

// each turn it must change X/O:

// we assume we start with X

// Click => end turn => change symbol
// i need to store the value of the previous click in memory & check/update each turn

// cant click on the other symbols or i'll change them

// check if there are 3 winning symbols, if so end the game

function checkWinner() {
  // take the reference to the array
  //   count the x in the row, if sum = 3 x won
  const cellValues = document.querySelectorAll('.cell');

  console.log(cellValues);
  // check the first row
  //   for (let i = 0)
}
