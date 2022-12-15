import {MyCanvas2d} from "../../lib/MyCanvas2d.js";
import {MyShadow} from "../../lib/MyShadow.js";
import {MyPosition} from "../../lib/MyPosition.js";
import {ElementDraw} from "./ElementDraw.js";


const btnShader = new MyShadow("black", 10, 10, 20)

export class GameDraw extends MyCanvas2d{

    /**
     * @type {Array} - Liste des element dessiner sur le dessin
     */
    elemlist = []
    elemhove = 0

    /**
     * @param {HTMLCanvasElement} canvas - Element canvas de la page
     * @param {number} width - Largeur du canvas
     * @param {number} height - Hauteur du canvas
     */
    constructor(canvas, width, height) {
        super(canvas, width, height)
    }

    clear() {
        this.elemlist = []
        super.clear();
    }

    /**
     *
     * @param {number} id - Id de l'elements
     * @param {number} face - Numero de la face du dé (entre 1 et 6)
     * @param {MyPosition} pos - Position de depart du dessin
     * @param {number} size - longueur des coté
     * @param {string} color - couleur des bordures et des points
     * @param {string} color_bg - couleur du dés
     * @param {boolean} stroke - Afficher ou pas les bordure du dé
     * @param {boolean} shadow - ajouté des ombres sur le dés
     */
    drawElemDice(id, face, pos, size, color = "black", color_bg = "white", stroke = true, shadow = undefined)
    {
        const tmp_shadow = this.getShadow()
        if (shadow !== undefined)
            this.setShadow(shadow)
        this.drawRect(pos.getX(), pos.getY(), size, size, color_bg, true)
        this.removeShadow()
        if (stroke)
            this.drawRect(pos.getX(), pos.getY(), size, size, color, false)
        else
            this.drawRect(pos.getX(), pos.getY(), size, size, color_bg, false)
        const posrect = GameDraw.#getPositionPoint(pos.getX(), pos.getY(), size, face)
        posrect.forEach(pos => this.drawCircle(pos[0], pos[1], size/12, color, true))
        this.setShadow(tmp_shadow)
        this.elemlist.push(new ElementDraw(id, pos, size, size))
    }
    static #getPositionPoint(x, y, size, face)
    {
        if (face > 6 || face < 1)
            return []
        switch (face) {
            case 1:
                return [
                    [x + (size/2), y + (size/2)]
                ]
            case 2:
                return [
                    [x + (size/6), y + (size/6)],
                    [x + ((size/6) * 5), y + ((size/6) * 5)]
                ]
            case 3:
                return [
                    [x + (size/6), y + (size/6)],
                    [x + ((size/6) * 5), y + ((size/6) * 5)],
                    [x + ((size/6) * 3), y + ((size/6) * 3)]
                ]
            case 4 :
            case 5 :
            case 6 :
                const arr = [
                    [x + (size/6), y + (size/6)],
                    [x + ((size/6) * 5), y + ((size/6))],
                    [x + (size/6), y + ((size/6) * 5)],
                    [x + ((size/6) * 5), y + ((size/6) * 5)]
                ]
                if (face === 4)
                    return arr
                else if (face === 5)
                    return arr.concat([[x + (size/2), y + (size/2)]])
                else
                    return arr.concat([
                        [x + (size/6), y + ((size/6) * 3)],
                        [x + ((size/6) * 5), y + ((size/6) * 3)]
                    ])
        }
    }


    /**
     * /!\ Le point de l'element est au centre /!\
     *
     * @param {number} id - id de l'element
     * @param {MyPosition} pos - position de depart de l'element
     * @param {number} size - taille de l'element (hauteur en px, largeur automatique)
     * @param {string} color_logo - couleur du logo
     * @param {string} color_font - couleur du text
     * @param {string} font_style - style de font
     * @param {number} stroke_width - epaisseur des trait du logo
     */
    drawElemNewGameBtn(id, pos, size, color_logo = "orange", color_font = "black", font_style = "Lato", stroke_width = 8)
    {
        const original_shad = this.getShadow()
        if (this.elemhove === id)
            this.setShadow(btnShader)
        this.ctx.font =  size + "px " + font_style
        const text_width = this.ctx.measureText("NEW GAME").width
        const r = size/2
        const w = (r*2) + r + text_width
        this.drawCircleWithCross(pos.x - ((w/2) - r), pos.y, r, color_logo, stroke_width)
        this.drawText("NEW GAME", pos.x - ((w/2) - (3*r)), pos.y, size, font_style, color_font)
        this.elemlist.push(new ElementDraw(id, new MyPosition(pos.x - w/2, pos.y - r), w, r*2))
        if (this.elemhove === id)
            this.setShadow(original_shad)
    }

    drawElemRollBtn(id, pos, size, color_logo = "orange", color_font = "black", font_style = "Lato", stroke_width = 8)
    {
        const original_shad = this.getShadow()
        if (this.elemhove === id)
            this.setShadow(btnShader)
        this.ctx.font =  size + "px " + font_style
        const text_width = this.ctx.measureText("ROLL DICE").width
        const r = size/2
        const w = (r*2) + r + text_width
        this.drawArrowCircle(pos.x - ((w/2) - r), pos.y, r, color_logo, stroke_width)
        this.drawText("ROLL DICE", pos.x - ((w/2) - (3*r)), pos.y, size, font_style, color_font)
        this.elemlist.push(new ElementDraw(id, new MyPosition(pos.x - w/2, pos.y - r), w, r*2))
        if (this.elemhove === id)
            this.setShadow(original_shad)
    }

    drawElemHoldBtn(id, pos, size, color_logo = "orange", color_font = "black", font_style = "Lato", stroke_width = 8)
    {
        const original_shad = this.getShadow()
        if (this.elemhove === id)
            this.setShadow(btnShader)
        this.ctx.font =  size + "px " + font_style
        const text_width = this.ctx.measureText("HOLD").width
        const r = size/2
        const w = (r*2) + r + text_width
        this.drawBoxWithArrow(pos.x - ((w/2) - r), pos.y, size, color_logo, stroke_width)
        this.drawText("HOLD", pos.x - ((w/2) - (3*r)), pos.y, size, font_style, color_font)
        this.elemlist.push(new ElementDraw(id, new MyPosition(pos.x - w/2, pos.y - r), w, r*2))
        if (this.elemhove === id)
            this.setShadow(original_shad)
    }

    /**
     * @returns {MyShadow} - Renvoie les paramatre de l'ombre actuel dans l'objet
     */
    getShadow() {
        return new MyShadow(this.ctx.shadowColor, this.ctx.shadowOffsetX, this.ctx.shadowOffsetY, this.ctx.shadowBlur)
    }

    /**
     * @param {MyShadow} shadow
     * @override
     */
    setShadow(shadow) {
        super.setShadow(shadow.color, shadow.offsetX, shadow.offsetY, shadow.blur);
    }

    /**
     * Retourne l'id de l'élement si la position donner est dessus
     * @param pos
     */
    isOnElemList(pos) {
        let elemid = false
        this.elemlist.forEach(elem => {
            if (elem.posIsOn(pos))
                elemid = elem.id
        })
        return elemid
    }

    drawElemList(color = "red", stroke_width = 2)
    {
        this.elemlist.forEach(elem => this.drawRect(elem.start_pos.x, elem.start_pos.y, elem.width, elem.height, color, false, stroke_width))
    }

}