import React from 'react'
import PropTypes from 'prop-types'

import TabSet, {
  TabGroup,
  Tab,
  TabPanel
} from 'react-tab-set'

export default class StaticParentComponent extends React.Component {
  state = {
    t: 'one',
    n: 0
  }

  handleChange = (t) => {
    this.setState({ t })

    const { onChange } = this.props

    onChange(t)
  }

  handleClick = () => {
    const n = this.state.n + 1

    this.setState({ n })

    const { onClick } = this.props

    onClick(n)
  }

  render () {
    const { t, n } = this.state

    return (
      <div onClick={this.handleClick}>
        <TabSet selectedTab={t} onChange={this.handleChange}>
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

StaticParentComponent.defaultProps = {
  onChange: () => {},
  onClick: () => {}
}

StaticParentComponent.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}
