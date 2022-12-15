export class MyCanvas2d {
    /**
     *
     * @param {HTMLCanvasElement} canvas - Element canvas de la page
     * @param {number} width - Largeur du canvas
     * @param {number} height - Hauteur du canvas
     */
    constructor(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        /**
         * @type {HTMLCanvasElement} - Element html
         */
        this.canvas = canvas;
        /**
         * @type {number} - largeur du canvas en px
         */
        this.width = width;
        /**
         * @type {number} - hauteur du canvas en px
         */
        this.height = height;
        /**
         * @type {CanvasRenderingContext2D} - objet du canvas
         */
        this.ctx = canvas.getContext("2d")
    }

    /**
     * Met l'emplacement d'origine au coordoné donné et commence un dessin
     * @param move_x
     * @param move_y
     */
    #startDraw(move_x = 0, move_y = 0)
    {
        this.ctx.moveTo(move_x, move_y)
        this.ctx.beginPath()
    }

    drawLine(start_x, start_y, end_x, end_y, color = "black", width = 1) {
        this.ctx.beginPath()
        this.ctx.moveTo(start_x, start_y)
        this.ctx.lineTo(end_x, end_y)
        const originWidth = this.ctx.lineWidth
        this.ctx.lineWidth = width
        this.ctx.strokeStyle = color
        this.ctx.stroke()
        this.ctx.lineWidth = originWidth
    }

    /**
     * Dessine un cercle sur le canvas
     * @param {number} x - Coordonées x du centre du cercle
     * @param {number} y - Coordonnes y du centre du cercle
     * @param {number} r - Rayon du cercle
     * @param {string} color - couleur du cercle
     * @param {boolean} fill - remplir ou pas le cercle
     * @param {number} stroke_width - largeur du trait
     * @param {number} start - angle de depart du cercle
     * @param {number} end - angle de fin du cercle
     */
    drawCircle(x, y, r, color = "black", fill = false, stroke_width = 1, start = 0, end = Math.PI * 2) {
        this.#startDraw()
        this.ctx.arc(x, y, r, start, end)
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = stroke_width
        this.ctx.stroke()
        if (fill)
        {
            this.ctx.fillStyle = color
            this.ctx.fill()
        }
    }


    /**
     * Dessine un carré sur le canvas
     * @param {number} x - Coordonées x du centre du carré
     * @param {number} y - Coordonnes y du centre du carré
     * @param {number} w - Largeur du carré
     * @param {number} h - largeur du carré
     * @param {string} color - couleur du carré
     * @param {boolean} fill - remplir ou pas le carré
     * @param {number} stroke_width - largeur du trait
     */
    drawRect(x, y, w, h, color = "black", fill = false, stroke_width = 8)
    {
        this.#startDraw()
        this.ctx.rect(x, y, w, h)
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = stroke_width
        this.ctx.stroke()
        if (fill)
        {
            this.ctx.fillStyle = color
            this.ctx.fillRect(x, y, w, h)
        }
    }

    /**
     * Ecris un text sur le canvas avac le position de depart en bas à gauche du texte
     *
     * @param text - Text a ecrire
     * @param x - Position en x
     * @param y - Position en y
     * @param size - Taille en px
     * @param font - Nom de la font a utiliser
     * @param color - Couleur du text
     * @param text_align - Alignement du point de depar tdu texte
     */
    drawText(text, x, y, size, font, color = "black", text_align = "start") {
        this.#startDraw()
        this.ctx.textAlign = text_align;
        this.ctx.font = size + "px " + font;
        this.ctx.fillStyle = color
        this.ctx.fillText(text, x, y)
    }

    drawCircleWithCross(x, y, size, color = "black", stroke_width = 8)
    {
        this.drawLine(x-(size*0.7), y, x+(size*0.7), y, color, stroke_width)
        this.drawLine(x, y-(size*0.7), x, y+(size*0.7), color, stroke_width)
        this.drawCircle(x, y, size, color, false, stroke_width)
    }

    drawArrowCircle(x, y, size, color = "black", stroke_width = 8)
    {
        this.drawCircle(x, y, size, color, false, stroke_width, 0.2, Math.PI + 0.05)
        this.drawCircle(x, y, size, color, false, stroke_width, 9.6, 0.0)
        this.drawLine(x - size, y, x - size - (size/5), y + size/5, color, stroke_width)
        this.drawLine(x - size, y, x - size + (size/5), y + size/5, color, stroke_width)
        this.drawLine(x + size, y, x + size + (size/5), y - size/5, color, stroke_width)
        this.drawLine(x + size, y, x + size - (size/5), y - size/5, color, stroke_width)
    }

    drawBoxWithArrow(x, y, size, color = "black", stroke_width = 8)
    {
        this.drawRect(x - (size/2), y - (size/3), size, size, color, false, stroke_width)
        this.drawLine(x, y + size/4, x, y - size*0.7, color, stroke_width)
        this.drawLine(x, y + size/4, x - size/5, y, color, stroke_width)
        this.drawLine(x, y + size/4, x + size/5, y, color, stroke_width)

    }

    /**
     *
     * Dessine un quadrillage sur le canvas
     *
     * opt <= 1 ne fait que le quadrillage des lignes
     * opt == 2 ne fait que le quadrillage des colonnes
     * opt >= 3 fait les deux
     *
     * @param {number} opt - Option du quadrillage
     * @param {number} marge - Marge entre chaque ligne (en px)
     * @param {string} color - couleur du quadrillage
     * @param {number} width - largeur des lignes
     */
    drawGrid(marge, opt = 3, color = 'black', width = 1)
    {
        let nb = marge
        while (nb < this.width)
        {
            if (opt >= 3 || opt <= 1)
                this.drawLine(0, nb, this.width, nb, color, width)
            if (opt >= 3 || opt === 2)
                this.drawLine(nb, 0, nb, this.height, color, width)
            nb += marge
        }
    }

    /**
     * Efface tout se qui est dessiné sur l'image
     */
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    /**
     * Set la couleur du background
     * @param color
     */
    setBackgroundColor(color)
    {
        this.canvas.style.background = color
    }

    /**
     * Set les ombres pour les prochains dessins
     * @param {string} color - Couleur de l'ombre
     * @param {number} offsetX - Decalage ver l'axe X en px
     * @param {number} offsetY - Decalage ver l'axe Y en px
     * @param {number} blur - distance en px
     */
    setShadow(color, offsetX, offsetY, blur) {
        this.ctx.shadowColor = color
        this.ctx.shadowBlur = blur
        this.ctx.shadowOffsetX = offsetX
        this.ctx.shadowOffsetY = offsetY
    }

    /**
     * Remet a zero le parametre des ombres
     */
    removeShadow() {
        this.ctx.shadowColor = null
        this.ctx.shadowBlur = null
        this.ctx.shadowOffsetX = null
        this.ctx.shadowOffsetY = null
    }
}