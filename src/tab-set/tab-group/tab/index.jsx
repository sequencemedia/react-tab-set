import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  v4
} from 'uuid'

export default class Tab extends Component {
  /*
   *  The tab and selected tab defaults do not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    onTabClick () {},
    tab: v4(),
    selectedTab: v4(),
    children: []
  }

  shouldComponentUpdate (props) {
    return (
      props.children !== this.props.children ||
      props.tab !== this.props.tab ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  handleClick = () => {
    const { tab, onTabClick } = this.props

    onTabClick(tab)
  }

  render () {
    const {
      tab,
      selectedTab,
      children
    } = this.props

    const className = (tab === selectedTab)
      ? 'tab selected'
      : 'tab'

    return (
      <li className={className} onClick={this.handleClick}>
        {children}
      </li>
    )
  }
}

Tab.propTypes = {
  onTabClick: PropTypes.func,
  tab: PropTypes.string,
  selectedTab: PropTypes.string,
  children: PropTypes.any
}
