import React, { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";



const AuthProvider : React.FC<{children: React.ReactNode}> = ({ children }) => {
    
    const [loading, setLoading] = useState(true);
    const {setUser} = useAuthStore();

    useEffect(() => {
        const loadUser = async () => {
            //await AsyncStorage.setItem("user", JSON.stringify(null))
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        }
        loadUser();
    }, [])
    
    // check token expiration and refresh if needed


    if (loading) {
        return null; 
    }
    
    return <>{children}</>;
};

export default AuthProvider;