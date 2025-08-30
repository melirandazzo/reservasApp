import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
//import categories from '../data/categories.json'
import FlatCard from '../components/FlatCard';
import { fonts } from '../global/fonts'
import { getImage } from '../global/images'
import { ImageComponent } from '../components/AssetsWrapper'
import { useSelector, useDispatch } from 'react-redux';
import { setCategorySelected } from '../store/slices/shopSlice';
import { useGetCategoriesQuery } from '../services/shopApi';

const CategoriesScreen = ({ navigation }) => {
    //const categories = useSelector(state => state.shopReducer.categories)
    const {data:categories, isLoading, error} = useGetCategoriesQuery()

    const dispatch = useDispatch()

    const handleSelectCategory = (category) => {
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleSelectCategory(item)}>
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