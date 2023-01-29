import { View, Text,Button, StyleSheet, Alert, TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { TouchableOpacity,SafeAreaView } from 'react-native'
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'UserDatabase.db'});


const UpdateUser = ({navigation,route}) => {
  const [id,setId] = useState()
  const [name,setName] = useState(route.params.Name)
  const [mobile,setMobile] = useState(route.params.Mobile.toString())
  const [itemName,setItemName] = useState(route.params.ItemName)
  const [advanceAmount,setAdvanceAmount] = useState(route.params.AdvanceAmount.toString())
  const [balanceAmount,setBalanceAmount] = useState(route.params.BalanceAmount.toString())
  const [isPaid,setIsPaid] = useState(route.params.IsPaid)
  const [address,setAddress] = useState(route.params.Address)

  const baseUrl = "http://192.168.29.79:5000/"

  const updateUser = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        `UPDATE User set Name=?, Mobile=? , ItemName =? ,AdvanceAmount=?, BalanceAmount=?, IsPaid=?, Address=? where Id=${route.params.Id}`,
        [name,mobile,itemName,advanceAmount,balanceAmount,isPaid,address],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User Updated Successfully',
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
  }
  


  return (
    <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
      <TextInput placeholder='name' value={name} onChangeText={(text) => setName(text)} style={styles.input}/>
      <TextInput placeholder='mobile' value={mobile} keyboardType='numeric' onChangeText={(text) => setMobile(text)} style={styles.input}/>
      <TextInput placeholder='itemName' value={itemName} onChangeText={(text) => setItemName(text)} style={styles.input}/>
      <TextInput placeholder='advanceAmount' value={advanceAmount} keyboardType='numeric' onChangeText={(text) => setAdvanceAmount(text)} style={styles.input}/>
      <TextInput placeholder='balanceAmount' value={balanceAmount} keyboardType='numeric' onChangeText={(text) => setBalanceAmount(text)} style={styles.input}/>
      <TextInput placeholder='isPaid' value={isPaid} onChangeText={(text) => setIsPaid(text)} style={styles.input}/>
      <TextInput placeholder='address' value={address} onChangeText={(text) => setAddress(text)} style={styles.input}/>
      <TouchableOpacity onPress={updateUser} style={{backgroundColor:'black',padding:10, borderRadius:100,width:100,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white'}}>Update</Text></TouchableOpacity>
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

export default UpdateUser