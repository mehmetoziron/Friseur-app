import { TouchableOpacity, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

export interface AppAvatarProps {
    type: "icon" | "image" | "text",
    icon?: string,
    source?: string,
    label?: string,
    size?: number,
    style?: ViewStyle,
    backgroundColor?: string,
    onPress?: () => void,
}

const AppAvatar: React.FC<AppAvatarProps> = ({
    type,
    icon,
    source,
    label,
    size = 40,
    style,
    backgroundColor,
    onPress,
}) => {
    const avatarStyle = [
        { marginBottom: 16 },
        style,
        backgroundColor && { backgroundColor }
    ]
    const renderAvatar = () => {
        switch (type) {
            case "icon":
                return onPress ?
                    <TouchableOpacity onPress={onPress}>
                        <Avatar.Icon
                            size={size}
                            icon={icon || "account"}
                            style={avatarStyle} />
                    </TouchableOpacity> :
                    <Avatar.Icon
                        size={size}
                        icon={icon || "account"}
                        style={avatarStyle} />
            case "image":
                return onPress ?
                    <TouchableOpacity onPress={onPress}>
                        <Avatar.Image
                            size={size}
                            source={{ uri: source }}
                            style={avatarStyle} />
                    </TouchableOpacity> :
                    <Avatar.Image
                        size={size}
                        source={{ uri: source }}
                        style={avatarStyle} />
            case "text":
                return onPress ?
                    <TouchableOpacity onPress={onPress}>
                        <Avatar.Text
                            size={size}
                            label={label || "U"}
                            style={avatarStyle} />
                    </TouchableOpacity> :
                    <Avatar.Text
                        label={label || "U"}
                        size={size}
                        style={avatarStyle} />
            default:
                return null;

        }
    }
    return renderAvatar();
}
export default AppAvatar;