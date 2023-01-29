import { View, Text,TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native'
import Svg,{ Path, SvgUri, SvgXml } from 'react-native-svg'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import {openDatabase} from 'react-native-sqlite-storage';
import ListUsers from './ListUsers'
let db = openDatabase({name: 'UserDatabase.db'});

const baseUrl = "http://192.168.29.79:5000"

const Home = ({navigation}) => {

  const[userData,setUserData] = useState([])
  const[dummy,setDummy] = useState(true)

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM User', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i){
          temp.push(results.rows.item(i));
        }
          setUserData(temp);
      });
    });
    console.log('userData::::::::::'+ JSON.stringify(userData))
  };

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='User'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS User', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS User(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(20), Mobile INTEGER, ItemName VARCHAR(20),AdvanceAmount INTEGER,BalanceAmount INTEGER,IsPaid VARCHAR(5),Address VARCHAR(20))',
              [],
            );
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  }

  useEffect(() => {
    if(dummy){
    getData()
    setDummy(false)
    }
    createTable();
  }, [dummy]);
 

  const deleteUser = async(id) => {
    db.transaction(tx => {
      tx.executeSql(`DELETE FROM User WHERE Id = ${id}`, [], (tx, results) => {
        Alert.alert("User Deleted Successfully!")
        setDummy(true)
      });
    });
  }

  return (
    <View style={styles.container}>
      <FlatList data={userData}
        renderItem={({item}) => <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}} key={item.Id}><TouchableOpacity style={{padding:8,backgroundColor:'#E8D2A6',margin:8,borderRadius:8,width:280}} onPress={() => navigation.navigate('UpdateUser',item)}><ListUsers data={item}/></TouchableOpacity><TouchableOpacity onPress={() => deleteUser(item.Id)}><Text style={{color:Colors.dark}}>Delete</Text></TouchableOpacity></View>}
      >
      </FlatList>
      <Text onPress={() => setDummy(true)} style={{justifyContent:'center',alignContent:'center'}}>Reload</Text>
    <View style={styles.icon}>
    <TouchableOpacity onPress={() => navigation.navigate('AddUser')}>
    <Svg height={60}
      width={60}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        shapeRendering="geometricPrecision"
        fill={"black"}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M256 0c70.68 0 134.69 28.66 181.02 74.98C483.34 121.29 512 185.31 512 256c0 70.69-28.66 134.69-74.98 181.02C390.69 483.34 326.68 512 256 512c-70.69 0-134.71-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.69 28.66-134.69 74.98-181.02C121.29 28.66 185.31 0 256 0zm122.47 256c0 15.57-12.77 28.31-28.31 28.31h-65.84v65.84c0 15.57-12.76 28.31-28.32 28.31-15.57 0-28.32-12.77-28.32-28.31v-65.84h-65.83c-15.55 0-28.32-12.76-28.32-28.31 0-15.56 12.74-28.32 28.32-28.32h65.83v-65.84c0-15.55 12.77-28.32 28.32-28.32 15.56 0 28.32 12.74 28.32 28.32v65.84h65.84c15.57 0 28.31 12.75 28.31 28.32z"
      />
    </Svg>
    {/* <Svg width={30} height={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4Z" fill="#fff" /> 
    </Svg> */}
    </TouchableOpacity>
    </View>
    </View>
  )
  }

const styles = StyleSheet.create({
  container: {
      flex:1
  },
  icon : {
      // justifyContent:'center',
      // alignItems:'center',
      borderRadius: 100,
      width: 80,
      height: 80,
      position:'absolute',
      bottom:20,
      right: 20,
      padding: 15
  }
})

export default Home