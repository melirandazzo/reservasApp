import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import categories from '../data/categories.json'
import FlatCard from '../components/FlatCard';
import { fonts } from '../global/fonts'
import { getImage } from '../global/images'
import { ImageComponent } from '../components/AssetsWrapper'

const CategoriesScreen = ({ navigation }) => {
    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={()=>navigation.navigate("Productos",{category: item})}>
                <FlatCard style={styles.cardCustom}>
                    <ImageComponent imageName={item.image} style={{ width: 120, height: 50 }} />
                    <Text style={styles.title}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
        />
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    cardCustom: {
        //backgroundColor:"green"
    }, title: {
        fontFamily: fonts.itembold,
    }
})