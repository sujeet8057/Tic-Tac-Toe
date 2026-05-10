let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset Game
const resetGame = () => {
    turnO = true;
    count = 0;

    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });

    msgContainer.classList.add("hide");
    container.style.display = "grid"; // show board again
};

// Show Winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    boxes.forEach((box) => {
        box.disabled = true;
    });

    container.style.display = "none";
};

// Draw Function
const showDraw = () => {
    msg.innerText = "Game ended in a Draw!";
    msgContainer.classList.remove("hide");

    container.style.display = "none"; // hide board on draw
};

// Check Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showWinner(pos1Val);
            return true;
        }
    }

    return false;
};

// Box Click
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (!isWinner && count === 9) {
            showDraw();
        }
    });
});

// Buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);