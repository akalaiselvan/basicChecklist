import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import {StyleSheet} from 'react-native';
import {Text,Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import {Context as CheckListContext} from '../context/CheckListContext';

const Checklists=({navigation})=>{
    const {state}=useContext(CheckListContext);
    console.log('result state is '+state);
    return <View style={styles.view}>
        <View style={styles.cont}>
            <FlatList
                data={state}
                keyExtractor={i=>Math.floor(Math.random()*9999)}
                renderItem={({item})=>{
                    return <Text>{item.title}</Text>
                }}
            />
        </View>
        <Spacer/>
        <Button title='Add' 
                buttonStyle={styles.butt}
            onPress={()=>navigation.navigate('AddList')}/>
    </View>
}

const styles=StyleSheet.create({
    view:{
        flex:1,
        justifyContent:'center',
    },
    cont:{
        height:'90%',
    },
    butt:{
 
    }
});

export default Checklists;