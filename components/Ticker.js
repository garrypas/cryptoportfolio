"use strict";

module.exports = class Ticker {
    constructor(props, state) {
        this.props = props;
    }

    tick() {
        const tickCallback = this.props.tick;
        this.timer = setInterval(tickCallback, this.props.interval);
    }

    stopTick() {
        clearInterval(this.timer);
    }
};