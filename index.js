$(document).ready(function() {
    let game = new SimonGame();
    $(".quadrant")
        .click(function() {
            game.playerInput($(this).val());    
        }).mousedown(function() {
            game.quadrantPressed($(this));
    });
    $("*").mouseup(function() {
        game.unPressed();
    });
    $("#goButton").click(function() {
        if (game.running) {
            game.reset();
        } else {
            $(this).addClass("latched");
            game.start();
        }
    });
    $("#strictButton").click(function() {
        if (!game.running) {
            if (game.strict) {
                game.strict = false;
                $(this).removeClass("latched");
            } else {
                game.strict = true;
                $(this).addClass("latched");
            }
        }
    });
});

class SimonGame {
    constructor() {
        this.playback = false;
        this.running = false;
        this.series = [];
        this.playerIndex = 0;
        this.strict = false;
        this.sounds = {
            "red" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
            "blue" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
            "yellow" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
            "green" : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
        }
    }
    start() {
        this.running = true;
        this.playback = true;
        this.addStep();
        this.startPlayback(0);
    }
    reset() {
        this.playback = false;
        this.running = false;
        this.series = [];
        this.playerIndex = 0;
        $("#goButton").removeClass("latched");
        //$("#counter").html("0");
    }

    addStep() {
         const colorMap = {
            0 : "red",
            1 : "blue",
            2 : "yellow",
            3 : "green"
        }
        let nextColor = colorMap[Math.floor(Math.random()*4)];
        this.series.push(nextColor);
    }

    pausePlayback(index) {
        this.unPressed();
        let self = this;
        setTimeout(function() {self.startPlayback(index + 1)},200);
    }

    startPlayback(index) {
        $("#counter").html(this.series.length);
        if (index < this.series.length) {
            this.highlight($("#"+this.series[index]));
            let self = this;
            setTimeout(function() {self.pausePlayback(index)},1000);
        }else {
            //Completed a round, players go
            this.playback = false;
        }    
    }
    
    playerInput(color) {
        const totalRounds = 20;
        if (this.playback === false && this.running) {
            let self = this;
            if (this.series[this.playerIndex] === color) {            
                this.playerIndex++;
                //Game Over
                if (this.playerIndex === totalRounds) {
                    $("#counter").html("Win");
                    this.reset();
                //Completed a round
                } else if (this.series.length === this.playerIndex) {
                    //Completed a round
                    this.playerIndex = 0;
                    this.playback = true;
                    setTimeout(function() {
                        self.addStep();
                        self.startPlayback(0);
                    }, 500);
                }
            } else if (this.strict) {
                this.series = [];
                this.playerIndex = 0;
                this.start();
            } else {
                this.playerIndex = 0;
                this.startPlayback(0);
            }
        }
    }

    //Mousedown and Mouseup are purely visual/auditory, handle functionality with .click event 
    quadrantPressed(quadrant) {
        if (this.playback === false && this.running) {
            this.highlight(quadrant);
        }
    }
    highlight(quadrant) {
        //this CAN be slow, price you pay
        this.sounds[quadrant.val()].cloneNode().play();
        quadrant.addClass("down");
    }
    unPressed() {
        $("*").removeClass("down");
    }
}

