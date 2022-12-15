import {Rules} from "./gameRules/Rules.js";

export function onClick(ctx, rules, mouspos) {
    if (!rules.win)
        gameBtn(ctx, rules, mouspos)
    else
        winBtn(ctx, rules, mouspos)
}


function winBtn(ctx, rules, mouspos)
{
    const id = ctx.isOnElemList(mouspos)
    if (id === rules.NEW_BTN_WIN_ID)
        rules.restartGame()
}


function gameBtn(ctx, rules, mouspos) {
    const id = ctx.isOnElemList(mouspos)
    if (id !== false)
    {
        switch (id) {
            case rules.NEW_BTN_ID:
                rules.restartGame()
                break;
            case rules.ROLL_BTN_ID:
                rolldice(rules)
                break;
            case rules.HOLD_BTN_ID:
                rules.getPlayerTurn().HoldCurrent()
                if (!rules.playerWin())
                    rules.nextPlayerTurn()
                break;
        }
    }
}

function rolldice(rules)
{
    const face = Math.floor(Math.random() * 6) + 1
    if (face === 1)
    {
        rules.getPlayerTurn().resetCurrent()
        rules.nextPlayerTurn()
    }
    else
        rules.getPlayerTurn().addCurrent(face)
    rules.diceFace = face
}
