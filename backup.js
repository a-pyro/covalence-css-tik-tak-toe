const cells = document.querySelectorAll('.cell');
cells.forEach((element) => element.addEventListener('click', fireOnCells));

// memory-------------
let currentPlayer = 1;
let winForX = 0;
let winForO = 0;
let draws = 0;
let gameTurnsLeft = 9;

// let gameOn = true;
// -------------------

function fireOnCells(event) {
  // need check to not le click alredy clicked cells

  if (event.target.textContent === 'o' || event.target.textContent === 'x') {
    console.log('trying click wrong cell, do nothing');
  } else if (currentPlayer === 1) {
    // im clicking on a valid cell, so let's conquer it!
    event.target.textContent = 'x';
    //   update the remaining turns
    gameTurnsLeft--;
    console.log('turns LEFT: ', gameTurnsLeft);

    let winner = checkWinner();

    if (winner === 'X') {
      console.log('X WON!');
      winForX++;
      const showWin = document.querySelector('#winX');
      showWin.textContent = `${winForX}`;

      //animate score
      animateScore('#score-x');

      // clear board
      clearBoard();
      // resetting games turns
      resetTurn();
      // resetting player
      resetPlayer();
    } else if (gameTurnsLeft <= 0) {
      let draw = document.querySelector('#draw');
      draws++;
      draw.textContent = draws;
      // animation
      animateScore('#score-draw');
      // clear board
      clearBoard();
      // resetting games turns
      resetTurn();
      // resetting player
      resetPlayer();
    } else {
      // pass the turn
      currentPlayer = 0;
    }
  } else {
    // & play as O
    event.target.textContent = 'o';

    //   update the remaining turns
    gameTurnsLeft--;
    console.log('turns LEFT: ', gameTurnsLeft);

    // check winner
    let winner = checkWinner();
    if (winner === 'O') {
      // update score
      console.log('O WON!');
      winForO++;
      const showWin = document.querySelector('#winO');
      showWin.textContent = `${winForO}`;

      // adding class to animate
      document.querySelector('#score-o').classList.add('animate__rubberBand');
      //clear the board
      clearBoard();

      setTimeout(() => {
        document
          .querySelector('#score-o')
          .classList.remove('animate__rubberBand');
      }, 2000);
      // reset player
      resetPlayer();
      // reset turns
      resetTurn();
    } else if (gameTurnsLeft <= 0) {
      //upadate score
      let draw = document.querySelector('#draw');
      draws++;
      draw.textContent = draws;
      // animation
      document
        .querySelector('#score-draw')
        .classList.add('animate__rubberBand');
      // cleaning cells
      clearBoard();

      // removing animation class
      setTimeout(() => {
        document
          .querySelector('#score-draw')
          .classList.remove('animate__rubberBand');
      }, 2000);
      // reset player
      resetPlayer();
      // resetting games turns
      resetTurn();
    } else {
      //pass the turn
      resetPlayer();
    }
  }
}

// x=>1 o=>0

// im goona need to check if the cell is empty or not

// each turn it must change X/O:

// we assume we start with X

// cant click on the other symbols or i'll change them

// check if there are 3 winning symbols, if so end the game

