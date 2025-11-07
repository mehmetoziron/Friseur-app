import { TextStyle, ViewStyle } from "react-native";
import { Button, useTheme } from "react-native-paper";


export interface AppButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    loading?: boolean;
    mode?: "contained" | "outlined" | "text" | "contained-tonal" | "elevated";
    icon?: string;
    contentStyle?: ViewStyle;
    labelStyle?: TextStyle;
    variant?: "primary" | "secondary" | "error" | "success" | "warning";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
    title,
    onPress,
    disabled = false,
    style,
    loading = false,
    mode = "contained",
    icon,
    contentStyle,
    labelStyle,
    variant = "primary",
    size = "medium",
    fullWidth = false,
}) => {
    const theme = useTheme();
    const getButtonColor = () => {
        switch (variant) {
            case "secondary":
                return theme.colors.secondary;
            case "error":
                return theme.colors.error;
            case "success":
                return "#4caf50"; // Bootstrap success green
            case "warning":
                return "#ff8900"; // Bootstrap warning yellow
            default:
                return theme.colors.primary;
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    contentStyle: { padding: 8, fontSize: 14 },
                    labelStyle: { fontSize: 14 }
                };
            case "large":
                return {
                    contentStyle: { padding: 16, fontSize: 18 },
                    labelStyle: { fontSize: 18 }
                };
            default:
                return {
                    contentStyle: { padding: 12, fontSize: 16 },
                    labelStyle: { fontSize: 16 }
                };
        }
    }
    const sizeStyles = getSizeStyles();

    return (
        <Button
            mode={mode}
            onPress={onPress}
            disabled={disabled || loading}
            buttonColor={mode === "contained" ? getButtonColor() : undefined}
            loading={loading}
            icon={icon}
            textColor={mode === "text" || mode === "outlined" ? getButtonColor() : undefined}
            style={[
                style,
                {borderRadius: 4, marginVertical: 4},
                fullWidth && { width: '100%' },
            ]}
            contentStyle ={[{paddingVertical:8}, sizeStyles.contentStyle, contentStyle]}
            labelStyle = {[{fontSize:16, fontWeight: "600"}, sizeStyles.labelStyle, labelStyle]}
        >   
            {title}
        </Button>
    );
}

export default AppButton;