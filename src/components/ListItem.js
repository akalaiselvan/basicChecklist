import React, { useContext, useState } from 'react';
import { StyleSheet ,View ,Text,TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Context as CheckListContext} from '../context/CheckListContext'; 
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const ListItem=({item,func,font})=>{

    return<View >
            <View style={styles.item} >
                <Text style={[styles.text,{fontFamily:font}]}>{item.title}</Text> 
                <TouchableOpacity style={styles.options}
                                    //onPress={()=>del(item.id)}>
                                    onPress={()=>func()}>
                        {/* <MaterialIcons name="delete" size={28} color="black" /> */}
                        <SimpleLineIcons name="options-vertical" size={22} color="black" />
                </TouchableOpacity>
            </View>   
            </View>
}

const ListBox=({pid,item})=>{

    const {switchCheck,state:{font}}=useContext(CheckListContext);
    let check=item.isSelected==='true'?true:false;
    return <View style={styles.boxItem}>
        {pid?
              <CheckBox 
              value={check}
              onValueChange={(v)=>switchCheck(pid,item.id,v)}/>:null}
              <Text style={[styles.boxtext,{fontFamily:font}]}>{item.value}</Text> 
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
        marginTop:12,
        marginRight:10
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