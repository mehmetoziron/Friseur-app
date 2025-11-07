import { ViewStyle } from "react-native";
import { Surface } from "react-native-paper";

export interface AppSurfaceProps {
    children: React.ReactNode;
    elevation?: number;
    style?: ViewStyle;
    backgroundColor?: string;
    padding?: "none" | "small" | "medium" | "large";
}

const AppSurface: React.FC<AppSurfaceProps> = ({
    children,
    elevation = 0,
    style = {},
    backgroundColor = "transparent",
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
            default:
                return { padding: 0 };
        }
    }
    return (
        <Surface
            elevation={elevation as any}
            style={[
                { backgroundColor: backgroundColor, flex: 1 },
                getPaddingStyle(),
                style
            ]}

        >
            {children}
        </Surface>
        )
}
export default AppSurface;
