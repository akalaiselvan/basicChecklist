import React, { useContext, useState } from 'react';
import {View,StyleSheet,Text,Alert} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Setting from '../components/Setting';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import SelectFont from '../components/SelectFont';

const Settings=({navigation})=>{

    const {switchTheme,removeAll,switchFonts,state:{bgColor,font},state} = useContext(CheckListContext);
    const iconStyle=styles.icon;
    const Font=<FontAwesome name="font" color="black" style={iconStyle}/>
    const theme=<Entypo name="feather" color="black" style={iconStyle}/>
    const backup=<MaterialIcons name="backup" color="black" style={iconStyle}/>
    const remove=<MaterialCommunityIcons name="delete-variant" color="black" style={iconStyle}/>
    const [fs,setsf]=useState(false);
    const switchFont=(value)=>{
        setModalVisible(!modalVisible)
    }


    const showAlert=(text,func)=>
        Alert.alert('Confirmation',text,
                [{
                    text : 'ok',
                    onPress:()=>func(),
                    style:'cancel',
                },{
                    text: 'Cancel',
                    style:'cancel'
                },
                ],
                {
                    cancelable:true,
                    onDismiss:()=>console.log('Cancelled the alert')
                });
                
        const [modalVisible,setModalVisible]=useState(false);

    return <View style={[styles.cont,{backgroundColor:bgColor}]}>
        {<SelectFont switchFonts={switchFonts} modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
        <TouchableOpacity onPress={()=>switchFont()}>
            <Setting content='Font' Icon={Font} font={font}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchTheme}>
            <Setting content='Theme' Icon={theme} font={font}/>
        </TouchableOpacity>
            <Setting content='Backup/Restore' Icon={backup} font={font}/>
        <TouchableOpacity onPress={()=>showAlert('Wish to delete all Lists',removeAll)}>
            <Setting content='Remove All' Icon={remove} font={font}/>
        </TouchableOpacity>
    </View>
}

const styles=StyleSheet.create({
    cont:{
        flex:1,
        paddingTop:50,
    },
    fontSelectorView:{
        position:'absolute',
        flex:1,
        backgroundColor:'black',
        height:500,
        width:500
    },
    icon: {
        color: "rgba(30,32,34,1)",
        fontSize: 25,
        height: 25,
        width: 25
      },
});  

Settings.navigationOptions={
    tabBarIcon:<Ionicons name="settings-outline" size={24} color="black" />
}
export default Settings;