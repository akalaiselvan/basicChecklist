import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import {View,ScrollView,Text,StyleSheet} from 'react-native';

const font=['normal','notoserif','sans-serif','sans-serif-light','sans-serif-thin',
    'sans-serif-condensed','sans-serif-medium','serif','Roboto','monospace']

const SelectFont=({switchFont})=>{
    return <View style={styles.container}>
                <View style={styles.rect}>
                    <Text style={styles.selectFont}>Select Font</Text>
                </View>
                <View style={styles.scrollArea}>
                        <FlatList
                            data={font}
                            keyExtractor={k=>k}
                            renderItem={({item})=>{
                                return <TouchableOpacity onPress={()=>switchFont(item)}>
                                        <View style={styles.fontSelect}>
                                            <Text style={{fontFamily:item}}>{item}</Text>
                                        </View>
                                </TouchableOpacity>
                            }
                            }
                        />
                </View>
  </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position:'absolute',
      zIndex:1,
      marginLeft:20,
      marginTop:120
    },
    scrollArea: {
      width: 334,
      height: 477,
      backgroundColor: "rgba(230, 230, 230,1)",
      marginTop: 1,
      marginLeft: 21
    },
    scrollArea_contentContainerStyle: {
      height: 477,
      width: 334
    },
    rect: {
      width: 334,
      height: 46,
      backgroundColor: "rgba(150,197,218,1)",
      marginLeft: 21
    },
    selectFont: {
      //fontFamily: "",
      color: "#121212",
      fontSize: 25,
      marginLeft: 77,
    },
    fontSelect:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'black',
        height:40,
        width:'90%',
        //marginBottom:5,
        marginLeft:18,
        marginTop:5,

    }
  });


  export default SelectFont;