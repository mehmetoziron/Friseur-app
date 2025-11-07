import React from "react";
import { TextStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

export interface AppTextProps {
    children: React.ReactNode;
    variant?:
    | 'displayLarge' | 'displayMedium' | 'displaySmall'
    | 'headlineLarge' | 'headlineMedium' | 'headlineSmall'
    | 'titleLarge' | 'titleMedium' | 'titleSmall'
    | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
    | 'labelLarge' | 'labelMedium' | 'labelSmall';
    color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'onSurface'
    | 'onSurfaceVariant'
    | 'onBackground'
    | 'tertiary'
    | 'success'
    | 'warning';
    align?: 'left' | 'center' | 'right' | 'justify';
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    style?: TextStyle;
    numberOfLines?: number;
    selectable?: boolean;
    onPress?: () => void;
}

const AppText: React.FC<AppTextProps> = ({
    children,
    variant = 'bodyMedium',
    color = "onSurface",
    align = 'left',
    weight = 'normal',
    style,
    numberOfLines,
    selectable = false,
    onPress,
}) => {
    const theme = useTheme();
    const getTextStyle = () => {
        switch (color) {
            case 'primary':
                return theme.colors.primary;
            case 'secondary':
                return theme.colors.secondary;
            case 'error':
                return theme.colors.error;
            case 'onSurfaceVariant':
                return theme.colors.onSurfaceVariant;
            case 'onBackground':
                return theme.colors.onBackground;
            case 'onSurface':
                return theme.colors.onSurface;
            default:
                return theme.colors.onSurface;
        }
    }
    return (
        <Text
            variant={variant}
            style={[{
                color: getTextStyle(),
                textAlign: align,
                fontWeight: weight
            },
                style
            ]}
            numberOfLines={numberOfLines}
            selectable={selectable}
            onPress={onPress}
        >
            {children}
        </Text>
    )
}
export default AppText;