const eachBox = document.querySelectorAll(".element");
let isSignCross = false;
let gameOver = false;

// winning patterns
let winningPatterns = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8], //for rows
  [0, 3, 6],[1, 4, 7],[2, 5, 8], //for columns
  [0, 4, 8],[2, 4, 6], //for diagonals
];

Array.from(eachBox).forEach((Box, index) => {
  Box.addEventListener("click", (e) => {
    // when we again click on box with "X" or "O" do nothing

    if ((gameOver = false || Box.innerHTML !== "")) return;

    if (isSignCross == false) {
      Box.innerHTML = "X";
      isSignCross = true;
      document.querySelector(".turn").innerHTML = "its 'O' turn";
    }

    if (checkWin("X")) {
      document.querySelector(".turn").innerHTML = "X WINS";
      gameOver = true;
      return;
    }

    if (isSignCross == true) {
      setTimeout(() => {
       isSignCross = false;
        document.querySelector(".turn").innerHTML = "its 'X' turn";

        const oMove = getBestMove();
        if (oMove !== null) {
          eachBox[oMove].innerHTML = "O";
       

          if (checkWin("O")) {
            
            document.querySelector(".turn").innerHTML = "O WINS";
            gameOver = true;
           
          }
        }
        else if (oMove===null) {
          gameOver = true;
          document.querySelector(".turn").innerHTML = "ITS A DRAW";
        }

        
      }, 500);
      
    }

    
  });

  // restarting the Game

  let restartButton = document.querySelector(".restart-button");

  restartButton.addEventListener("click", (e) => {
    Array.from(eachBox).forEach((box) => {
      box.innerHTML = "";
    });
    document.querySelector(".turn").innerHTML = "its 'X' turn";
  });

  // finding the best winning move
  function findingBestMove(move) {
    for (let pattern of winningPatterns) {
      const values = pattern.map((index) => eachBox[index].innerHTML);

      if (
        values.filter((v) => v === move).length === 2 &&
        values.includes("")
      ) {
        return pattern[values.indexOf("")];
      }
    }
    return null;
  }

  // the ai logic

  function getBestMove() {
    //1. try to win

    let compMove = findingBestMove("O");
    if (compMove !== null) return compMove;

    //2.block x

    compMove = findingBestMove("X");
    if (compMove !== null) return compMove;

    //3. get center
    if (eachBox[4].innerHTML === "") return 4;

    //4. take a corner
    const corners = [0, 2, 6, 8];

    for (let i of corners) {
      if (eachBox[index].innerHTML === "") return index;
    }

    //5.take a side

    const sides = [1, 3, 5, 7];
    for (let index of sides) {
      if (eachBox[index].innerHTML === "") return index;
    }
    return null;
  }

  

 
});
// win checker
 function checkWin(move) {
    return winningPatterns.some((pattern) =>
      pattern.every((index) => eachBox[index].innerHTML === move)
    );
  }