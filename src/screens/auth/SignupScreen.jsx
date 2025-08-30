import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useSignupMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../store/slices/userSlice';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [triggerSignup, result] = useSignupMutation()

    const dispatch = useDispatch()

    const onsubmit = () => {
        if (password !== confirmPassword) {
            console.log("Las contraseñas no coinciden")
            return
        }
        triggerSignup({ email, password })
    }

    useEffect(() => {
        console.log("Resultado del signup", result)
        if (result.status === "fulfilled") {
            dispatch(setUserEmail(result.data.email))
        }
    }, [result])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reserva espacios</Text>
            <Text style={styles.subTitle}>Crear cuenta</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.lightGray}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.lightGray}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor={colors.lightGray}
                    placeholder='Confirmar Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Inicia sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.pink
    },
    title: {
        color: colors.white,
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.white,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.white,
        width: textInputWidth,
        color: colors.black,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.white
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.black,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700'
    },
    error: {
        padding: 16,
        backgroundColor: colors.red,
        borderRadius: 8,
        color: colors.white
    }
})