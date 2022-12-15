export class MyPosition {
    /**
     * @param {number} x - position en x
     * @param {number} y - position en y
     */
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    /**
     * @returns {number}
     */
    getX() {
        return this.x
    }

    /**
     * @param {number} x
     */
    setX(x) {
        this.x = x
    }

    /**
     * @returns {number}
     */
    getY() {
        return this.y
    }

    /**
     * @param {number} y
     */
    setY(y) {
        this.y = y
    }
}