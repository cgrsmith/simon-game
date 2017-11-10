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
        this.colorMap = {
            0 : "red",
            1 : "blue",
            2 : "yellow",
            3 : "green"
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
    }
    addStep() {
        let nextColor = this.colorMap[Math.floor(Math.random()*4)];
        console.log("--"+nextColor);
        this.series.push(nextColor);
    }

    pausePlayback(index) {
        this.unPressed();
        let self = this;
        setTimeout(function() {self.startPlayback(index + 1)},200);
    }

    startPlayback(index) {
        this.playback = true;
        console.log(this.series);
        if (index < this.series.length) {
            this.highlight($("#"+this.series[index]));
            let self = this;
            setTimeout(function() {self.pausePlayback(index)},1000);
        }else {
            //Completed a round, players go
            this.playback = false;
            this.running = true;
        }    
    }
    
    playerInput(color) {
        if (this.playback === false && this.running) {
            console.log(color +" " + this.series[this.playerIndex]);
            if (this.series[this.playerIndex] === color) {            
                this.playerIndex++;
                //Completed a round
                if (this.playerIndex === 5) {
                    //Game Over
                    console.log("player win");
                    this.reset();
                } else if (this.series.length === this.playerIndex) {
                    this.playerIndex = 0;
                    this.addStep();
                    this.startPlayback(0);
                }
            } else if (this.strict) {
                this.reset();
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
        quadrant.addClass("down");
    }
    unPressed() {
        $("*").removeClass("down");
    }
}

