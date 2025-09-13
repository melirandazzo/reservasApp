import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors';
import { IconComponent } from '../components/AssetsWrapper'

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <IconComponent iconName="camera" size={24} style={{ color: colors.white }} />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.darkGray,
        width:48,
        height:48,
        borderRadius:32
    }
})