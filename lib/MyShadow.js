export class MyShadow {

    /**
     * @param {string} color - Couleur de l'ombre
     * @param {number} offsetX - Decalage ver l'axe X en px
     * @param {number} offsetY - Decalage ver l'axe Y en px
     * @param {number} blur - distance en px
     */
    constructor(color, offsetX, offsetY, blur) {
        this.color = color
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.blur = blur
    }

    /**
     * @returns {string}
     */
    getColor() {
        return this.color
    }

    /**
     * @returns {number}
     */
    getOffsetX() {
        return this.offsetX
    }

    /**
     * @returns {number}
     */
    getOffsetY() {
        return this.offsetY
    }

    /**
     * @returns {number}
     */
    getBlur() {
        return this.blur
    }
}