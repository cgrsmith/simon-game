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
            $(this).removeClass("latched");
            game.reset();
        } else {
            $(this).addClass("latched");
            game.start();
        }
    });
});

class SimonGame {
    constructor() {
        this.playback = false;
        this.running = false;
        this.series = [];
        this.playerIndex = 0;
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
        this.pausePlayback(0);
    }
    reset() {
        this.playback = false;
        this.running = false;
        this.series = [];
        this.playerIndex = 0;
    }
    addStep() {
        let nextColor = this.colorMap[Math.floor(Math.random()*5)];
        this.series.push(nextColor);
        this.series.push("red");
        this.series.push("green");
    }
    pausePlayback(index) {
        this.unPressed();
        let self = this;
        setTimeout(function() {self.startPlayback(index)},200);
    }
    startPlayback(index) {
        console.log(this.series[index] +" " + index);
        if (index < this.series.length) {
            this.highlight($("#"+this.series[index]));
            let self = this;
            setTimeout(function() {self.pausePlayback(index + 1)},1000);
        }
        else {
            $("#goButton").removeClass("latched");
            this.reset();
        }
            
    }
    playerInput(color) {

    }
    //Mousedown and Mouseup are purely visual/auditory, handle functionality with .click event 
    quadrantPressed(quadrant) {
        if (this.playback === false && this.running) {
            this.highlight();
        }
    }
    highlight(quadrant) {
        quadrant.addClass("down");
    }
    unPressed() {
        ///if (this.playback === false) {
            $("*").removeClass("down");
        //}
    }
}

