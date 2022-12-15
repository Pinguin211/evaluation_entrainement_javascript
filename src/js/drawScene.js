import {MyPosition} from "../../lib/MyPosition.js";
import {MyShadow} from "../../lib/MyShadow.js";

const playerTurnColor = "whitesmoke"
const playerNotTurnColor = "white"

const playerTurnFont = "Google-Lato"
const playerNotTurnFont = "Google-Lato-Thin"
const playerNameSize = 100

const ui_color = "#E37222"
const ui_btn_size = 50
const ui_font = "Google-Lato"

/**
 * @param {GameDraw} ctx
 * @param {Rules} rules
 */
export function drawScene(ctx, rules) {
    ctx.ctx.textBaseline = "middle"
    if (rules.playerTurn === 1)
    {
        drawBack(ctx, playerTurnColor, playerNotTurnColor)
        drawName(ctx, playerTurnFont, playerNotTurnFont, playerNameSize, -1)
    }
    else
    {
        drawBack(ctx, playerNotTurnColor, playerTurnColor)
        drawName(ctx, playerNotTurnFont, playerTurnFont, playerNameSize, 1)
    }
    drawHold(ctx, rules, 150)
    drawCurrent(ctx, rules, 120)
    drawDice(ctx, rules)
    drawBtn(ctx, rules, 3)
    if (rules.win)
        drawWin(ctx, rules, 100)

}

function drawBtn(ctx, rules, stroke_width) {
    ctx.drawElemNewGameBtn(rules.NEW_BTN_ID, new MyPosition(ctx.width/2, ctx.height/10), ui_btn_size, ui_color, "black", "Google-Lato", stroke_width)
    ctx.drawElemRollBtn(rules.ROLL_BTN_ID, new MyPosition(ctx.width/2, ctx.height/10*7), ui_btn_size, ui_color, "black", "Google-Lato", stroke_width)
    ctx.drawElemHoldBtn(rules.HOLD_BTN_ID, new MyPosition(ctx.width/2, ctx.height/10*8), ui_btn_size, ui_color, "black", "Google-Lato", stroke_width)
}


function drawBack(ctx, colorLeft, colorRight) {
    ctx.drawRect(0, 0, ctx.width / 2, ctx.height, colorLeft, true)
    ctx.drawRect(ctx.width / 2, 0, ctx.width, ctx.height, colorRight, true)
}

function drawName(ctx, player1font, player2font, size, opt) {
    ctx.drawText("PLAYER 1", ctx.width/4, ctx.height/4, size, player1font, "black", "center")
    ctx.drawText("PLAYER 2", ctx.width/4*3, ctx.height/4, size, player2font, "black", "center")
    ctx.drawCircle((ctx.width/2) + (opt * (size * 2)), ctx.height/4, size/5, ui_color, true)
}

function drawHold(ctx, rules, size) {
    ctx.drawText(rules.player1.hold, ctx.width/4, ctx.height/4 + size, size, ui_font, ui_color, "center")
    ctx.drawText(rules.player2.hold, ctx.width/4 * 3, ctx.height/4 + size, size, ui_font, ui_color, "center")
}

function drawCurrent(ctx, rules, size) {
    //Player 1
    ctx.drawRect(ctx.width/4 - size, ctx.height/20 * 14, size*2, size*2*0.8, ui_color, true)
    ctx.drawText("CURRENT", ctx.width/4, ctx.height/20 * 15, size/4, ui_font, "black", "center")
    ctx.drawText(rules.player1.current, ctx.width/4, ctx.height/20 * 16.5, size/1.5, ui_font, "white", "center")
    //Player 2
    ctx.drawRect(ctx.width/4*3 - size, ctx.height/20 * 14, size*2, size*2*0.8, ui_color, true)
    ctx.drawText("CURRENT", ctx.width/4*3, ctx.height/20 * 15, size/4, ui_font, "black", "center")
    ctx.drawText(rules.player2.current, ctx.width/4*3, ctx.height/20 * 16.5, size/1.5, ui_font, "white", "center")
}

function drawDice(ctx, rules) {
    const size = 200
    const pos = new MyPosition(ctx.width/2 - size/2, ctx.height/3)
    const shadow = new MyShadow("grey", 0, 0, size/5)
    ctx.drawElemDice("42", rules.diceFace, pos, size, ui_color, "white", false, shadow)
}

function drawWin(ctx, rules, sizeText)
{
    const original_shadow = ctx.getShadow()
    const shadow = new MyShadow("black", 0, 0, 30)
    ctx.setShadow(shadow)
    ctx.drawRect(ctx.width/5, ctx.height/5, ctx.width/5 * 3, ctx.height/5 * 3, "whitesmoke", true)
    ctx.setShadow(original_shadow)
    const playerName = "Player " + rules.playerTurn
    ctx.drawText(playerName, ctx.width/2 - sizeText, ctx.height/8 * 3, sizeText, "Google-Lato", "black", "center")
    ctx.drawText("WIN !!", ctx.width/2 + sizeText, ctx.height/8 * 4, sizeText, "Google-Lato", "black", "center")
    ctx.drawElemNewGameBtn(rules.NEW_BTN_WIN_ID, new MyPosition(ctx.width/2, ctx.height/8 * 6), sizeText/2, ui_color, "black", "Google-Lato", 4)
}