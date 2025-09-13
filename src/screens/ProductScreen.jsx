import { StyleSheet, Text, View, Pressable, ScrollView, useWindowDimensions } from 'react-native'
import { useState } from 'react'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { addItemTocart } from '../store/slices/cartSlice'
import { ImageComponent } from '../components/AssetsWrapper'
import { fonts } from '../global/fonts'

const ProductScreen = () => {
    const product = useSelector(state => state.shopReducer.productSelected)
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()
    const [reserved, setReserved] = useState(false)

    const handleReserve = () => {
        dispatch(addItemTocart({ product: product, quantity: 1 }))
        setReserved(true)
    }

    return (
        <ScrollView style={styles.productContainer}>
            <Text style={styles.textTitle}>{product.title}</Text>
            <Text style={styles.longDescription}>{product.longDescription}</Text>
            <ImageComponent imageName={product.image} style={{ width: '100%', height: 150, resizeMode: 'contain' }} />

            <View style={styles.tagsContainer}>
                {
                    product.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>-{product.discount}%</Text></View>
                }
            </View>
            {
                product.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
            }
            <Text style={styles.price}>Precio: ${product.price}</Text>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.95 : 1 },
                    styles.addToCartButton,
                    reserved && styles.addToCartButtonDisabled
                ]}
                onPress={handleReserve}
                disabled={reserved}
            >
                <Text style={[styles.textAddToCart, reserved && styles.textAddToCartDisabled]}>
                    {reserved ? 'Reservado' : 'Reservar'}
                </Text>
            </Pressable>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    productContainer: {
        paddingHorizontal: 16,
        marginVertical: 16
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: fonts.title
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
        fontFamily: fonts.text
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    price: {
        fontWeight: '800',
        fontSize: 18,
        fontFamily: fonts.text
    },
    discount: {
        backgroundColor: colors.brightOrange,
        width: 52,
        height: 52,
        borderRadius: 52,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.text
    },
    discountText: {
        color: colors.white,
        textAlign: 'center',
        verticalAlign: 'center',
        fontFamily: fonts.text
    },
    noStockText: {
        color: colors.red,
        fontFamily: fonts.text,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16,
        fontFamily: fonts.text,
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.pink,
        borderRadius: 5,
        marginVertical: 16
    },
    addToCartButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    textAddToCart: {
        color: colors.white,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: fonts.itembold,
    },
    textAddToCartDisabled: {
        color: colors.gray,
    }
})