import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import isTab from './is-tab'

export default class TabGroup extends Component {
  shouldComponentUpdate (props) {
    return (
      props.children !== this.props.children ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  handleTabClick = (tab) => {
    const { onTabSelect } = this.props

    onTabSelect(tab)
  }

  mapChildren (children, selectedTab) {
    return Children.map(children, (child) => {
      const { type } = child

      if (type) {
        const { props } = child

        if (isTab(type)) {
          return cloneElement(
            child,
            {
              ...props,
              selectedTab,
              onTabClick: this.handleTabClick
            }
          )
        }

        const {
          children
        } = props

        if (children) {
          return cloneElement(
            child,
            {
              ...props,
              children: this.mapChildren(children, selectedTab)
            }
          )
        }
      }

      return child
    })
  }

  getChildren () {
    const {
      children,
      selectedTab
    } = this.props

    return this.mapChildren(children, selectedTab)
  }

  render () {
    return (
      <ul className='tab-group'>
        {this.getChildren()}
      </ul>
    )
  }
}

/*
 *  The tab and selected tab defaults don't have to be unique/a uuid, but using the 'uuid' package
 *  reduces the likelihood that they have the same value as an implemented tab
 */
TabGroup.defaultProps = {
  onTabSelect: () => {},
  children: [],
  selectedTab: uuid.v4()
}

TabGroup.propTypes = {
  onTabSelect: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  selectedTab: PropTypes.string.isRequired
}
