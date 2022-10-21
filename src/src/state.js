class State {
    constructor() {
        this.reset()
    }
    reset() {
        this.count = 0
    }

}
function getNewState() {
    return new State()
}
export {getNewState, State}