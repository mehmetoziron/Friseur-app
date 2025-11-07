import React from "react";
import { ViewStyle } from "react-native";
import { Card } from "react-native-paper";

export interface AppCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
    mode?: "contained" | "elevated" | "outlined";
    padding?: "none" | "small" | "medium" | "large";
}

const AppCard: React.FC<AppCardProps> = ({
    children,
    style,
    containerStyle,
    mode = "elevated",
    padding = "none",
}) => {
    const getPaddingStyle = () => {
        switch (padding) {
            case "small":
                return { padding: 12 };
            case "medium":
                return { padding: 20 };
            case "large":
                return { padding: 32 };
            case "none":
                return { padding: 0 };
            default:
                return { padding: 24 };
        }
    }

    return (
        <Card
        style={[{marginBottom: 24, borderRadius: 16},style]} mode={mode}
        >
            <Card.Content style={[getPaddingStyle(), containerStyle]}>
                {children}
            </Card.Content>    
        </Card>

    )
}

export default AppCard;