import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/colors'
import FlatCard from '../components/FlatCard'
import { IconComponent } from '../components/AssetsWrapper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart } from '../store/slices/cartSlice'
import { ImageComponent } from '../components/AssetsWrapper'
import { fonts } from '../global/fonts'

const CartScreen = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const total = useSelector(state => state.cartReducer.total)
  const dispatch = useDispatch()

  const [showPickerId, setShowPickerId] = useState(null)
  const [selectedDates, setSelectedDates] = useState({})

  const handleCalendarPress = (id) => {
    setShowPickerId(id)
  }

  const handleDateChange = (id, event, date) => {
    setShowPickerId(null)
    if (date) setSelectedDates(prev => ({ ...prev, [id]: date }))
  }

  const handleDeleteItem = (id) => {
    dispatch(removeItemFromCart(id))
  }

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total} </Text>
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View style={styles.cartDescription}>
        <View style={styles.rowTitleImage}>
          <ImageComponent imageName={item.image} style={{ width: 48, height: 48, resizeMode: 'cover', marginRight: 12 }} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
        <Text stlyle={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
        <View style={{ marginBottom: 12 }}>
          {selectedDates[item.id] && (
            <Text style={styles.selectedDateText}>
              Fecha seleccionada: {selectedDates[item.id].toLocaleDateString()}
            </Text>
          )}
          {selectedDates[item.id] && <View style={{ height: 8 }} />}
          <Pressable style={styles.calendarButton} onPress={() => handleCalendarPress(item.id)}>
            <IconComponent iconName="calendar" size={24} style={{ color: colors.pink, marginRight: 8 }} />
            <Text style={styles.calendarButtonText}>
              {selectedDates[item.id] ? 'Cambiar fecha' : 'Seleccionar fecha'}
            </Text>
          </Pressable>
        </View>
        {showPickerId === item.id && (
          <DateTimePicker
            value={selectedDates[item.id] || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(item.id, event, date)}
          />
        )}
        <Pressable onPress={() => handleDeleteItem(item.id)}>
          <IconComponent iconName="trash" size={24} style={{ color: colors.pink, marginRight: 12 }} />
        </Pressable>
      </View>

    </FlatCard>
  )

  return (
    <>
      {
        cartItems.length > 0
          ?
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Mis reservas:</Text>}
            ListFooterComponent={<FooterComponent />}
          />

          :
          <Text style={styles.cartScreenTitle}>Aún no hay reservas</Text>
      }
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "flex-start",
    gap: 10
  },
  rowTitleImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cartDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.text,
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.text,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.text,
  },
  calendarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.pink,
  },
  calendarButtonText: {
    color: colors.pink,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.text,
  },
  selectedDateText: {
    color: colors.pink,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.pink,
    fontFamily: fonts.text,
  },
  cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8,
    fontFamily: fonts.text,
  }

})