import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native';
import {Text} from 'react-native-elements'

const ListForm=({list})=>{
    return <FlatList
            data={list}
            keyExtractor={i=>Math.floor(Math.random()*9999)}
            renderItem={({item})=>{ 
                return <Text>{item}</Text>
            }}
        />
}

export default ListForm;