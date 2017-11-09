$(document).ready(function() {
    let game = new SimonGame();
    $(".quadrant")
        .click(function() {
            
        }).mousedown(function() {
            game.quadrantPressed($(this));
    });
    $("*").mouseup(function() {
        game.unPressed();
    });
});

class SimonGame {
    constructor() {
        this.playback = false;
    }

    //Mousedown and Mouseup are purely visual/auditory, handle functionality with .click event 
    quadrantPressed(quadrant) {
        if (this.playback === false) {
            quadrant.addClass("down");
        }
    }
    unPressed() {
        if (this.playback === false) {
            $("*").removeClass("down");
        }
    }
}

