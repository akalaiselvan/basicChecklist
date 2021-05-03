import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import AddList from './src/screens/AddList'; 
import Checklists from './src/screens/Checklists'; 
import ShowList from './src/screens/ShowList'; 
import Settings from './src/screens/Settings';


const mainNavigation=createSwitchNavigator({
  mainflow:createBottomTabNavigator({
    AddList:AddList,
    Checklists:Checklists,
    Settings:Settings
  })
});

export default createAppContainer(mainNavigation);