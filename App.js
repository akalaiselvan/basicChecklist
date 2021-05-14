import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import AddList from './src/screens/AddList'; 
import Checklists from './src/screens/Checklists'; 
import Settings from './src/screens/Settings';
import {Provider as ChecklistProvider} from './src/context/CheckListContext';
import ListView from './src/components/ListView';
import EditList from './src/screens/EditList';
import { Entypo } from '@expo/vector-icons';

const lists =createStackNavigator({
      Checklists:Checklists,
      AddList:AddList,
      ListView:ListView,
      EditList:EditList
});

lists.navigationOptions={
  title:'Lists',
  tabBarIcon:<Entypo name="list" size={24} color="black" />
}

const mainNavigation=createSwitchNavigator({
  mainflow:createBottomTabNavigator({
    ChecklistFlow:lists,
    Settings:Settings
  })
});

const App=createAppContainer(mainNavigation);
export default()=>{
  return <ChecklistProvider>
    <App/>
  </ChecklistProvider>
}