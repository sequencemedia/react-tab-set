import React from 'react'
import PropTypes from 'prop-types'

import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from 'react-tab-set'

export default class RenderParentComponent extends React.Component {
  state = {
    n: this.props.n
  }

  handleClick = () => this.setState({ n: this.state.n + 1 })

  render () {
    const { onChange } = this.props
    const { n } = this.state

    return (
      <div onClick={this.handleClick}>
        Number {n} number
        <TabSet selectedTab='one' onChange={onChange}>
          <TabGroup>
            <Tab tab='one'>
              One {n}
            </Tab>
            <Tab tab='two'>
              Two {n}
            </Tab>
          </TabGroup>
          <TabPanel tab='one' render={() => {
            return `One ${n}`
          }} />
          <TabPanel tab='two' render={() => {
            return `Two ${n}`
          }} />
        </TabSet>
      </div>
    )
  }
}

RenderParentComponent.propTypes = {
  onChange: PropTypes.func,
  n: PropTypes.number.isRequired
}
