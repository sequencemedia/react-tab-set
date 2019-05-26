import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

export default class TabPanel extends Component {
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
      render,
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

/*
 *  The tab and selected tab defaults don't have to be unique/a uuid, but using the 'uuid' package
 *  reduces the likelihood that they have the same value as an implemented tab
 */
TabPanel.defaultProps = {
  tab: uuid.v4(),
  selectedTab: uuid.v4()
}

TabPanel.propTypes = {
  children: PropTypes.element,
  tab: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  render: PropTypes.func
}
