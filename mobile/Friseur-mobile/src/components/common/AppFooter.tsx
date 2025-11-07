import React from "react";
import { View, ViewStyle } from "react-native";
import AppText from "./AppText";

export interface AppFooterProps {
    children: React.ReactNode;
    style?: ViewStyle;
    text?: string;
    centered?: boolean;
}

const AppFooter: React.FC<AppFooterProps> = ({
    children,
    style,
    text,
    centered = true,
}) => {
    return (
        <View
            style={[
                { marginTop: 22, paddingHorizontal: 20 }, style,
            ]}
        >
            {children ||
                text &&
                <AppText
                variant="bodySmall"
                color="onSurfaceVariant"
                align={centered ? "center" : "left"}
                style={{lineHeight:18}}
                >{text}</AppText>
            }
        </View >
    )
}
export default AppFooter;