import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { fonts } from '../global/fonts'
import Search from '../components/Search'
import FlatCard from '../components/FlatCard'
import { getImage } from '../global/images'
import { useSelector,useDispatch } from 'react-redux'
import { setProductSelected } from '../store/slices/shopSlice'
import { useGetProductsByCategoryQuery } from '../services/shopApi'

const generateStockItems = (product) => {
    const items = [];
    for (let i = 1; i <= product.stock; i++) {
        items.push({
            id: `${product.id}${i}`,
            title: `${product.title} ${i}`,
            image: product.image,
            price: product.price,
            shortDescription: product.shortDescription,
            longDescription: product.longDescription,
        });
    }
    return items;
};

const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [keyword, setKeyword] = useState("")

    const category = useSelector(state=>state.shopReducer.categorySelected)

    const {data:productsFilteredByCategory, isLoading, error} = useGetProductsByCategoryQuery(category.id)

    const dispatch = useDispatch()

    const handleSelectProduct = (product) => {
        dispatch(setProductSelected(product))
        navigation.navigate("Producto")
    }

    useEffect(() => {
        let filtered = productsFilteredByCategory || [];
        if (!category.fixed && filtered.length > 0) {
            filtered = generateStockItems(productsFilteredByCategory[0]);
        }

        if (keyword) {
            filtered = productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(keyword.toLocaleLowerCase()))
        }

        setProductsFiltered(filtered)
    }, [category, keyword, productsFilteredByCategory])

    const renderProductItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleSelectProduct(item)}>
                <FlatCard style={styles.cardCustom}>
                    <Image source={getImage(item.image)} style={{ width: 120, height: 50 }} resizeMode="contain" />
                    <Text style={styles.title}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        )
    }

    return (
        <View >
            <Search setKeyword={setKeyword} />
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id}
                renderItem={renderProductItem} 
            />
        </View>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    cardCustom: {

    }, title: {
        fontFamily: fonts.itembold
    }
})