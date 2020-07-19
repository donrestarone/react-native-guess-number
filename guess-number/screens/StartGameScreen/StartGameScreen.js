import React, {useState} from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import Card from '../../components/Card/Card'
import Colors from '../../constants/Colors'
import Input from '../../components/Input/Input'

export default function StartGameScreen(props) {
  let [enteredNum, setEnteredNum] = useState('')
  let regexForWholeNumbers = /[^0-9]/g
  function numberInputHandler(inputText) {
    // replaces any non whole number with an empty string ''
    setEnteredNum(inputText.replace(regexForWholeNumbers, ''))
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <Input 
          value={enteredNum}
          keyboardType="number-pad" 
          placeholder="Guess"
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={2}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Reset" color={Colors.accent} onPress={() => {}}/>
          </View>
          <View style={styles.button}>
            <Button title="Confirm" color={Colors.primary} onPress={() => {}}/>
          </View>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    // equivalent to margin-top
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  }
})