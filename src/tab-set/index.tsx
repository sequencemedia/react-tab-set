import React, { Component, Children, cloneElement } from 'react'
import {
  v4
} from 'uuid'
import debug from 'debug'

import isTabPanel from './is-tab-panel.mts'
import isTabGroup from './is-tab-group.mts'

const error = debug('react-tab-set/tab-set')

export interface TabSetProps {
  onClick: (selectedTab: string) => void
  onChange: (selectedTab: string) => void
  selectedTab: string
  children: JSX.Element | JSX.Element[]
}

export interface TabSetState {
  selectedTab: string
}

export default class TabSet extends Component<TabSetProps, TabSetState> {
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

  static getDerivedStateFromProps ({ selectedTab }: TabSetState): TabSetState {
    return {
      selectedTab
    }
  }

  shouldComponentUpdate (props: TabSetProps, state: TabSetState): boolean {
    return (
      props.children !== this.props.children ||
      state.selectedTab !== this.state.selectedTab
    )
  }

  handleTabSelect = (selectedTab: string): void => {
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

  mapChildren (children: JSX.Element | JSX.Element[], selectedTab: string): JSX.Element[] {
    return Children.map(children, (child) => {
      const { type } = child

      if (type) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
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

        if (children) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
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

  getChildren (): JSX.Element[] {
    const {
      children
    } = this.props

    const {
      selectedTab
    } = this.state

    return this.mapChildren(children, selectedTab)
  }

  render (): JSX.Element {
    return (
      <div className='tab-set'>
        {this.getChildren()}
      </div>
    )
  }
}
