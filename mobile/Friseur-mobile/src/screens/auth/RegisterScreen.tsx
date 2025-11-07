import { useTheme } from "react-native-paper";
import { AppButton, AppCard, AppContainer, AppHeader, AppSurface, AppText, AppTextInput } from "../../components/common";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Animated, Dimensions, View } from "react-native";
import { Register } from "../../models/Register";
import { useAuthStore } from "../../stores/authStore";

const { width } = Dimensions.get('window');

const RegisterScreen = () => {
    // Component implementation
    const { loading, register, registerVerified } = useAuthStore()
    const nav = useNavigation();
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [code, setCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);


    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError("");
    }
    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setPasswordError("");
    }
    const handleFullNameChange = (text: string) => {
        setFullName(text);
        setFullNameError("");
    }
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) { return "Bitte geben Sie eine gültige E-Mail-Adresse ein."; }
        return "";
    }
    const validatePasword = (password: string) => {
        if (!password || password.length < 6) { return "Das Passwort muss mindestens 6 Zeichen lang sein."; }
        return "";
    }
    const validateFullName = (fullname: string) => {
        if (!fullname || fullname.length < 1) { return "Der Name muss mindestens 6 Zeichen lang sein."; }
        return "";
    }

    const handleRegister = async () => {
        const emailErr = validateEmail(email);
        const passwordErr = validatePasword(password);
        const fullNameErr = validateFullName(fullName);
        setFullNameError(fullNameErr);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        if (emailErr || passwordErr) {
            return;
        }
        try {
            const data: Register = {
                email,
                password,
                fullName,
                phone,
                role: "customer",
                // andere Felder
            }
            await register(data);
            setCodeSent(true)
        } catch (error: any) {
            Alert.alert("Registrierungsfehler", error?.response?.data?.message || "Bei der Registerierung ist ein Fehler aufgetreten.");
        }
    }

    const handleGoBack = () => {
        if (codeSent) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                setCodeSent(false);
                setCode("")
            });
        } else
            nav.goBack();
    }

    const handleVerifyCode = async () => {
        //Alert.alert("Code wird überprüft....")
        try {
            await registerVerified(email, code);
        } catch (error) {
            Alert.alert("Fehler bei der Codebestätigung"/* , error?.response?.data?.message || "Bei der Codebestätigung ist ein Fehler aufgetreten." */);
        }
    }

    const slideAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (codeSent) {
            Animated.timing(slideAnim, {
                toValue: -width,
                duration: 500,
                useNativeDriver: true
            }).start();
        }

    }, [codeSent, slideAnim])


    return (
        <AppContainer
            scrollable
            backgrounfColor={theme.colors.background}
            style={{ backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={{
                        flex: 1, transform: [{ translateX: slideAnim }]
                    }}>
                    <AppSurface style={{ justifyContent: "center" }}>
                        <AppHeader title="Registrieren" subtitle="Neuen Benutzer erstellen" />
                        <AppCard>
                            <AppTextInput
                                label="Email"
                                value={email}
                                onChangeText={handleEmailChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                authoComplete='email'
                                leftIcon='email'
                                required
                                disabled={loading}
                                error={emailError}
                            />
                            <AppTextInput
                                label="Password"
                                onChangeText={handlePasswordChange}
                                value={password}
                                keyboardType='default'
                                autoCapitalize='none'
                                authoComplete='password'
                                leftIcon='key'
                                rightIcon={!showPassword ? 'eye' : 'eye-off'}
                                secureTextEntry={!showPassword}
                                onRightIconPress={() => setShowPassword(!showPassword)}
                                error={passwordError}
                                required
                                disabled={loading}
                            />
                            <AppTextInput
                                label="Name"
                                value={fullName}
                                onChangeText={handleFullNameChange}
                                keyboardType="default"
                                autoCapitalize="words"
                                required
                                leftIcon="account"
                                disabled={loading}
                                error={fullNameError}
                            />
                            <AppTextInput
                                label="Handy Nummer"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                leftIcon='phone'
                                disabled={loading}
                            />
                            <AppButton
                                title="Registrieren"
                                disabled={loading}
                                loading={loading}
                                onPress={() => handleRegister()}
                            />
                            <AppButton
                                title="Zurück zur Anmeldung"
                                mode="text"
                                variant="secondary"
                                onPress={() => handleGoBack()}
                            />
                        </AppCard>
                    </AppSurface>
                </Animated.View>

                <Animated.View
                    style={{
                        flex: 1,
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "100%",
                        left: width,
                        transform: [{ translateX: slideAnim }]
                    }}
                >
                    <AppSurface style={{ justifyContent: "center" }}>
                        <AppHeader
                            title="Bestätigungscode"
                            subtitle="Geben Sie den Code ein, der an Ihre E-Mail gesendet wurde"
                        />
                        <AppCard>
                            <AppTextInput
                                label="Bestätigungscode"
                                value={code}
                                onChangeText={setCode}
                                maxLength={6}
                                autoCapitalize="none"
                                keyboardType="numeric"
                                disabled={loading}
                                leftIcon="shield-check"
                                placeholder="123456"
                                required
                            />
                            <AppButton
                                disabled={loading || code.length < 6}
                                loading={loading}
                                title="Code bestätigen"
                                onPress={() => handleVerifyCode()}
                            />
                            <AppButton
                                title="Zurück zur Anmeldung"
                                mode="text"
                                variant="secondary"
                                onPress={() => handleGoBack()}
                            />
                        </AppCard>
                    </AppSurface>
                </Animated.View>
            </View>


        </AppContainer>
    );
}

export default RegisterScreen;