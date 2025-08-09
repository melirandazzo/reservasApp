import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import categories from '../data/categories.json'
import FlatCard from '../components/FlatCard';
import { fonts } from '../global/fonts'
import { getImage } from '../global/images'

const CategoriesScreen = ({ setCategorySelected }) => {
    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={() => setCategorySelected(item)}>
                <FlatCard style={styles.cardCustom}>
                    <Image width={120} height={50} source={getImage(item.image)} resizeMode='contain' />
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