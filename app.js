"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jQuery");
const body = require("./ui");
// import {drawHead, drawTorso, drawLeftLeg, drawRightLeg, drawLeftArm, drawRightArm} from "./ui";
// Global variables
let words = ["cat", "tree", "swing", "around", "scientist"]; //5
let gameAnswer = "";
let gameShownAnswer = "";
let hangmanState = -1;
function chooseWord() {
    // 0 based index, don't need to add 1
    return words[Math.floor(Math.random() * words.length)];
}
function blanksFromAnswer(answerWord) {
    let result = "";
    for (let entry of answerWord) {
        result = result + "_";
    }
    return result;
}
// console.log(blanksFromAnswer(chooseWord()));
// Just change the letter @ stringPos with charIn, no more
// Assume positive stringPos, no bounds checking
function alterAt(stringPos, charIn, originalString) {
    let result = originalString.substr(0, stringPos) + charIn + originalString.substr(stringPos + 1, originalString.length);
    return result;
}
// ERORR: This replaces shown on each call
// letter = 'r'; shown = _ _ _ _; answer = 'tree'
function guessLetter(letter, shown, answer) {
    let checkLetter = -1;
    checkLetter = answer.indexOf(letter); // return -1 when not found
    while (checkLetter >= 0) {
        // 1. Replace letter in shown with alterAt()
        shown = alterAt(checkLetter, letter, shown);
        // 2. Use indexOf() again and store in checkLetter
        checkLetter = answer.indexOf(letter, checkLetter + 1);
    }
    return shown;
}
function wrongLetter(letter) {
    $("div#wrong-letters").append($('<span/>').addClass("guessed-letter").text(letter));
}
// Test Actions
// body.drawHead();
// body.drawTorso();
// body.drawRightArm();
// body.drawLeftArm();
// body.drawRightLeg();
// body.drawLeftLeg();
let drawSequence = [];
drawSequence[0] = body.drawHead;
drawSequence[1] = body.drawTorso;
drawSequence[2] = body.drawRightArm;
drawSequence[3] = body.drawLeftArm;
drawSequence[4] = body.drawRightLeg;
drawSequence[5] = body.drawLeftLeg;
// for(let entry of drawSequence) {
//   entry();
// }
// 1. answer = "tree"
// 2. <span class='shown-letter'>' '</span>
// ...
// 3. updateWord( "tree" )
// Update the word when the player gets a letter right.
// Create an empty <span/> for each letter in the word inside the word-display div.
// We will update each span with jquery later.
function drawWord(answer) {
    console.log(`drawWord : ${answer}`);
    for (let char of answer) {
        $("div.word-display").append($('<span/>').addClass("shown-letter").html('&nbsp'));
    }
}
// Iterate through the show-letter spans created in drawWord.
function updateWord(answer) {
    console.log(`updateWord : ${answer}`);
    let letter = $("span.shown-letter:first");
    for (let char of answer) {
        // what can char be? A letter, or an underscore '_'
        if (char != '_') {
            letter.text(char);
        }
        else {
            letter.html('&nbsp');
        }
        letter = letter.next();
    }
}
function resetUI() {
    $("div.body-part").remove();
    $("span.guessed-letter").remove();
    $("span.shown-letter").remove();
}
function resetGame() {
    resetUI();
    gameAnswer = chooseWord();
    gameShownAnswer = blanksFromAnswer(gameAnswer);
    console.log(`Game Answer: ${gameAnswer}`);
    console.log(`Game Shown Answer: ${gameShownAnswer}`);
    hangmanState = 0;
    drawWord(gameShownAnswer);
}
// function testKeyPress(): void {
//   alert("Caught a .keypress event");
// }
function doKeyPress() {
    let inputChar = String($("input#letter-input").val()).toLowerCase();
    console.log(" *** ");
    console.log(`Char in: ${inputChar}, hangmanState: ${hangmanState}:${drawSequence.length}`);
    let tempString = guessLetter(inputChar, gameShownAnswer, gameAnswer);
    $("input#letter-input").val("");
    // gameShownAnswer == tempString ?
    // debug output
    console.log(`tempString: ${tempString}, gameShownAnswer: ${gameShownAnswer}, gameAnswer: ${gameAnswer}`);
    if (tempString != gameShownAnswer) {
        updateWord(tempString);
        gameShownAnswer = tempString;
        if (gameShownAnswer === gameAnswer) {
            setTimeout(function () {
                win();
            }, 500);
        }
    }
    else {
        wrongLetter(inputChar);
        drawSequence[hangmanState++]();
        if (hangmanState === drawSequence.length) {
            setTimeout(function () {
                lose();
            }, 500);
        }
    }
}
$(function () {
    resetGame();
});
let win = () => { alert("You win!"); resetGame(); };
let lose = () => { alert("Sorry, you lose.\n Correct answer was: " + gameAnswer); resetGame(); };
// Handlers
$("#letter-input").keyup(function () {
    doKeyPress();
});
