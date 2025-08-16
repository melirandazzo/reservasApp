import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import products from '../data/products.json'
import { useEffect, useState } from 'react'
import { fonts } from '../global/fonts'
import Search from '../components/Search'
import FlatCard from '../components/FlatCard'
import { getImage } from '../global/images'

const generateStockItems = (product) => {
    const items = [];
    for (let i = 1; i <= product.stock; i++) {
        items.push({
            id: `${product.id}${i}`,
            title: `${product.title} ${i}`,
            image: product.image
        });
    }
    return items;
};

const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [keyword, setKeyword] = useState("")

    const { category } = route.params

    useEffect(() => {
        let productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === category.title.toLowerCase())
        if (!category.fixed && productsFilteredByCategory.length > 0) {
            productsFilteredByCategory = generateStockItems(productsFilteredByCategory[0]);
        }

        if (keyword) {
            productsFilteredByCategory = productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(keyword.toLocaleLowerCase()))
        }

        setProductsFiltered(productsFilteredByCategory)
    }, [category, keyword])

    const renderProductItem = ({ item }) => {
        return (
            <Pressable onPress={() => navigation.navigate("Producto",{product: item})}>
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
                renderItem={renderProductItem} //{({ item }) => <RegularText style={{ fontSize: 16 }}>{item.title}</RegularText>}
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