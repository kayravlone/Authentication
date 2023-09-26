// ConfirmEmailScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { useForm, getValues } from 'react-hook-form'; // Import getValues
import { useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const { control, handleSubmit, setValue,watch, getValues } = useForm(); // Use getValues
  const [loading,setLoading] = useState(false);
  const navigation = useNavigation();

  const username = watch('username');

  // ConfirmEmailScreen componentine geldiğinde otomatik olarak username'i doldurmak için useEffect kullanın
  React.useEffect(() => {
    setValue('Username', route?.params?.username);
  }, [route?.params?.username]);

  const onConfirmPressed = async (data) => {
    if(loading){
      return ;
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(data.username,data.code)
      Alert.alert('Başarıyla hesabınız oluşturuldu..')
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Oops..', error.message);
    }
    setLoading(false)
  };

  const onSignInPress = async () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = async() => {
    if(loading){
      return ;
    }
    setLoading(true);
    try {
      await Auth.resendSignUp(username)
      Alert.alert('Başarılı','Yeni kod postanıza gönderildi..')
    } catch (error) {
      Alert.alert('Oops..', error.message);
    }
    setLoading(false)
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput
          name="username" // Ensure that the name matches the field you want to capture
          control={control}
          placeholder="Enter your Username"
          rules={{
            required: 'Username is required',
          }}
        />
        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton text={loading ? "Loading..." : "Confirm"} onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text={loading ? "Loading..." : "Resend code"}
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
