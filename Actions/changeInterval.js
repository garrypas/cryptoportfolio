export default function (args = {}, dispatch) {
    console.log(args.interval);
    let actionArgs = {
        type: 'CHANGE_INTERVAL',
        interval: args.interval
    };

    dispatch(actionArgs);

    return actionArgs;
};