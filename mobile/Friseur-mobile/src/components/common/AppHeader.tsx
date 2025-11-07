import { View, ViewStyle } from "react-native";
import AppAvatar, { AppAvatarProps } from "./AppAvatar";
import AppText from "./AppText";

export interface AppHeaderProps {
    title: string,
    subtitle?: string,
    style?: ViewStyle,
    centered?: boolean,
    avatar?: AppAvatarProps,
}

const AppHeader: React.FC<AppHeaderProps> = ({
    title,
    style,
    subtitle,
    centered = true,
    avatar,
}) => {
    return (<View
        style={[
            { marginBottom: 30 },
            centered && { alignItems: 'center' },
            style,
        ]}
    >
        {avatar && (
            <AppAvatar
                label={avatar.label}
                type={avatar.type}
                size={avatar.size || 80}
                source={avatar.source}
                icon={avatar.icon}
                backgroundColor={avatar.backgroundColor}
                style={avatar.style || {}}
            />
        )}
        <AppText
            variant="headlineMedium"
            weight="bold"
            align={centered ? "center" : "left"}
            style={{ marginBottom: 8 }}
        >
            {title}
        </AppText>
        {subtitle &&
            <AppText
                variant="bodyMedium"
                color="onSurfaceVariant"
                align={centered ? "center" : "left"}

            >
                {subtitle}
            </AppText>
        }
    </View>)
}

export default AppHeader;