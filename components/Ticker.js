"use strict";

module.exports = class Ticker {
    constructor(props, state) {
        this.props = props;
    }

    tick() {
        console.log("start ticker, " + this.props.interval);
        const tickCallback = this.props.tick;
        this.timer = setInterval(tickCallback, this.props.interval);
        tickCallback();
    }

    stopTick() {
        if(this.timer) {
            console.log('stop ticker, ' + this.props.interval);
            clearInterval(this.timer);
        }
    }
};