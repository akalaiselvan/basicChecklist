import React from 'react';
import {Text} from 'react-native-elements'
import {View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

const Settings=()=>{
    return <SafeAreaView>
        <Text> Settings</Text>
    </SafeAreaView>
}

Settings.navigationOptions={
    tabBarIcon:<Ionicons name="settings-outline" size={24} color="black" />
}
export default Settings;