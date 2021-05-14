import React, { useContext, useEffect } from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import ListForm from '../components/ListForm';
import { EvilIcons } from '@expo/vector-icons'; 
const ListView=({navigation})=>{

    const {state}=useContext(CheckListContext);
    const id=navigation.getParam('id');
    const item=state.list.find(t=>t.id===id);
    return <View style={{backgroundColor:state.bgColor}}>
        <ListForm list={item.lists} id={id}/>
    </View>
}

ListView.navigationOptions=({navigation})=>{
   return {
    headerRight:()=>(<TouchableOpacity style={{marginRight:25}}
                        onPress={()=>navigation.navigate('EditList',
                        {id:navigation.getParam('id')})}>
        <EvilIcons name="pencil" size={35} color="black" />
    </TouchableOpacity>)    
}
};

export default ListView;