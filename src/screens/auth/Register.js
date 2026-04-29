import { useEffect, useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { resetRegister, userRegister } from '../../app/reducers/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { registerIsLoading, registerIsError, registerIsSuccess, registerErrorMessage } = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (registerIsSuccess && !registerIsLoading) {
      Alert.alert('Registered', 'Account created. Please login.');
      dispatch(resetRegister());
      navigation.navigate(ROUTES.LOGIN);
    }
  }, [dispatch, navigation, registerIsLoading, registerIsSuccess]);

  useEffect(() => {
    if (registerIsError && !registerIsLoading) {
      Alert.alert('Register failed', registerErrorMessage || 'Please try again.');
      dispatch(resetRegister());
    }
  }, [dispatch, registerErrorMessage, registerIsError, registerIsLoading]);

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <View style={cardStyle}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <CustomTextInput
            label={'Name'}
            value={val => setName(val)}
            containerStyle={{
              width: '100%',
              marginBottom: 15,
            }}
            labelStyle={{
              fontSize: 20,
              fontWeight: '500',
            }}
            textStyle={{
              fontSize: 20,
              color: '#000',
            }}
          />

          <CustomTextInput
            label={'Email Address'}
            value={val => setEmailAdd(val)}
            containerStyle={{
              width: '100%',
              marginBottom: 15,
            }}
            labelStyle={{
              fontSize: 20,
              fontWeight: '500',
            }}
            textStyle={{
              fontSize: 20,
              color: '#000',
            }}
          />

          <CustomTextInput
            label={'Password'}
            value={val => setPassword(val)}
            containerStyle={{
              width: '100%',
              marginBottom: 15,
            }}
            labelStyle={{
              fontSize: 20,
              fontWeight: '500',
            }}
            textStyle={{
              fontSize: 20,
              color: '#000',
            }}
          />

          <CustomTextInput
            label={'Confirm Password'}
            value={val => setConfirmPassword(val)}
            containerStyle={{
              width: '100%',
            }}
            labelStyle={{
              fontSize: 20,
              fontWeight: '500',
            }}
            textStyle={{
              fontSize: 20,
              color: '#000',
            }}
          />
        </View>

        <CustomButton
          label={registerIsLoading ? 'Creating account...' : 'REGISTER'}
          containerStyle={{
            marginVertical: 20,
            width: '100%',
            backgroundColor: '#9bc5ff',
            borderRadius: 10,
          }}
          textStyle={{
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 20,
          }}
          onPress={() => {
            if (!name || !emailAdd || !password || !confirmPassword) {
              Alert.alert('Missing fields', 'Please fill in all fields.');
              return;
            }
            if (password !== confirmPassword) {
              Alert.alert('Password mismatch', 'Passwords do not match.');
              return;
            }
            dispatch(
              userRegister({
                name: name.trim(),
                email: emailAdd.trim(),
                password,
                confirmPassword,
              }),
            );
          }}
          disabled={registerIsLoading}
        />

        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 8 }}
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
          activeOpacity={0.7}
        >
          <Text>Already have an account?</Text>
          <Text style={{ marginLeft: 5, color: '#4a92f8', fontWeight: '800' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
