import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';
import AddInterviewer from '../screens/AddInterviewer';
import UpdateInterviewer from '../screens/UpdateInterviewer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Homesreen from '../screens/Homesreen';
import CustomSidebarMenu from '../Helper/CustomSideBar';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedOutStack = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={Homesreen} />
  </Stack.Navigator>
);

export const SignedInStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={HomeStack} />
    <Stack.Screen name="AddNewCandidate" component={AddInterviewer} />
    <Stack.Screen name="UpdateCandidate" component={UpdateInterviewer} />
  </Stack.Navigator>
);

export const HomeStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSidebarMenu {...props} />}
      useLegacyImplementation
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#121212',
          width: 240,
        },
        // drawerActiveTintColor: '#fff',
        // drawerActiveBackgroundColor: '#0079a6',
        // drawerInactiveTintColor: '#88d9ff',
        headerStyle: {
          backgroundColor: '#121212', //Set Header color
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
        <Drawer.Screen
        name="Registration"
        component={Home}
        options={{
          drawerLabel: 'Registration',
          // Section/Group Name
          groupName: 'Candidate',
        }}
      />
      <Drawer.Screen
        name="Status"
        component={Home}
        options={{
          drawerLabel: 'Status',
          // Section/Group Name
          groupName: 'Candidate',
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Home}
        options={{
          drawerLabel: 'Report',
          // Section/Group Name
          groupName: 'Candidate',
        }}
      />
      {/* Management */}
      <Drawer.Screen
        name="RRFDashboard"
        component={Home}
        options={{
          drawerLabel: 'RRFDashboard',
          // Section/Group Name
          groupName: 'Management',
        }}
      />
      <Drawer.Screen
        name="RRFForm"
        component={Home}
        options={{
          drawerLabel: 'RRFForm',
          // Section/Group Name
          groupName: 'Management',
        }}
      />
      <Drawer.Screen
        name="RRFStatus"
        component={Home}
        options={{
          drawerLabel: 'RRFStatus',
          // Section/Group Name
          groupName: 'Management',
        }}
      />
      {/* candidate */}
      <Drawer.Screen
        name="Dashboard"
        component={Home}
        options={{
          drawerLabel: 'Dashboard',
          // Section/Group Name
          groupName: 'Panel',
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Interviewer',
          // Section/Group Name
          groupName: 'Panel',
        }}
      />
      <Drawer.Screen
        name="Scheduler"
        component={Home}
        options={{
          drawerLabel: 'Scheduler',
          // Section/Group Name
          groupName: 'Panel',
        }}
      />
      <Drawer.Screen
        name="HREvaluation"
        component={Home}
        options={{
          drawerLabel: 'HR Evaluation',
          // Section/Group Name
          groupName: 'Panel',
        }}
      />
      <Drawer.Screen
        name="Users"
        component={Home}
        options={{
          drawerLabel: 'Users',
          // Section/Group Name
          groupName: 'Admin',
        }}
      />
      <Drawer.Screen
        name="Consultancy"
        component={Home}
        options={{
          drawerLabel: 'Consultancy',
          // Section/Group Name
          groupName: 'Admin',
        }}
      />
    </Drawer.Navigator>
  );
};
