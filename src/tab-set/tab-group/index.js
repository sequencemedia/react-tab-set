import React, { Children, cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import isTab from './is-tab'

export default class TabGroup extends Component {
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
 *  The selected tab default doesn't have to be unique/a uuid, but using the 'uuid' package reduces
 *  the likelihood that the default has the same value as a tab
 */
TabGroup.defaultProps = {
  onTabSelect: () => {},
  selectedTab: uuid.v4(),
  children: []
}

TabGroup.propTypes = {
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
