export default function (args = {}, dispatch) {
    console.log(args.interval);
    let actionArgs = {
        type: 'ChangeInterval',
        interval: args.interval
    };

    dispatch(actionArgs);

    return actionArgs;
};