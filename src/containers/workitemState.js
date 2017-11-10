import React from 'react';
import { View, Text, TouchableHighlight, SectionList, Alert, ActivityIndicator, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import vsts from '../api/common'
import WorkItem from '../components/workItemState'
import WorkItemSection from '../components/workItemIteration'
import Icon from 'react-native-vector-icons/MaterialIcons'

class WorkItemScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      currentlyOpenSwipeable: null,
      data: []
    }
  }
  static navigationOptions = ({navigation}) => ({
    drawerLabel: 'Work Items',
    headerTitle: 'Work Items',
    headerRight: (
      <TouchableHighlight style={{ marginRight: 10 }} onPress={() => navigation.navigate('WorkItemCal')}>
        <View>
          <Icon
            name='date-range'
            size={30}
            color='#111' />
        </View>
      </TouchableHighlight>
    )
  })

  async componentDidMount() {
    
    const data = await this._fetchData()
    
  }
  _fetchData = async () => {
    try {
      this.setState({loading: true})
      const response = await fetch('http://ci.lolobyte.com/api/workitems/state', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          project: this.props.project,
          state: 'Closed',
          isAccepted: false
        })
      })
      const result = await response.json()
      if (result.success) {        
        this.setState({ data: result.data })
      }
      
    } catch (error) {
      
    }
    this.setState({ loading: false })
  }
  refreshWorkItems = async () => {
    this.setState({loading: true})
    this.setState({ data: data.value, loading: false })
  }
  _handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;
    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter()
      
    }
  }
  onPressItem = async (item, index) => {
    try {
      var response = await fetch(`http://ci.lolobyte.com/api/workitems`, {
        method: 'patch',
        headers: { 'Content-Type': 'application/json' }
      })
      var result = await response.json()
      console.log('accept-wit', result.data)
      if (result.success) {
        const items = this.state.data
        items.splice(index, 1)
        this.setState({ data: items })
        await this.props.navigation.state.params.refresh()
      }
    } catch (error) {
      
    }
    
  }
  render () {
    const {currentlyOpenSwipeable} = this.state
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter()
        }
        this.setState({currentlyOpenSwipeable: swipeable})
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    }
    let view
    if (this.state.loading) {
      view = <ActivityIndicator size="large" style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}/>
    } else {
      view = <SectionList
        renderItem={({ item, index }) => <WorkItem
          item={item}
          type='item'
          onPress={() => this.onPressItem(item, index)}
          {...itemProps}
        />}
        renderSectionHeader={({ section, index }) => <WorkItemSection
          item={section}
          type='section'
          {...itemProps}
        />}
        sections={this.state.data}

      />
    }
    return (
      view
    )
  }
}
const mapStateToProps = state => ({
  title: state.app.title,
  project: state.app.currentProject,
  workIds: state.app.workIds
})


export default connect(mapStateToProps)(WorkItemScreen)
