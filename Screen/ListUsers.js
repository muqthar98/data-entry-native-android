import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ListUsers = ({data}) => {
  return (
    <View>
      <Text style={styles.text}>{data.Id}</Text>
      <Text style={styles.text}>{data.Name}</Text>
      <Text style={styles.text}>{data.Mobile}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        color : 'black'
    }
})

export default ListUsers