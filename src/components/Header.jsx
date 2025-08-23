import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/colors'
import { fonts } from '../global/fonts'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const Header = ({ subtitle }) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva tu espacio</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {
        canGoBack && <Pressable onPress={() => navigation.goBack()}><Icon name="arrow-left-circle" size={32} color={colors.white} style={styles.goBackIcon} /></Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pink,
    height: 160,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.title,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.subtitle,
  }
})