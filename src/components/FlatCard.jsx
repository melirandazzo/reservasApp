import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

//Componente Wrapper
const FlatCard = ({ children,style }) => {
    return (
        <View style={{...styles.container,...style}}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.lightGray,
        padding:32,
        margin:8,
        elevation: 10,
        shadowColor: colors.darkGray,//ios
        shadowOffset: { x: 10, y: 10 },//ios
        shadowOpacity: 0.7//ios
    }
})