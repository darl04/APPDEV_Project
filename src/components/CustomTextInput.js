import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CustomTextInput = ({
  placeholder,
  placeholderTextColor,
  label,
  labelStyle,
  value,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? '#999'}
        onChangeText={value}
        style={[
          {
            color: '#000',
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: 8,
          },
          textStyle,
        ]}
      />
    </View>
  );
};

export default CustomTextInput;