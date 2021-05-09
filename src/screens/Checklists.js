import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import {Context as CheckListContext} from '../context/CheckListContext';
import ListItem from '../components/ListItem';
import { Feather } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity ,FlatList} from 'react-native';

const Checklists=({navigation})=>{
    const {state,dragged,deleteSelected}=useContext(CheckListContext);
    const [keyPress,setKeyPress]=useState(false);
    
    return <SafeAreaView style={styles.view}>
        <View style={styles.cont}>
            <FlatList
                data={state.list}
                keyExtractor={i=>i.id.toString()}
                renderItem={({item})=>{
                    return <TouchableOpacity
                                onPress={()=>navigation.navigate('ListView',{id:item.id})}>
                            <ListItem item={item} del={deleteSelected}/>
                            </TouchableOpacity> 
                }}
            />
        </View>
        <Spacer/>
        <View>
        <View style={styles.addbutt}>
        <TouchableHighlight style={keyPress? styles.plusPressed:styles.plus}
                          onHideUnderlay={()=>setKeyPress(false)} 
                          onShowUnderlay={()=>setKeyPress(true)}
                          underlayColor='red'
                          onPress={()=>navigation.navigate('AddList')}>
            <Feather name='plus' size={40} color='white' />
        </TouchableHighlight>
        </View>        
        <Spacer/>
        </View>        
    </SafeAreaView>
}

const styles=StyleSheet.create({
    view:{
        flex:1,
        justifyContent:'center',
    },
    cont:{
        height:'80%',
    },
    addbutt:{
        position:'absolute',
        width:50,
        right:40,
        top:-12,
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
    }
});

export default Checklists;