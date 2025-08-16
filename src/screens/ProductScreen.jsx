import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductScreen = ({ navigation, route }) => {
  const { product } = route.params
  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})