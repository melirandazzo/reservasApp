import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from '../shop/ShopStackNavigator';
import CartStackNavigator from '../cart/CartStackNavigator';
import { StyleSheet } from 'react-native';
import { colors } from '../../global/colors';
import { IconComponent } from '../../components/AssetsWrapper'
import ProfileStackNavigator from '../profile/ProfileStackNavigator';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<IconComponent iconName="shopping-bag" style={{ color: focused ? colors.mediumGray : colors.purple }} />)
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<IconComponent iconName="shopping-cart" style={{ color: focused ? colors.mediumGray : colors.purple }} />)
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<IconComponent iconName="user" style={{ color: focused ? colors.mediumGray : colors.purple }} />),
                    //tabBarBadge:0,           
                }}
            />
        </Tab.Navigator>
    );
}

export default TabsNavigator

const styles = StyleSheet.create({
    tabBar: {
        //height:500
    }
})