import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

export default class Tab extends Component {
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

/*
 *  The tab default doesn't have to be unique/a uuid, but using the 'uuid' package reduces the
 *  likelihood that the default has the same value as a tab. For instance, 'defaultTab' is a
 *  reasonable value, but it's so reasonable that someone implementing the package might name
 *  their default tab "defaultTab" but another one of their tabs is selected -- which might
 *  result in jank
 */
Tab.defaultProps = {
  onTabClick: () => {},
  children: [],
  tab: uuid.v4(),
  selectedTab: uuid.v4()
}

Tab.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  tab: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired
}
