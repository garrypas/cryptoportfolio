"use strict";

import { Actions } from 'react-native-router-flux';

module.exports = {
    current: () => Actions.currentScene,
    navigate: (dest, args) => Actions[dest](args),
};