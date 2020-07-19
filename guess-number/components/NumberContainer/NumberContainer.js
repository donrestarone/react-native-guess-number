import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'

export default function NumberContainer(props) {
  return (
    <View style={{...styles.container, ...props.style}}>
      <Text style={styles.number}>{props.children}</Text>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    color: Colors.accent,
    fontSize: 22
  }
})