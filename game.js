let game = "Stopped";
let rotation = []; // tracks the random buttons that are needed to be pressed in order
let storedButtons = []; // stores the buttons that player presses
let level = 1;
let num = 0; // tracks the current button that is needed to be pressed
let randomNumber = Math.floor(Math.random() * 4);

let sound = {
    green: new Audio("sounds/green.mp3"), 0: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"), 1: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"), 2: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"), 3: new Audio("sounds/blue.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
}

// on keypress starts the game if its not started
$(document).on("keypress", function () {
    if (game === "Stopped") {
        game = "Started";
        storedButtons = []
        startGame();
    };
});

// changes game level, adds random button to rotation list, add animation for button and play a sound
function startGame() {

    $("h1").text(`Level ${level}`);
    rotation.push($(".btn").eq(randomNumber));
    setTimeout(function () {
        sound[randomNumber].play()
        $(".btn").eq(randomNumber).animate({ opacity: 0 }, 100).animate({ opacity: 1 });
    }, 500);
}

// waits for a player button click, stores it in temporary variable clickedButton, stores clicked button in a list,
// plays the sound of clicked button, add animation for pressed button.
$(".btn").click(function (event) {

    let clickedButton = event.target.id;
    storedButtons.push(event.target.id);
    sound[event.target.id].play()
    $(this).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
    }, 200);

    // checks if the button that's needed to be predded is set and compares it with the player clicked button
    // if wrnong button is pressed the game ends.
    if (typeof rotation[num] !== "undefined" && clickedButton === rotation[num].attr("id")) {
        num += 1;
        //when the last button in rotation is pressed goes to next level
        if (storedButtons.length == rotation.length) {
            storedButtons = []
            level += 1;
            num = 0;
            randomNumber = Math.floor(Math.random() * 4);
            startGame()
        }
    } else if (typeof rotation[num] !== "undefined" && clickedButton != rotation[num].attr("id")) {
        game = "Stopped"; rotation = []; storedButtons = []; level = 1; num = 0; randomNumber = Math.floor(Math.random() * 4);
        sound["wrong"].play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").css("background-color", "red")
        setTimeout(function () {
            $("body").css("background-color", "");
        }, 200);
    }
})