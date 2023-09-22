import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import {
  v4
} from 'uuid'

import isTab from './is-tab.mjs'

export default class TabGroup extends Component {
  /*
   *  The selected tab default does not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    onTabSelect () {},
    selectedTab: v4(),
    children: []
  }

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

TabGroup.propTypes = {
  onTabSelect: PropTypes.func,
  selectedTab: PropTypes.string,
  children: PropTypes.any
}
