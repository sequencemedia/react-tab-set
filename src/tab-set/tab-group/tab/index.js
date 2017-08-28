import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Tab extends Component {
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

Tab.defaultProps = {
  onTabClick: () => {}
}

Tab.propTypes = {
  onTabClick: PropTypes.func,
  tab: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    )
  ]).isRequired
}
