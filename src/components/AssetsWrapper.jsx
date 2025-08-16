import { getImage } from '../global/images'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export const ImageComponent = ({ imageName, style }) => {
    return <Image style={style} source={getImage(imageName)} resizeMode='contain' />
}

export const IconComponent = ({ iconName, style, size = 24 }) => {
    return <Icon name={iconName} size={size} style={style} />
}


