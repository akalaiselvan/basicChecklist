import React from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'


const SearchBar=({context,setCon,doSearch})=>{
    return <View style={styles.bg}>
        <FontAwesome name='search' style={styles.iconStyle}/>
        <TextInput
            placeholder='Search'
            style={styles.inputStyle}
            value={context}
            onChangeText={setCon}
            onEndEditing={doSearch}/>
    </View>
}

const styles=StyleSheet.create({
    bg:{
        borderRadius:5,
        backgroundColor:'#F0EEEE',
        marginTop:10,
        marginHorizontal:20,
        height:50,
        flexDirection:'row',
    },
    iconStyle:{
        fontSize:35,
        alignSelf:'center',
        marginHorizontal:10
    },
    inputStyle:{
        flex:1
    }
});

export default SearchBar;