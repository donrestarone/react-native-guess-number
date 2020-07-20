import React, {useState, useRef} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header/Header'
import StartGameScreen from './screens/StartGameScreen/StartGameScreen'
import Gamescreen from './screens/GameScreen/GameScreen'
import GameOver from './screens/GameOver/GameOver'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

function fetchFonts() {
  return Font.loadAsync({
    'rowdies-bold': require('./assets/Fonts/Rowdies-Bold.ttf'),
    'rowdies-light': require('./assets/Fonts/Rowdies-Light.ttf'),
    'rowdies-regular': require('./assets/Fonts/Rowdies-Regular.ttf')
  })
}

export default function App() {
  let [appLoaded, setAppLoaded] = useState(false)
  let [number, setNumber] = useState('')
  let [startGame, setStartGame] = useState(false)
  let [numberOfGuesses, setNumberOfGuesses] = useState(0)
  let [gameOver, setGameOver] = useState(false)
  let confirmedNumber = useRef(number)

  if (!appLoaded) {
    return (
      <AppLoading
        // pass a function that returns a promise to startAsync
        startAsync={fetchFonts}
        onFinish={() => {setAppLoaded(true)}}
        onError={(e) => {console.log(e)}}
      />
    )
  }

  function resetGame() {
    setStartGame(false)
    confirmedNumber.current = ''
    setNumber('')
    setNumberOfGuesses(0)
    setGameOver(false)
  }

  function renderGameContext() {
    if (startGame && !gameOver) {
      confirmedNumber.current = number
      return (
        <Gamescreen
          chosenNumber={confirmedNumber.current}
          onGuess={() => {setNumberOfGuesses(prevNumber => prevNumber + 1)}}
          onWin={() => {setGameOver(true)}}
        />
      )
    } else if (gameOver) {
      return (
        <GameOver
          rounds={numberOfGuesses}
          number={confirmedNumber.current}
          restart={resetGame}
        />
      )
    } else {
      return (
        <StartGameScreen 
          enteredNum={number} 
          onNumberEnter={(n) => {setNumber(n)} } 
          onStart={setStartGame}
        />
      )
    }
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>      
      {renderGameContext()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
