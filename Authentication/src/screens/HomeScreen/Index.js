import { Auth } from 'aws-amplify';
import React from 'react';
import { View, Text } from 'react-native';

const Index = () => {
  const signOut = () => {
    Auth.signOut();
  }
  return (
    <View>
      <Text style={{ fontSize: 24, alignSelf: 'center' }}>Home, sweet home</Text>
      <Text
        onPress={signOut}
        style={{
          width: '100%',
          textAlign:'center',
          color:'red',
          marginTop:'auto',
          marginVertical:20,
          fontSize:20
        }}
      >Sign Out</Text>
    </View>
  );
};

export default Index;
