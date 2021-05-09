import React,{useContext, useRef,useState} from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import {View,StyleSheet,FlatList} from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import Spacer from '../components/Spacer';

const EditList=({navigation})=>{
    const id = navigation.getParam('id');
    const {state,updateList}=useContext(CheckListContext);
    const item=state.list.find(t=>t.id===id);
    const [clist,setclist]=useState(item.lists);
    const [title,setTitle]=useState(item.title);
    const [val,setval]=useState('');

    const addClist=()=>{
        setclist((prev)=>{
            const lastState=[...prev];
            return [...lastState,{value:val,
                    id:Math.round(Date.now())+Math.floor(Math.random()*1001)}];
        })
        setval('');
    }

    const update=(id,val)=>{
        const list =[...clist]
        const child=list.find(f=>f.id===id)
        const ind=list.findIndex(f=>f.id===id)
        child.value=val;
        list[ind]=child;
        setclist(list);
    }

    const save=(id,clist)=>{
        updateList(id,clist,title)
        navigation.navigate('Checklists');
        navigation.navigate('ListView',{id:item.id})
    }

    const listRef=useRef(null);
    const titRef=useRef(null);

    return<View style={styles.content}>
            <View style={styles.head}>
                        <TextInput autoFocus placeholder='Give some title'
                                ref={titRef}
                                style={styles.right}
                                value={title}
                                onChangeText={(v)=>setTitle(v)}
                                onSubmitEditing={()=>listRef.current.focus()}
                                blurOnSubmit={false}
                                />
                        <Spacer/>
                        <TextInput placeholder='Add checklist' 
                            ref={listRef}
                            style={styles.inputs} 
                            value={val} 
                            onChangeText={(v)=>setval(v)}
                            onSubmitEditing={addClist}
                            blurOnSubmit={false}
                            />
                        <Spacer/>
            </View>
        <FlatList
            data={clist}
            keyExtractor={k=>k.id}
            renderItem={({item})=>{
                return <View>
                        <View style={styles.Item}>
                            <TextInput value={item.value}
                                        textAlignVertical='center'
                                        marginLeft={15}
                                        onChangeText={(val)=>update(item.id,val)}
                                        style={styles.input}
                                        />

                       </View>
                       </View>
            }}
            />
        <View style={styles.bottom}>
                <Button title='save' onPress={()=>save(id,clist)}/>    
        </View>            
    </View>
}

const styles=StyleSheet.create({
    content:{
        height:'85%'
    },
    bottom:{
        //backgroundColor:'red',
        position:'absolute',
        height:50,
        bottom:0,
        right:0,
        width:100,
        marginRight:10
    },
    Item:{
        marginTop:5,
        marginBottom:5,
        backgroundColor:'#f0ffff',
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
        marginLeft:10,
        marginRight:10,
        borderRadius:10

    },
    input:{
        width:'100%'
    },
    head:{
        //backgroundColor:'blue',
        height:20,
        top:0,
        height:100,
    },
    inputs:{
        borderColor:'transparent',
        marginLeft:50
    },
    right:{
        marginLeft:50
    }
});

export default EditList;