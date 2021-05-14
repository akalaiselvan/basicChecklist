import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as CheckListContext} from '../context/CheckListContext';
import ListItem from '../components/ListItem';
import { Feather } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity ,FlatList} from 'react-native';
import Search from '../components/SearchBar';

const Checklists=({navigation})=>{
    const {state,dragged,deleteSelected}=useContext(CheckListContext);
    const [keyPress,setKeyPress]=useState(false);
    
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