import { View, ViewStyle } from "react-native";
import { TextInput, useTheme } from "react-native-paper";


export interface AppTextInputProps {
    value:string;
    label?:string;
    onChangeText: (text:string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    error?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    authoComplete?:string
    leftIcon?: string;
    rightIcon?: string;
    onRightIconPress?: () => void;
    disabled?: boolean;
    style?:ViewStyle;
    maxLength?:number;
    multiline?:boolean;
    numberOfLines?:number;
    required?:boolean;
    mode?:  "outlined"|"flat" ;

}

const AppTextInput: React.FC<AppTextInputProps> = ({
    value,
    label,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    error,
    keyboardType = "default",
    autoCapitalize = "sentences",
    authoComplete,
    leftIcon,
    rightIcon,
    onRightIconPress,
    disabled = false,
    style,
    maxLength,
    multiline = false,
    numberOfLines = 1,
    required = false,
    mode = "outlined"

}) => {
const theme = useTheme();
const displayLabel = required && label ? `${label} *` : label;

    return (
        <TextInput
            value={value}
            label={displayLabel}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            error={!!error}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize} 
            left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
            right={rightIcon ? <TextInput.Icon icon={rightIcon} onPress={onRightIconPress} /> : undefined}
            disabled={disabled}
            style={[style,{ marginBottom: 16, height: multiline ? "auto" : 48 }]}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
            mode={mode}
            outlineStyle={error ? {borderColor:theme.colors.error} : undefined}
        />
    );
}
export default AppTextInput;