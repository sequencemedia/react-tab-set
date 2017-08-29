import React, { Children, cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import isTab from './is-tab'

export default class TabGroup extends Component {
  shouldComponentUpdate (props) {
    return (
      props.selectedTab !== this.props.selectedTab ||
      props.children !== this.props.children
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
  selectedTab: uuid.v4(),
  children: []
}

TabGroup.propTypes = {
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