function checkWinner() {
  const cellValues = document.querySelectorAll('.cell');
  // console.log(cellValues);

  // try with arrays
  let rowARR = [];
  let colARR = [];
  let diagARR = [];

  let winner = '';

  // check ROWS
  // concatenating the textvalue of each cell in the rows
  // the outer loops allows me to iterate each single row
  // row1 => index0 to 2
  // row2 => index3 to 5
  // row1 => index6 to 8
  // at every iteration of the outer loop i add +3 to go to the first element of the next row
  // i need to iterate 3 times (3 rows) so the condition must be i < i +3
  // the last iteration will give me i = 9, which i dont need, so i break
  for (let i = 0; i < 9; i += 3) {
    let rows = '';
    for (let j = i; j < i + 3; j++) {
      // with the inner loop i check the values of cell in that row which start at index j=i and increments +1 the get the next adjacent element

      // check for empty strings to separate the string
      // if a cell has not been clicked i need to concat an empty space otherwise will mess with the concatenation of elements, for example |o|x|x|
      // ---------------------------------------------|x| | | will be considered as 3 cosecutive x's, and i don't want that because later on i'll check if that string includes 'xxx' => 3 consecutive x's
      // by checking the empty string i avoid this behavior
      if (cellValues[j].textContent === '') {
        rows += ' ';
      } else {
        // concatenate the x or o

        rows += cellValues[j].textContent;
      }
    }
    rowARR.push(rows);
  }

  console.log(rowARR);

  // same thing for columns but i need inner while loop (with a counter) to better point out how many times it must run

  // cols start at index |0|1|2|
  // --------------------|3|4|5|
  // --------------------|6|7|8|
  for (let i = 0; i < 3; i++) {
    let cols = '';

    let counter = 0;
    let j = i;
    // i create j = i to say to my while loop in which col must start looking
    while (counter < 3) {
      // check for empty strings to separate the string, same as before
      if (cellValues[j].textContent === '') {
        cols += ' ';
      } else {
        cols += cellValues[j].textContent;
      }
      // here i upgrade j +3 because the next element in the col will be at index = index of the start col + 3
      j += 3;
      counter++;
    }
    colARR.push(cols);
  }
  console.log(colARR);
  // console.log('COLUMNS:', cols);

  // check diagonals
  // i need to run the outer loop for 2 times for the diagonals
  // diagonals indexes    |0| |2|
  // --------------------| |4| |
  // --------------------|6| |8|
  // diag1 start at index 0 and diag2 start at index 2(ergo i+2)
  for (let i = 0; i <= 2; i += 2) {
    let diagonals = '';

    let counter = 0;
    // j to tell to the while loops in which diagonal to start
    let j = i;
    while (counter < 3) {
      // if i start in the first diagonal j mush be incremented by 4
      if (i === 0) {
        if (cellValues[j].textContent === '') {
          diagonals += ' ';
          // increment j+4 to take the next element in the diagonal which will be at position j+4 (see template at line 150)
          j += 4;
          counter++;
        } else {
          diagonals += cellValues[j].textContent;
          j += 4;
          counter++;
        }
      } else {
        // if im starting to the second diagonal j must be incremented by 2
        if (cellValues[j].textContent === '') {
          diagonals += ' ';
          j += 2;
          counter++;
        } else {
          diagonals += cellValues[j].textContent;
          j += 2;
          counter++;
        }
      }
    }
    diagARR.push(diagonals);
  }
  console.log(diagARR);

  // console.log('DIAGONALS:', diagonals);

  // now i check if the strings in my array contain a concatenation of winning x's or o's
  if (
    rowARR.includes('xxx') ||
    colARR.includes('xxx') ||
    diagARR.includes('xxx')
  ) {
    winner = 'X';
  } else if (
    rowARR.includes('ooo') ||
    colARR.includes('ooo') ||
    diagARR.includes('ooo')
  ) {
    winner = 'O';
  } else {
    winner = '';
  }

  console.log('the winner is:', winner);
  // console.log('winner of the rows:', winner);

  // console.log('The winner is:', winner);
  return winner;
}

function resetTurn() {
  gameTurnsLeft = 9;
}

function resetPlayer() {
  currentPlayer = 1;
}

function clearBoard() {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
}

function animateScore(scoreToAnimate) {
  // adding class to animate
  document.querySelector(scoreToAnimate).classList.add('animate__rubberBand');

  // removing animation class
  setTimeout(() => {
    document
      .querySelector(scoreToAnimate)
      .classList.remove('animate__rubberBand');
  }, 2000);
}

function upadateScore(scoreCounter, idToUpdate) {
  scoreCounter++;
  const showWin = document.querySelector(idToUpdate);
  showWin.textContent = `${scoreCounter}`;
}
