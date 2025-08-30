import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth/AuthStackNavigator";
import TabsNavigator from "./tabs/TabsNavigator";
import { useSelector } from "react-redux";

const MainNavigator = () => {
    const email = useSelector(state => state.userReducer.email)
    console.log("Email:", email)
    return (
        <NavigationContainer>
            {
                email ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator