import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  Animated,
  Easing,
  useColorScheme,
  Linking,
} from 'react-native';

const isNative = Platform.OS !== 'web';

const App = () => {
  const [wasRotated, setwasRotated] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const isDarkMode = useColorScheme() === 'dark';

  //'http://localhost:3000/logo.png'

  console.log(Platform.OS);

  const onPress = () => {
    setwasRotated(!wasRotated);
    Animated.timing(spinValue, {
      toValue: wasRotated ? 0 : 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.scrollView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Animated.Image
            source={
              isNative
                ? require('./logo.png')
                : 'http://localhost:3000/logo.png'
            }
            style={[styles.logo, {transform: [{rotate: spin}]}]}
          />

          <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>
              Clique para o John <Text style={styles.smallText}>dar ou</Text>
              Travolta
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  smallText: {
    fontSize: 9,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
  },
  link: {
    color: '#1B95E0',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
