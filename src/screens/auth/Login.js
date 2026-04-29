import { useEffect, useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../app/reducers/auth';

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');

  const { data, isLoading, isError } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && !isLoading) {
      Alert.alert('Login failed', 'Please check your email and password.');
    }
  }, [isError, isLoading]);

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
          label={isLoading ? 'Logging in...' : 'LOGIN'}
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
            if (!emailAdd.trim() || !password) {
              Alert.alert('Missing fields', 'Please enter email and password.');
              return;
            }
            dispatch(userLogin({ email: emailAdd.trim(), password }));
          }}
          disabled={isLoading}
        />

        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 8 }}
          onPress={() => navigation.navigate(ROUTES.REGISTER)}
          activeOpacity={0.7}
        >
          <Text>Not register yet?</Text>
          <Text style={{ marginLeft: 5, color: '#4a92f8', fontWeight: '800' }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;