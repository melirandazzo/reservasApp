import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from 'react-native'
import { colors } from '../global/colors'
import CameraIcon from '../components/CameraIcon'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { usePutProfilePictureMutation } from '../services/profileApi'
import { setImage } from '../store/slices/userSlice'
import { IconComponent } from '../components/AssetsWrapper'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { clearSession } from '../db'
import { clearUser } from '../store/slices/userSlice'
import { clearPersistedState } from '../store'
import { removeItemFromCart } from '../store/slices/cartSlice'
import { fonts } from '../global/fonts'

const ProfileScreen = () => {
    const [location, setLocation] = useState("")
    const [errorMsg, setErrorMsg] = useState("");
    const [address, setAddress] = useState("")
    const [locationLoaded, setLocationLoaded] = useState(false)

    const user = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localId)
    const image = useSelector(state => state.userReducer.image)

    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()

    const dispatch = useDispatch()

    const handleClearSession = async () => {
        try {
            await clearSession(localId)
            dispatch(clearUser())
            await clearPersistedState(dispatch)
        } catch {
            console.log("Hubo un error al limpiar la sesión")
        }

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        })

        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setImage(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })
        }
    }

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Los permisos fueron denegados');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`
                    );
                    const data = await response.json()
                    setLocation(location)
                    setAddress(data.results[0].formatted_address)
                }
            } catch (error) {
                console.log("Error al obtener la ubicación:", error);
            } finally {
                setLocationLoaded(true);
            }
        }

        getCurrentLocation();
    }, []);

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user} </Text>
            <View style={styles.mapContainer}>
                {
                    location
                        ?
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }} title={"Reservas Aqui"} />
                        </MapView>
                        :
                        (
                            locationLoaded
                                ?
                                <Text>Hubo un problema al obtener la ubicación</Text>
                                :
                                <ActivityIndicator />
                        )


                }
                <View style={styles.placeDescriptionContainer}>
                    <View style={styles.addressContainer}>
                        <Text>Dirección:</Text>
                        <Text style={styles.address}>{address || ""}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{address || ""}</Text>
                </View>
            </View>
            <Pressable onPress={handleClearSession} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, { marginTop: 16 }]}>
                <IconComponent iconName="log-out" size={32} style={{ color: colors.pink }} />
            </Pressable>
             <Text style={styles.awareness}>*Aplicación en modo de prueba algunas funcionalidades no estan disponibles y puede presentar errores.</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.white,
        fontSize: 48,
        fontFamily: fonts.text
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: fonts.item
    },
    awareness: {
        paddingVertical: 16,
        fontSize: 10,
        fontFamily: fonts.item
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    mapContainer: {
        width: '100%',
        height: 240,
        overflow: "hidden",
        elevation: 5,
        marginBottom: 16
    },
    map: {
        height: 240,
    },
    mapTitle: {
        fontWeight: '700',
        fontFamily: fonts.itembold
    },
    placeDescriptionContainer: {
        flexDirection: 'row',
        gap: 16
    }
})