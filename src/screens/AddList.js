import React,{useState,useContext, useRef} from 'react';
import {Text,Input,Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import ListForm from '../components/ListForm';
import { StyleSheet,TextInput } from 'react-native';
import {Context as checklistContext} from '../context/CheckListContext';

const AddList=()=>{
    const {addChecklist}=useContext(checklistContext);
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [clist,setclist]=useState([]);

    const addClist=()=>{
        setclist((prev)=>{
            const lastState=[...prev];
            return [...lastState,value];
        })
        setValue('');
    }

    const saveChecklist=()=>{
        if(title===''){
            console.log('Title is empty');
            addChecklist({title:`${clist[0]} ${clist[1]}`,clist});
        }else{
            addChecklist({title,clist});
        }
        setTitle('');
        setclist([]);
    }

    const listRef=useRef(null);
    const titRef=useRef(null);
    return <SafeAreaView>   
        <TextInput autoFocus placeholder='Give some title'
                    style={styles.right}
                    value={title}
                    onChangeText={(v)=>setTitle(v)}
                    onSubmitEditing={()=>listRef.current.focus()}
                    blurOnSubmit={false}/>
        <Spacer/>
        <TextInput placeholder='Add checklist' 
               ref={listRef}
               style={styles.input} 
               value={value} 
               onChangeText={(v)=>setValue(v)}
               onSubmitEditing={addClist}
               blurOnSubmit={false}/>
        <Spacer/>       
        <Button title='Add' onPress={addClist}/>
        <ListForm list={clist}/>
        <Spacer/>
        <Button title='save' onPress={saveChecklist}/>
    </SafeAreaView>
}

const styles=StyleSheet.create({
    input:{
        borderColor:'transparent',
        marginLeft:50
    },
    right:{
        marginLeft:50
    }
});


export default AddList;