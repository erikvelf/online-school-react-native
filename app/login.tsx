import { StatusBar } from 'expo-status-bar';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Input } from '../shared/Input/input';
import { Colors, Gaps, Padding } from '../shared/tokens'
import { Button } from '../shared/Button/button';
import { ErrorNotification } from '../shared/ErrorNotification/errorNotification';
import { useState } from 'react';
import CustomLink from '../shared/customLink/customLink';

export default function Login() {
  const [error, setError] = useState<string | undefined>(undefined)


  const alert = () => {
    setError('Wrong login or password')
    // Alert.alert('Wrong login or password')
  }

  return (
    <View style={styles.container}>
      <ErrorNotification error={error} />
      <View style={styles.content}>
        <Image
          style={{width: 200}}
          source={require('../assets/app/logo.png')}
          resizeMode='contain'
        />
        <View style={styles.form}>
          <Input
            placeholder='email'
            keyboardType='email-address'
          />
          <Input
            isPassword
            placeholder='password'
          />         

          <Button
            text='Login'
            onPress={alert}
          />

          <CustomLink
            href={'/course/ts'}
            title={'Restore Password'}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    fontFamily: 'Fira-Sans-Semibold',
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    padding: Padding.p48
  },
  form: {
    alignSelf: "stretch",
    gap: 16

  },

});
