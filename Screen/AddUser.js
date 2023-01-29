import { View, Text,Button, StyleSheet, Alert, TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { TouchableOpacity,SafeAreaView } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'UserDatabase.db'});

const AddUser = ({navigation}) => {
  const [name,setName] = useState('')
  const [mobile,setMobile] = useState('')
  const [itemName,setItemName] = useState('')
  const [advanceAmount,setAdvanceAmount] = useState('')
  const [balanceAmount,setBalanceAmount] = useState('')
  const [isPaid,setIsPaid] = useState('')
  const [address,setAddress] = useState('')
  // const [data,setDummy] = useState('')

  const createUser = () => {
    try {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO User (Name,Mobile,ItemName,AdvanceAmount,BalanceAmount,IsPaid,Address) VALUES (?,?,?,?,?,?,?)',
          [name,mobile,itemName,advanceAmount,balanceAmount,isPaid,address],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'You are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                {cancelable: false},
              );
            } else Alert.alert('Registration Failed');
          },
          error => {
            console.log(error);
          },
        );
      });
      console.log('userData::::::::::'+ JSON.stringify(userData))
    } catch (error) {
      
    }
    setName('')
    setMobile('')
    setItemName('')
    setAdvanceAmount('')
    setBalanceAmount('')
    setIsPaid('')
    setAddress('')
 }

  return (
    <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
      <TextInput placeholderTextColor={Colors.dark} placeholder='name' value={name} onChangeText={(text) => setName(text)} style={styles.input}/>
      <TextInput placeholderTextColor={Colors.dark} placeholder='mobile' value={mobile} keyboardType='numeric' onChangeText={(text) => setMobile(text)} style={styles.input} maxLength={10}/>
      <TextInput placeholderTextColor={Colors.dark} placeholder='itemName' value={itemName} onChangeText={(text) => setItemName(text)} style={styles.input}/>
      <TextInput placeholderTextColor={Colors.dark} placeholder='advanceAmount' value={advanceAmount} keyboardType='numeric' onChangeText={(text) => setAdvanceAmount(text)} style={styles.input}/>
      <TextInput placeholderTextColor={Colors.dark} placeholder='balanceAmount' value={balanceAmount} keyboardType='numeric' onChangeText={(text) => setBalanceAmount(text)} style={styles.input}/>
      <TextInput placeholderTextColor={Colors.dark} placeholder='isPaid' value={isPaid} onChangeText={(text) => setIsPaid(text)} style={styles.input}/>
      <TextInput placeholderTextColor={Colors.dark} placeholder='address' value={address} onChangeText={(text) => setAddress(text)} style={styles.input}/>
      <TouchableOpacity onPress={createUser} style={{backgroundColor:'black',padding:10, borderRadius:100,width:100,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white'}}>Add</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        width:200,
        margin: 6,
        borderWidth: 1,
        padding: 10,
    },
});

export default AddUser