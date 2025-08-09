import { Text } from 'react-native'
import { fonts } from '../global/fonts'


export const RegularText = ({ children, style }) => {
    return <Text style={{ fontFamily: fonts.item, ...style }}>{children}</Text>
}



