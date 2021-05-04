import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import AddList from './src/screens/AddList'; 
import Checklists from './src/screens/Checklists'; 
import ShowList from './src/screens/ShowList'; 
import Settings from './src/screens/Settings';
import {Provider as ChecklistProvider} from './src/context/CheckListContext';


const mainNavigation=createSwitchNavigator({
  mainflow:createBottomTabNavigator({
    //AddList:AddList,
    ChecklistFlow:createStackNavigator({
      Checklists:Checklists,
      AddList:AddList,
      ShowList:ShowList
    }),
    Settings:Settings
  })
});

const App=createAppContainer(mainNavigation);
export default()=>{
  return <ChecklistProvider>
    <App/>
  </ChecklistProvider>
}