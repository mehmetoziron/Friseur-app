import React from "react";
import { ViewStyle } from "react-native";
import { Divider, useTheme } from "react-native-paper";

export interface AppDividerProps {
    style?: ViewStyle;
    thickness?: number
    color?: string;
    marginHorizontal?: number;
    marginVertical?: number;
}

const AppDivider: React.FC<AppDividerProps> = ({
    style,
    thickness = 1,
    color,
    marginHorizontal = 0,
    marginVertical = 20,
}) => {
    const theme = useTheme();
    return (
        <Divider
            style={[
                {
                    backgroundColor: color || theme.colors.surfaceVariant,
                    height: thickness,
                    marginHorizontal: marginHorizontal,
                    marginVertical: marginVertical,
                    width: '100%'
                },
                style
            ]}
        />
    )
}

export default AppDivider;