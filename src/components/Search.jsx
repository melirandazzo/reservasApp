import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../global/colors'
import { fonts } from '../global/fonts'
import { IconComponent } from '../components/AssetsWrapper'

const Search = ({setKeyword}) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder='Buscar producto' 
                onChangeText={(text)=>{setKeyword(text)}}
            />
            <IconComponent iconName="search" size={24} style={{ color: colors.mediumGray,  position:"absolute", left: 8 }} />
    </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginVertical: 16
    },
    searchInput:{
        borderWidth:1,
        borderColor:colors.darkGray,
        borderRadius:5,
        minWidth: "90%",
        paddingLeft:32,
        fontFamily: fonts.text,
        fontSize: 14
        }

})