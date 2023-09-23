import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import {
  v4
} from 'uuid'
import debug from 'debug'

import isTabPanel from './is-tab-panel.mjs'
import isTabGroup from './is-tab-group.mjs'

const error = debug('react-tab-set')

export default class TabSet extends Component {
  state = {
    selectedTab: this.props.selectedTab
  }

  /*
   *  The selected tab default does not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    onClick () {},
    onChange () {},
    selectedTab: v4(),
    children: []
  }

  static getDerivedStateFromProps ({ selectedTab }) {
    return {
      selectedTab
    }
  }

  shouldComponentUpdate (props, state) {
    return (
      props.children !== this.props.children ||
      state.selectedTab !== this.state.selectedTab
    )
  }

  handleTabSelect = (selectedTab) => {
    const { onClick } = this.props

    try {
      onClick(selectedTab)
    } catch {
      error('Error `onClick`')
    }

    if (selectedTab !== this.state.selectedTab) {
      this.setState({ selectedTab }, () => {
        const { onChange } = this.props

        try {
          onChange(selectedTab)
        } catch {
          error('Error `onChange`')
        }
      })
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
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  selectedTab: PropTypes.string,
  children: PropTypes.any
}
