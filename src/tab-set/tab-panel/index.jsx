import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  v4
} from 'uuid'

export default class TabPanel extends Component {
  /*
   *  The tab and selected tab defaults do not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    tab: v4(),
    selectedTab: v4()
  }

  shouldComponentUpdate (props) {
    if (props.render instanceof Function) return true

    return (
      props.children !== this.props.children ||
      props.tab !== this.props.tab ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  renderPanel () {
    const {
      render = () => null,
      children = render()
    } = this.props

    if (children) {
      return (
        <div className='tab-panel'>
          {children}
        </div>
      )
    }

    return null
  }

  render () {
    const {
      tab,
      selectedTab
    } = this.props

    if (tab === selectedTab) {
      return this.renderPanel()
    }

    return null
  }
}

TabPanel.propTypes = {
  render: PropTypes.func,
  tab: PropTypes.string,
  selectedTab: PropTypes.string,
  children: PropTypes.any
}
