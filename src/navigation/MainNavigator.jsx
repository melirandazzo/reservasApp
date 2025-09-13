import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth/AuthStackNavigator";
import TabsNavigator from "./tabs/TabsNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/profileApi";
import { setImage } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { initSessionTable, getSession } from "../db"
import { setUserEmail, setLocalId } from "../store/slices/userSlice";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../global/colors";

const MainNavigator = () => {
    const email = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localId)
    const [checkingSession, setCheckingSession] = useState(true);

    const dispatch = useDispatch()

    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId)

    useEffect(() => {
        const init = async () => {
            await initSessionTable();
            const session = await getSession(); 
            if (session) {
                dispatch(setUserEmail(session.email))
                dispatch(setLocalId(session.localId))
            }
            setCheckingSession(false);
        };

        init();
    }, []);

    useEffect(() => {
        if (profilePicture) {
            dispatch(setImage(profilePicture.image))
        }
    }, [profilePicture])

    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.cobaltBlue} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {
                email ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator