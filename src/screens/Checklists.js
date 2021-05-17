import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import {StyleSheet} from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import ListItem from '../components/ListItem';
import { Feather } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity ,FlatList} from 'react-native';
import Search from '../components/SearchBar';

const Checklists=({navigation})=>{
    const {state,deleteSelected,hdr,list,misc,setStates,isLoaded,setReqLoad}=useContext(CheckListContext);
    console.log('Initial state is '+JSON.stringify(state));
    const [keyPress,setKeyPress]=useState(false);

      const loadData=()=>{
          console.log('IS LOADED ..? '+isLoaded)
          if(isLoaded&&state.reqLoad){
            if(hdr.length > 0 && list.length > 0 && misc.length>0){
                console.log('Initial hdr is '+JSON.stringify(hdr));
                console.log('Initial list is '+JSON.stringify(list));
                console.log('Initial misc is '+JSON.stringify(misc));
                setReqLoad();
                setStates(hdr,list,misc);
                }
            }
        };

        useEffect(()=>{
            loadData();
        });

    

    return <View style={[styles.view,{backgroundColor:state.bgColor}]}>
        <Search/>
        <View style={styles.cont}>
            <FlatList
                data={state.list}
                keyExtractor={i=>i.id.toString()}
                renderItem={({item})=>{
                    return <TouchableOpacity
                                onPress={()=>navigation.navigate('ListView',{id:item.id})}>
                            <ListItem item={item} del={deleteSelected} font={state.font}/>
                            </TouchableOpacity> 
                }}
            />
        </View>
        <View style={styles.addbutt}>
        <TouchableHighlight style={keyPress? styles.plusPressed:styles.plus}
                          onHideUnderlay={()=>setKeyPress(false)} 
                          onShowUnderlay={()=>setKeyPress(true)}
                          underlayColor='red'
                          onPress={()=>navigation.navigate('AddList')}>
            <Feather name='plus' size={40} color='white' />
        </TouchableHighlight>
        </View>        
    </View>
}

const styles=StyleSheet.create({
    view:{
        flex:1,
        justifyContent:'flex-start',
    },
    cont:{
        marginTop:10,
        flex:1
    },
    addbutt:{
        position:'absolute',
        bottom:0,
        right:0,
        marginBottom:40,
        marginRight:40
    },
    delButt:{
        position:'absolute',
        width:100,
        left:35,
        top:-12
    },
    plus:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'blue',
        borderRadius:50,
    },
    plusPressed:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'blue',
        borderRadius:50,
        marginLeft:4,
        marginTop:3
    },
});

export default Checklists;