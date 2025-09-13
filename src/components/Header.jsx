import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/colors'
import { fonts } from '../global/fonts'
import { useNavigation } from '@react-navigation/native'
import { IconComponent } from '../components/AssetsWrapper'

const Header = ({ subtitle }) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva tu espacio</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {
        canGoBack && <Pressable onPress={() => navigation.goBack()}>
          <IconComponent iconName="arrow-left-circle" size={32} style={{ color: colors.white }} />
          </Pressable>
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