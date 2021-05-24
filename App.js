import * as React from 'react'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'



const App = createStackNavigator(
  {
    News: HomeScreen,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'News',
  }
);
export default createAppContainer(App);