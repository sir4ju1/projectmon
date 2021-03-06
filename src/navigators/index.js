import React from 'react'
import PropTypes from 'prop-types'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { connect } from 'react-redux'


import LoginScreen from '../containers/login'
import HomeScreen from '../containers/home'
import ProjectScreen from '../containers/projects'
import ProjectEdit from '../containers/projectedit'
import RepoScreen from '../containers/repo'
import WorkItemStateScreen from '../containers/workitemState'
import WorkItemCalScreen from '../containers/workitemCal'
import WorkItemMemberScreen from '../containers/workitemMember'
import WorkItemIterationScreen from '../containers/workitemIteration'
import DrawerButton from '../components/drawerButton'
import DrawerView from '../components/drawerView'

const HomeNavigator = StackNavigator({ 
  Home: {
    screen: HomeScreen,
  },
  WorkItemState: {
    screen: WorkItemStateScreen
  },
  WorkItemMember: {
    screen: WorkItemMemberScreen
  },
  WorkItemIteration: {
    screen: WorkItemIterationScreen
  },
  WorkItemCal: {
    screen: WorkItemCalScreen
  },
  Login: {
    screen: LoginScreen,
  }
}, {
  initialRouteName: 'Home', 
  navigationOptions: () => (
    {
      headerStyle: {backgroundColor: '#0078d7'}
    }
  )
})
const ProjectNavigator = StackNavigator({ 
  Projects: {
    screen: ProjectScreen,
  },
  ProjectEdit: {
    screen: ProjectEdit,
  },
  RepoEdit: {
    screen: RepoScreen
  }
}, {
  navigationOptions: () => (
    {
      headerStyle: {backgroundColor: '#0078d7'}
    }
  )
})

const AppNavigator = DrawerNavigator({
    Home: {
      screen: HomeNavigator,
    },
    Projects: {
      screen: ProjectNavigator
    }
  },
  {
    contentComponent: DrawerView,
  }
)

export default AppNavigator
