import {Player} from "./Player.js";

export class Rules {

    HOLD_BTN_ID = 1
    ROLL_BTN_ID = 2
    NEW_BTN_ID = 3
    NEW_BTN_WIN_ID = 4

    diceFace = 0
    win = false

    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.playerTurn = Math.floor(Math.random() * 2) + 1
    }

    static startGame() {
       return new Rules(new Player(), new Player())
    }

    restartGame() {
        this.diceFace = 0
        this.player1.resetAll()
        this.player2.resetAll()
        this.playerTurn = Math.floor(Math.random() * 2) + 1
        this.win = false
    }

    getPlayerTurn()
    {
        if (this.playerTurn === 1)
            return this.player1
        else
            return this.player2
    }

    nextPlayerTurn() {
        if (this.playerTurn === 1)
            this.playerTurn = 2
        else
            this.playerTurn = 1
    }

    playerWin() {
        if (this.getPlayerTurn().getHold() >= 100)
        {
            this.win = true
            return true
        }
        else
            return false
    }
}