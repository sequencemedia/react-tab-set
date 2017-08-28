import React, { Children, cloneElement, Component } from 'react'
import PropTypes from 'prop-types'

import {
  isTab
} from '~/'

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

TabGroup.defaultProps = {
  onTabSelect: () => {}
}

TabGroup.propTypes = {
  onTabSelect: PropTypes.func,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    )
  ]).isRequired
}
