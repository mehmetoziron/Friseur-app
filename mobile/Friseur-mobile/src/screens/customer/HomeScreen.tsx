import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useAuthStore } from '../../stores/authStore';
import { AppButton } from '../../components/common';

const HomeScreen = () => {
    const theme = useTheme();
    const {refreshToken,logout,user,setUser}= useAuthStore();
    return (
        <View style={{backgroundColor:theme.colors.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{user?.email}</Text>
            <AppButton
            onPress={()=>logout()}
            title="Abmelden"
            />
        </View>
    );

}

export default HomeScreen;