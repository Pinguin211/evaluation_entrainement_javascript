import {GameDraw} from "./js/GameDraw.js";
import {Rules} from "./js/gameRules/Rules.js";
import {MyPosition} from "../lib/MyPosition.js";
import {drawScene} from "./js/drawScene.js";
import {onClick} from "./js/onClick.js";

//Canvas
const canvas = document.getElementById("canvas")
let ctx;
//Cursor
let mousepos = null
let mouseclick = false
let gameIntervaleId = 0
let cursor = new Image()
let cursorLoad = false
//Game
let rules = Rules.startGame()

if (canvas.getContext) {
    //Creer le canvas
    ctx = new GameDraw(canvas, 1920, 1080)
    //Creer la premiere image
    drawFirstPage(ctx)
    //Event
    ctx.canvas.addEventListener("mousemove", (evt) => {
        mousepos = getMousePosition(evt, ctx)
    })
    ctx.canvas.addEventListener("mouseleave", () => {
        clearInterval(gameIntervaleId)
    })
    ctx.canvas.addEventListener("mouseenter", () => {
        gameIntervaleId = setInterval(() => gameLoop(), 20)
    })
    ctx.canvas.addEventListener("click", () => {
        mouseclick = true
    })
    cursor.src = "../assets/img/cursor.ico"
    cursor.addEventListener("load", () => {
        cursorLoad = true
        ctx.canvas.style.cursor = "none"
    })
} else {
    console.log('canevas non supporté')
}


function gameLoop() {
    ctx.elemhove = ctx.isOnElemList(mousepos)
    if (mouseclick)
    {
        onClick(ctx, rules, mousepos)
        mouseclick = false
    }
    ctx.clear()
    drawScene(ctx, rules)
    if (cursorLoad)
        ctx.ctx.drawImage(cursor, mousepos.x, mousepos.y)
}

/**
 * @param {MouseEvent} evt
 * @param {GameDraw} ctx
 */
function getMousePosition(evt, ctx) {
    const x = Math.floor((evt.offsetX * ctx.width)/ctx.canvas.offsetWidth)
    const y = Math.floor((evt.offsetY * ctx.height)/ctx.canvas.offsetHeight)
    return new MyPosition(x, y)
}

/**
 *
 * @param {GameDraw} ctx
 */
function drawFirstPage(ctx)
{
    ctx.drawRect(0, 0, ctx.width, ctx.height, "grey", true)
    ctx.drawText("move your mouse here...",ctx.width/2, ctx.height/2, 15, "Google-Lato-Thin", "white", "center")
}