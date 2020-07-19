import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header/Header'
import StartGameScreen from './screens/StartGameScreen/StartGameScreen'
import Gamescreen from './screens/GameScreen/GameScreen'

export default function App() {
  let [number, setNumber] = useState('')
  let [startGame, setStartGame] = useState(false)
  let confirmedNumber = useRef(number)

  function resetGame() {
    setStartGame(false)
    confirmedNumber.current = ''
    setNumber('')
  }

  function renderGameContext() {
    if (startGame) {
      confirmedNumber.current = number
      return (
        <Gamescreen
          chosenNumber={confirmedNumber.current}
          onWin={resetGame}
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
