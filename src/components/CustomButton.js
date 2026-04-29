import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CustomButton = ({
  containerStyle,
  label,
  textStyle,
  onPress,
  loading,
  disabled,
}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <>
      {loading ? (
        <View className="h-20 p-4">
          <ActivityIndicator size={'large'} color={'blue'} />
        </View>
      ) : (
        <View style={[containerStyle, disabled ? { opacity: 0.6 } : null]}>
          <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
            <View style={{ padding: width * 0.014 }}>
              <Text style={textStyle}>{label}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CustomButton;
