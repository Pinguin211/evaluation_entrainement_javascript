export class Player {
    constructor() {
        this.hold = 0
        this.current = 0
    }

    getHold() {
        return this.hold
    }

    addHold(nb) {
        this.hold += nb
    }

    resetHold()
    {
        this.hold = 0
    }

    resetCurrent()
    {
        this.current = 0
    }

    getCurrent() {
        return this.current
    }

    addCurrent(nb) {
        this.current += nb
    }

    resetAll() {
        this.resetHold()
        this.resetCurrent()
    }

    HoldCurrent()
    {
        this.addHold(this.getCurrent())
        this.resetCurrent()
    }

}