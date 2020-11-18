import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconBack = <Icon name={'arrow-back'} size={20} color={'#000'} />;

Header.propTypes = {
  type: PropTypes.string.isRequired,
};

function Header(props) {
  // alert(props.scene.descriptor.options.title);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => CommonActions.goBack()}>
        {IconBack}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    height: 80,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
});

export default Header;
