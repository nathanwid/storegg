import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface IFABProps {
    onPress: () => void;
}

export default function FloatingActionButton(props: IFABProps) {
  return (
    <TouchableOpacity style={styles.btn} onPress={props.onPress}>
        <Text style={styles.btnText}>+</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      backgroundColor: 'red',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
    },
    btnText: {
      fontSize: 30,
      color: 'white'
    }
  })