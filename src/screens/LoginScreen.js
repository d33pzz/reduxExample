//import { withFormik, FormikProps } from "formik";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import {useSelector, useDispatch} from 'react-redux';
import {getLoginDetails} from '../redux/actions';

const LoginScreen = ({navigation}) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have at least 8 charecters'),
  });

  const username = 'thangavel.m@fasoftwares.com';
  const password =
    'NZpcTFr/dCoZdLFu6OWkVN7bReU4flQMut+Nl03OSQ8dEPDZZAm0Ny67BBx3euEuFiYKtkli0AS3f81thjlNabaAiD51fw7v81yEDU9j6917QnYBMQCzYAF0hOQ+C+X84kSSKCqoS4jAeRrSxFS7vvZyF3g8d8zV/l/PsuV0MNE=';
  const dispatch = useDispatch();
  const fetchLoginDetails = () => dispatch(getLoginDetails(username, password));

  useEffect(() => {
    fetchLoginDetails();
  }, []);
  const signInAuth = () => {};

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          console.log('====================================');
          console.log(values.email, values.password);
          console.log('====================================');
          signInAuth();
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? '#0079a6'
                      : 'red',
                },
              ]}>
              <Icon
                //raised
                name="person"
                size={20}
                type="Fontisto"
              />
              <TextInput
                placeholderTextColor="#70787b"
                placeholder="Phone Number, username or email"
                autoCapitalize="none"
                color="#000"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={false}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? '#0079a6'
                      : 'red',
                },
              ]}>
              <Icon
                //raised
                name="security"
                size={20}
                type="MaterialIcons"
              />
              <TextInput
                placeholderTextColor="#70787b"
                placeholder="Password"
                autoCapitalize="none"
                color="#000"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                autoFocus={false}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
              {/* <Text style={{ color: "#216aff" }}>Forgot Password?</Text> */}
            </View>
            <Pressable
              //titleSize={RFPercentage(2.5)}
              style={styles.button(isValid)}
              onPress={() => navigation.push('Home')}
              disabled={!isValid}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  inputfield: {
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88d9ff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0079a6',
  },
  button: isValid => ({
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 15,
    backgroundColor: isValid ? '#70ff8b' : '#20a8d8',
  }),
  buttonText: {
    //fontWeight: "600",
    color: '#fff',
    fontSize: RFPercentage(3),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    marginTop: 50,
  },
  signUpText: {
    color: '#ffc453',
  },
});

export default LoginScreen;
