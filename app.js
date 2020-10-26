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
  //   console.log(cellValues[0].textContent);
  // check the first row
  let sumR1 = '';
  let sumR2 = '';
  let sumR3 = '';
  let sumC1 = '';
  let sumC2 = '';
  let sumC3 = '';
  let sumD1 = '';
  let sumD2 = '';
  let winner = '';

  // if (cellValues[0].textContent === 'x' && cellValues[1].textContent === 'x' && cellValues[2].textContent === 'x') {

  // }

  //   check for x in first row
  for (let i = 0; i < 3; i++) {
    if (cellValues[i].textContent === 'x') {
      // if all x sum => xxx => x win in the first row
      sumR1 += cellValues[i].textContent;
    }
    // sumR1 += cellValues[i].textContent;
  }
  //   check for x in second row
  for (let i = 3; i < 6; i++) {
    if (cellValues[i].textContent === 'x') {
      sumR2 += cellValues[i].textContent;
    }
  }

  for (let i = 6; i < 9; i++) {
    if (cellValues[i].textContent === 'x') {
      sumR3 += cellValues[i].textContent;
    }
  }

  //   check rows!
  for (let i = 0; i < i + 3; i += 3) {
    if (i === 9) {
      break;
    } else {
      for (let j = i; j < j + 3; j++) {
        if (cellValues[j].textContent === 'x') {
          sumR2 += cellValues[j].textContent;
        }
      }
    }
  }

  console.log('sumR1:', sumR1);
  console.log('sumR2:', sumR2);
  console.log('sumR3:', sumR3);

  console.log(winner);
}
