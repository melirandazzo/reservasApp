import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "../../screens";
import Header from "../../components/Header";

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Reservas"
            screenOptions={{
                header: ({route})=>(<Header subtitle={route.name}/>)
            }}
        >
            <Stack.Screen name="Reservas" component={CartScreen} />
        </Stack.Navigator>
    )
}

export default CartStackNavigator