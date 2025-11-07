import { ScrollView, View, ViewStyle } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


export interface AppContainerProps {
    children: React.ReactNode;
    scrollable?: boolean;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
    padding?: "none" | "small" | "medium" | "large";
    backgrounfColor?: string;
    centered?: boolean;
    keyboadrdShouldPersistTaps?: "always" | "never" | "handled";
}

const AppContainer: React.FC<AppContainerProps> = ({
    children,
    scrollable = false,
    style = {},
    contentStyle = {},
    padding = "medium",
    backgrounfColor = "transparent",
    centered = false,
    keyboadrdShouldPersistTaps = "handled"
}) => {
    const getPaddingStyle = () => {
        switch (padding) {
            case "none":
                return {};
            case "small":
                return { padding: 8 };
            case "medium":
                return { padding: 16 };
            case "large":
                return { padding: 24 };
            default:
                return {};
        }
    }
    const containerStyle = [
        {
            flex: 1,
            backgrounfColor
        },
        style
    ]

    const innerContentStyle = [
        getPaddingStyle(),
        contentStyle,
    ]

    if (scrollable) {
        return (
            <ScrollView
                style={containerStyle}
                contentContainerStyle={[
                    centered ? {
                        minHeight: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } :
                        { flexGrow: 1 },
                    innerContentStyle
                ]}
                keyboardShouldPersistTaps={keyboadrdShouldPersistTaps}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        );
    }
    return (
        <View
            style={[containerStyle
                , centered && {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                innerContentStyle
            ]}
        >
            {children}
        </View>
    )
}

export default AppContainer;