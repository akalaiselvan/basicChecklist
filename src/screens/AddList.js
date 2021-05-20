import React,{useState,useContext, useRef,useEffect} from 'react';
import {Button} from 'react-native';
import Spacer from '../components/Spacer';
import ListForm from '../components/ListForm';
import {View,StyleSheet,TextInput } from 'react-native';
import {Context as checklistContext} from '../context/CheckListContext';

const AddList=({navigation})=>{
    const {addChecklist,state}=useContext(checklistContext);
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [clist,setclist]=useState([]);

    useEffect(()=>{
        const id=navigation.getParam('id');
        console.log('getting id '+id)
        if(id){
            const item=state.list.find(t=>t.id===id);
            setTitle(item.title);
            setclist(item.lists);
        }
    },[]
    );

    const addClist=()=>{
        setclist((prev)=>{
            const lastState=[...prev];
            return [...lastState,{value:value,
                    id:Math.round(Date.now())+Math.floor(Math.random()*1001)}];
        })
        setValue('');
    }

    const saveChecklist=()=>{
        console.log('Save clicked')
        if(title===''){
            addChecklist({title:`${clist[0]} ${clist[1]}`,clist});
        }else{
            addChecklist({title,clist});
        }
        setTitle('');
        setclist([]);
        navigation.navigate('Checklists');
    }

    const listRef=useRef(null);
    const titRef=useRef(null);
    return <View style={[styles.view,{backgroundColor:state.bgColor}]}>   
        <View>
            <View style={styles.head}>
                <TextInput autoFocus placeholder='Give some title'
                        ref={titRef}
                        style={[styles.right,{fontFamily:state.font}]}
                        value={title}
                        onChangeText={(v)=>setTitle(v)}
                        onSubmitEditing={()=>listRef.current.focus()}
                        blurOnSubmit={false}/>
                <Spacer/>
                <TextInput placeholder='Add checklist' 
                    ref={listRef}
                    style={[styles.input,{fontFamily:state.font}]} 
                    value={value} 
                    onChangeText={(v)=>setValue(v)}
                    onSubmitEditing={addClist}
                    blurOnSubmit={false}/>
                <Spacer/>
            </View>
            <View style={styles.content}>
                <ListForm list={clist} id={navigation.getParam('id')}/>
            </View>   
            </View> 
            <View style={styles.bottom}>     
            <Spacer/>
                <Button style={styles.button} title='save' onPress={saveChecklist}/>
            </View>
    </View>
}

const styles=StyleSheet.create({
    button:{
        backgroundColor: 'red',
        borderRadius: 10,
    },
    view:{
        flex:1,
        justifyContent:'flex-start',
    },
    head:{
        //backgroundColor:'blue',
        height:20,
        top:0,
        height:100,
    },
    input:{
        borderColor:'transparent',
        marginLeft:50
    },
    right:{
        marginLeft:50
    },
    content:{
        //backgroundColor:'pink',
        height:'85%'
    },
    bottom:{
        //backgroundColor:'red',
        position:'absolute',
        height:100,
        bottom:10,
        left:160,
        width:100
    },
});



export default AddList;