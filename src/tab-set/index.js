import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import isTabPanel from './is-tab-panel'
import isTabGroup from './is-tab-group'

export default class TabSet extends Component {
  shouldComponentUpdate (props) {
    return (
      props.children !== this.props.children ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  handleTabSelect = (selectedTab) => {
    if (selectedTab !== this.props.selectedTab) {
      const { onChange } = this.props

      this.setState({ selectedTab })

      onChange(selectedTab)
    }
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
      children,
      selectedTab
    } = this.props

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

TabSet.defaultProps = {
  onChange: () => {},
  selectedTab: uuid.v4(),
  children: []
}

TabSet.propTypes = {
  onChange: PropTypes.func,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
