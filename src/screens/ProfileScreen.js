import { Image, Text, View } from 'react-native';
import { IMG } from '../utils';
import { useDispatch } from 'react-redux';
import { userLogout } from '../app/reducers/auth';
import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 3,
      }}
    >
      <Image
        source={{
          uri: IMG.LOGO,
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text>ProfileScreen</Text>

      <CustomButton
        label={'LOGOUT'}
        containerStyle={{
          marginTop: 20,
          width: '80%',
          backgroundColor: '#ff8b8b',
          borderRadius: 10,
        }}
        textStyle={{
          color: '#ffffff',
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 20,
        }}
        onPress={() => dispatch(userLogout())}
      />
    </View>
  );
};

export default ProfileScreen;