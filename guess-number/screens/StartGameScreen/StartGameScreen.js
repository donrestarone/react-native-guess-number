import React, {useState} from 'react'
import {
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
  Image
} from 'react-native'
import Card from '../../components/Card/Card'
import Colors from '../../constants/Colors'
import Input from '../../components/Input/Input'
import NumberContainer from '../../components/NumberContainer/NumberContainer'
import MainButton from '../../components/MainButton/MainButton'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function StartGameScreen(props) {
  let [confirmed, setConfirmed] = useState(false)
  let [selectedNumber, setSelectedNumber] = useState()

  let regexForWholeNumbers = /[^0-9]/g

  function numberInputHandler(inputText) {
    // replaces any non whole number with an empty string ''
    props.onNumberEnter(inputText.replace(regexForWholeNumbers, ''))
  }

  function resetHandler() {
    props.onNumberEnter('')
    setConfirmed(false)
  }

  function confirmHandler() {
    let chosenNumber = parseInt(props.enteredNum)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number!', 
        'Number has to be a number between 1 - 99',
        [{text: 'Okay', style: 'destructive', onPress: resetHandler}]
      )
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    Keyboard.dismiss()
  }

  let confirmedOutput

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmation}>
        <Text>You selected</Text>
        <NumberContainer>
          {selectedNumber}
        </NumberContainer>
        <MainButton
          onPress={props.onStart}
        >
          <MaterialCommunityIcons 
            name="google-controller"
            size={25}
          />
        </MainButton>
      </Card>
    )
  }

  return (
    // this is how we remove the keyboard when the user touches anywhere else on the screen
    <TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss()} }>
      <View style={styles.screen}>
        <Image 
          source={require('../../assets/Images/lenny-logo.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.subTitle}>Select a Number</Text>
          <Input 
            value={props.enteredNum}
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
              <Button title="Reset" color={Colors.accent} onPress={resetHandler}/>
            </View>
            <View style={styles.button}>
              <Button title="Confirm" color={Colors.primary} onPress={confirmHandler}/>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    // equivalent to margin-top
    marginVertical: 10,
    fontFamily: 'rowdies-bold'
  },
  subTitle: {
    fontFamily: 'rowdies-regular'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginVertical: 10
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
  },
  confirmation: {
    padding: 20,
    alignItems: 'center'
  },
  image: {
    width: 75,
    height: 75
  }
})