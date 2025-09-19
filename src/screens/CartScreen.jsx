import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/colors'
import FlatCard from '../components/FlatCard'
import { IconComponent } from '../components/AssetsWrapper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart, updateItemDate } from '../store/slices/cartSlice'
import { ImageComponent } from '../components/AssetsWrapper'
import { fonts } from '../global/fonts'
import { useGetReservationsByProductQuery } from '../services/shopApi'

const CartScreen = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const total = useSelector(state => state.cartReducer.total)
  const dispatch = useDispatch()
  const [showPickerId, setShowPickerId] = useState(null)
  const handleCalendarPress = (id) => {
    setShowPickerId(id)
  }

  const handleDateChange = (id, event, date) => {
    setShowPickerId(null)
    if (date) {
      dispatch(updateItemDate({ id, selectedDate: date.toISOString() }))
    }
  }

  const handleDateSelectFromCalendar = (id, dateString) => {
    const iso = new Date(dateString + 'T00:00:00.000Z').toISOString()
    dispatch(updateItemDate({ id, selectedDate: iso }))
    setShowPickerId(null)
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
    <CartItem item={item} />
  )

  const CartItem = ({ item }) => {
    const { data: reservations } = useGetReservationsByProductQuery(item.id)
    return (
      <FlatCard style={styles.cartContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.titleLeft} numberOfLines={2}>{item.title}</Text>
          <ImageComponent imageName={item.image} style={styles.itemImage} />
        </View>
        <View style={styles.cartContent}>
          <Text style={styles.description} numberOfLines={2}>{item.shortDescription}</Text>
          <View style={styles.row}>
            <Text style={styles.total}>${item.quantity * item.price}</Text>
            {item.selectedDate && (
              <Text style={styles.selectedDateInline}>
                {new Date(item.selectedDate).toLocaleDateString()}
              </Text>
            )}
          </View>
          <View style={styles.rowActions}>
            <Pressable style={styles.calendarButtonSmall} onPress={() => handleCalendarPress(item.id)}>
              <IconComponent iconName="calendar" size={18} style={{ color: colors.pink, marginRight: 6 }} />
              <Text style={styles.calendarButtonTextSmall}>
                {item.selectedDate ? 'Cambiar fecha' : 'Seleccionar fecha'}
              </Text>
            </Pressable>
          </View>

          {/* Date picker modal (same as before) */}
          {showPickerId === item.id && (
            <Modal transparent={true} animationType="slide" visible={true} onRequestClose={() => setShowPickerId(null)}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <View style={{ backgroundColor: 'white', width: '90%', borderRadius: 8, padding: 12 }}>
                  <Calendar
                    markedDates={(() => {
                      const marks = {}
                      cartItems.forEach(ci => {
                        if (ci.id === item.id && ci.selectedDate) {
                          const d = new Date(ci.selectedDate).toISOString().slice(0, 10)
                          marks[d] = { disabled: true, disableTouchEvent: true, marked: true, dotColor: 'red' }
                        }
                      })
                      if (reservations && Array.isArray(reservations)) {
                        reservations.forEach(r => {
                          const dateStr = r.date ? (r.date.length > 10 ? new Date(r.date).toISOString().slice(0, 10) : r.date) : null
                          if (dateStr) {
                            marks[dateStr] = { disabled: true, disableTouchEvent: true, marked: true, dotColor: 'red' }
                          }
                        })
                      }
                      if (item.selectedDate) {
                        const selected = new Date(item.selectedDate).toISOString().slice(0, 10)
                        marks[selected] = { ...(marks[selected] || {}), selected: true, selectedColor: '#ffb6c1' }
                      }
                      return marks
                    })()}
                    onDayPress={(day) => {
                      const chosen = day.dateString
                      const alreadyReservedLocally = cartItems.some(ci => ci.id === item.id && ci.selectedDate && new Date(ci.selectedDate).toISOString().slice(0, 10) === chosen)
                      const alreadyReservedGlobally = reservations && reservations.some(r => {
                        const dateStr = r.date ? (r.date.length > 10 ? new Date(r.date).toISOString().slice(0, 10) : r.date) : null
                        return dateStr === chosen
                      })
                      if (alreadyReservedLocally || alreadyReservedGlobally) return
                      handleDateSelectFromCalendar(item.id, chosen)
                    }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
                    <Pressable onPress={() => setShowPickerId(null)} style={{ padding: 8 }}>
                      <Text style={{ color: colors.pink, fontWeight: '700' }}>Cerrar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
        <View style={styles.actionsColumn}>
          <Pressable onPress={() => handleDeleteItem(item.id)} style={styles.deletePressable}>
            <IconComponent iconName="trash" size={22} style={{ color: colors.pink }} />
          </Pressable>
        </View>
      </FlatCard>
    )
  }

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
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f9f9f9'
  },
  rowTitleImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cartContent: {
    flex: 1,
    paddingVertical: 4,
    paddingRight: 8,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 6,
    marginRight: 12,
  },
  leftColumn: {
    width: 120,
    alignItems: 'flex-start',
    marginRight: 8,
  },
  titleLeft: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.text,
    marginBottom: 6,
    textAlign: 'left'
  },
  actionsColumn: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6,
  },
  total: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: fonts.text,
    color: colors.pink,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowActions: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  calendarButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.pink,
  },
  calendarButtonTextSmall: {
    color: colors.pink,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.text,
  },
  selectedDateInline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.pink,
    color: colors.pink,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 13,
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