import React, { useState, useRef, useEffect } from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import NumberContainer from '../../components/NumberContainer/NumberContainer'
import Card from '../../components/Card/Card'

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min)
  max = Math.floor(max)
  let randomNum = Math.floor(Math.random() * (max - min)) + min
  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return randomNum
  }
}

export default function Gamescreen(props) {
  let chosenNumber = parseInt(props.chosenNumber)
  let [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, chosenNumber)
  )

  let [numberOfGuesses, setNumberOfGuesses] = useState(0)

  useEffect(() => {
    if (currentGuess === chosenNumber) {
      console.log('game over')
      Alert.alert(
        "Game Over!",
        `I guessed your number in ${numberOfGuesses} tries`,
        [{text: 'New Game', style: 'default', onPress: props.onWin}]
      )
      return
    }
  }, [currentGuess])

  let currentMaximumNumber = useRef(100)
  let currentMinimumNumber = useRef(1)

  function nextGuessHandler(direction) {
    if((direction === 'lower' && chosenNumber > currentGuess) || (direction === 'higher' && chosenNumber < currentGuess)) {
      Alert.alert(
        "Don't lie!",
        "You know this hint is wrong...",
        [{text: 'Sorry!', style: 'cancel'}]
      )
      return
    }

    if (direction === 'lower') {
      currentMaximumNumber.current = currentGuess
    } else {
      currentMinimumNumber.current = currentGuess
    }
    let nextGuess = generateRandomBetween(currentMinimumNumber.current, currentMaximumNumber.current, currentGuess)
    setCurrentGuess(nextGuess)
    setNumberOfGuesses(previousGuessCount => previousGuessCount + 1)
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => {nextGuessHandler('lower')}}/>
        <Button title="Higher" onPress={() => {nextGuessHandler('higher')}}/>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})