export class ElementDraw {
    /**
     *
     * @param id - identifiant de l'element
     * @param start_pos - Position de depart de l'element
     * @param width - longueur du l'element
     * @param height - hauteur de l'element
     */
    constructor(id, start_pos, width, height) {
        this.id = id
        this.start_pos = start_pos
        this.width = width
        this.height = height
    }

    /**
     * @param {MyPosition} pos
     * @return {boolean} - Renvoie true si la possition envoyé est sur l'element, false si non
     */
    posIsOn(pos) {
        if (pos.x > this.start_pos.x && pos.x < (this.start_pos.x + this.width) &&
            pos.y > this.start_pos.y && pos.y < (this.start_pos.y + this.height))
            return true
        else
            return false
    }
}