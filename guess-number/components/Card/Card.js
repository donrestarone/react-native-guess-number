import React from 'react'
import {View, StyleSheet} from 'react-native'

export default function Card(props) {
  return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  card: {
    // ** card like styling for iOS **
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // ** card like styling for iOS **

    // ** card like styling for Android **
    elevation: 5,
    // ** card like styling for Android **
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  }
})