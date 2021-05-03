import React from 'react';
import {Text,Button} from 'react-native-elements'
import {View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

const Checklists=({navigation})=>{
    return <SafeAreaView>
        <Text> showing checklists</Text>
        <Button onPress={()=>navigation.navigate('AddList')}>Show List</Button>
    </SafeAreaView>
}

export default Checklists;