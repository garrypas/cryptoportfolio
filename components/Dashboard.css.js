export default {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListStyle: {
        width: '100%',
        flex: 1,
    },

    flatListItemStyle: {
        padding: 20,
        flex: 1,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        flexDirection:"row"
    },

    headerStyle: {
        padding: 20,
        paddingTop: 50,
        height: 100,
        borderWidth: 1,
        width: '100%',
        backgroundColor: '#9999cc'
    },

    headerTextStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign:'center'
    },

    itemName: {
        width:'50%',
        flex: 1,
        justifyContent: 'flex-start',
    },

    itemNameText: {
        justifyContent: 'flex-start',
        fontWeight:'bold'
    },

    itemPrice: {
        width:'50%',
        flex: 1,
    },
    itemPriceText: {
        justifyContent: 'flex-end',
    }
};