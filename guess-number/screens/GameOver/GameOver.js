import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import Card from '../../components/Card/Card'
import NumberContainer from '../../components/NumberContainer/NumberContainer'

export default function GameOver(props) {
  return (
    <View style={styles.wrapper}>
      <Card style={styles.content}>
        <Text>Game Over!</Text>
        <Text>I guessed your number in: {props.rounds} rounds</Text>
        <Text>The Number was</Text>
        <NumberContainer>{props.number}</NumberContainer>
        <Button title="NEW GAME" onPress={props.restart}/>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10
  },
  content: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  }
})