import { StyleSheet, Text, FlatList, Pressable } from 'react-native'
import FlatCard from '../components/FlatCard';
import { fonts } from '../global/fonts'
import { ImageComponent } from '../components/AssetsWrapper'
import { useDispatch } from 'react-redux';
import { setCategorySelected } from '../store/slices/shopSlice';
import { useGetCategoriesQuery } from '../services/shopApi';

const CategoriesScreen = ({ navigation }) => {
    const {data:categories, isLoading, error} = useGetCategoriesQuery()

    const dispatch = useDispatch()

    const handleSelectCategory = (category) => {
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleSelectCategory(item)}>
                <FlatCard>
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
     title: {
        fontFamily: fonts.itembold,
    }
})