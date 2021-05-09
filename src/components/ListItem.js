import React, { useContext, useState } from 'react';
import { StyleSheet ,View ,Text,TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Context as CheckListContext} from '../context/CheckListContext'; 
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const ListItem=({item,del})=>{

    return<View >
        <View style={styles.item}>
                <Text style={styles.text}>{item.title}</Text> 
                <TouchableOpacity style={styles.options} onPress={()=>del(item.id)}>
                        <MaterialIcons name="delete" size={28} color="black" />
                </TouchableOpacity>
        </View>   
            </View>
}

const ListBox=({pid,item})=>{

    const {switchCheck}=useContext(CheckListContext);
    const [val,setval]=useState(item.value);
    return <View style={styles.boxItem}>
        {pid?
              <CheckBox 
              value={item.isSelected}
              onValueChange={(v)=>switchCheck(pid,item.id,v)}/>:null}
        {pid?<TextInput value={val} onChangeText={setval}/>      
              :
              <Text style={styles.boxtext}>{item.value}</Text> 
             }
</View>
}

const styles=StyleSheet.create({
    item:{
        height:60,
        marginTop:10,
        backgroundColor:'#f0ffff',
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
        borderRadius:10,
        marginLeft:10,
        marginRight:10
    },
    text:{
        flex:1,
        marginTop:15,
        marginLeft:10
    },
    boxItem:{
        marginTop:10,
        backgroundColor:'#f0ffff',
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
        borderRadius:10,
        marginLeft:10,
        marginRight:10
    },
    boxtext:{
        flex:1,
        marginTop:5,
        marginLeft:10
    },
    options:{
        marginTop:10,
        marginRight:15
    },
    more:{
        display:'none',
        position:'absolute',
        bottom:0,
        right:20,
    }
});

export {ListBox};

export default ListItem;