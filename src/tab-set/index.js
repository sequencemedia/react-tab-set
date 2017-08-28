import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

import isTabPanel from './is-tab-panel'
import isTabGroup from './is-tab-group'

export default class TabSet extends Component {
  constructor (props) {
    super(props)

    const {
      defaultTab: selectedTab
    } = props

    this.state = {
      selectedTab
    }
  }

  shouldComponentUpdate (props, state) {
    return (
      (props !== this.props) ||
      (state.selectedTab !== this.state.selectedTab)
    )
  }

  handleTabSelect = (selectedTab) => {
    this.setState({ selectedTab })
  }

  mapChildren (children, selectedTab) {
    return Children.map(children, (child) => {
      const { type } = child

      if (type) {
        const { props } = child

        if (isTabGroup(type)) {
          return cloneElement(
            child,
            {
              ...props,
              selectedTab,
              onTabSelect: this.handleTabSelect
            }
          )
        }

        if (isTabPanel(type)) {
          return cloneElement(
            child,
            {
              ...props,
              selectedTab
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
      children
    } = this.props

    const {
      selectedTab
    } = this.state

    return this.mapChildren(children, selectedTab)
  }

  render () {
    return (
      <div className='tab-set'>
        {this.getChildren()}
      </div>
    )
  }
}

TabSet.propTypes = {
  defaultTab: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    )
  ]).isRequired
}
