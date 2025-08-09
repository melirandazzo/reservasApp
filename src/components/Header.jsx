import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import { fonts } from '../global/fonts'

const Header = ({subtitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva tu espacio</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.pink,
        height: 160,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:20,
        color:colors.white,
        fontFamily: fonts.title,
    },
    subtitle:{
        fontSize:14,
        color:colors.white,
        fontFamily: fonts.subtitle,
    }
})