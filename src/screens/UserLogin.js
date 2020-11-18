import React from 'react';
import {useDispatch} from 'react-redux';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {login} from '../redux/actions/auth';

function UserLogin(props) {
  const dispatch = useDispatch();

  function onLogin() {
    dispatch(login());
  }

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/adaptive-icon.png')}
        />
      </View>
      <TouchableWithoutFeedback onPress={onLogin}>
        <View style={styles.buttonLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onLogin}>
        <View style={styles.buttonRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'stretch',
    minHeight: '100%',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  buttonLogin: {
    alignItems: 'center',
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F03613',
    borderRadius: 50,
  },
  buttonRegister: {
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F03613',
    borderRadius: 50,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 25,
  },
});

export default UserLogin;
