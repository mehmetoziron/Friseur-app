import { Alert, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useAuthStore } from '../../stores/authStore';
import { AppButton, AppCard, AppContainer, AppDivider, AppFooter, AppHeader, AppSurface, AppText, AppTextInput } from '../../components/common';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

const LoginScreen = () => {
    const nav = useNavigation<NavigationProp<RootStackParamList>> ();
    const theme = useTheme();
    const { login, loading } = useAuthStore();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const loginButton = async () => {
        const resp = await login('deneme1@gmail.com', '1')
        console.log(resp);
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) { return "Bitte geben Sie eine gültige E-Mail-Adresse ein."; }
        return "";
    }

    const validatePasword = (password: string) => {
        if (!password || password.length < 1) { return "Das Passwort muss mindestens 1 Zeichen lang sein."; }
        return "";
    }

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (emailError) { setEmailError(""); }
    }
    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (passwordError) { setPasswordError(""); }
    }

    const handleLogin = async () => {
        const emailErr = validateEmail(email);
        const passwordErr = validatePasword(password);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        if (emailErr || passwordErr) {
            return;
        }
        try {
            await login(email, password);
        } catch (error: any) {
            Alert.alert("Anmeldefehler", error?.response?.data?.message || "Beim Anmelden ist ein Fehler aufgetreten.");
        }
    }
    return (
        <AppContainer scrollable backgrounfColor={theme.colors.background} style={{ backgroundColor: theme.colors.background }} >
            <AppSurface
                backgroundColor={theme.colors.surface}
                style={{ justifyContent: 'center' }}
            >
                <AppHeader
                    title="Willkommen"
                    subtitle='Bitte melden Sie sich an'
                    avatar={
                        {
                            type: "icon",
                            icon: "scissors-cutting",
                            backgroundColor: theme.colors.primary,
                        }
                    }
                />
                <AppCard

                >
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
                    <AppButton
                        title={loading ? "Anmelden..." : "Anmelden"}
                        onPress={handleLogin}
                        fullWidth
                        loading={loading}
                        disabled={loading}
                        size='medium'
                        style={{ marginTop: 8 }}
                    />
                    <AppDivider />
                    <AppButton
                        onPress={() => Alert.alert("soon")}
                        title='Passwort vergessen'
                        mode='text'
                        size='small'
                    />
                    <AppText
                        variant='bodyMedium'
                        color='onSurfaceVariant'
                        align='center'
                        style={{ marginTop: 16 }}
                    >Noch keinen Account?
                        <AppText
                            variant='bodyMedium'
                            color='primary'
                            onPress={() => nav.navigate("Register")}
                        > registrieren
                        </AppText>
                    </AppText>
                </AppCard>
                <AppFooter>
                    <AppText
                        variant='bodySmall'
                        color='onSurfaceVariant'
                        align='center'//kullanim kosullarini ögren (auf deutsch)
                    >Nutzungsbedingungen und Datenschutzbestimmungen
                        <AppText
                            variant='bodySmall'
                            color='primary'
                        > lesen
                        </AppText>
                    </AppText>
                </AppFooter>
            </AppSurface>
        </AppContainer>
    );

}

export default LoginScreen;