import React from 'react'
import PropTypes from 'prop-types'

import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from 'react-tab-set'

export default class StaticParentComponent extends React.Component {
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
          <TabPanel tab='one'>
            One {n}
          </TabPanel>
          <TabPanel tab='two'>
            Two {n}
          </TabPanel>
        </TabSet>
      </div>
    )
  }
}

StaticParentComponent.propTypes = {
  onChange: PropTypes.func,
  n: PropTypes.number.isRequired
}
