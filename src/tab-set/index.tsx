import React, { Component, Children, cloneElement } from 'react'
import {
  v4
} from 'uuid'

import isTabPanel from './is-tab-panel'
import isTabGroup from './is-tab-group'

export interface TabSetProps {
  onChange: (selectedTab: string) => void
  selectedTab: string
  children: JSX.Element | JSX.Element[]
}

export default class TabSet extends Component<TabSetProps> {
  /*
   *  The selected tab default does not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    onChange: () => {},
    selectedTab: v4(),
    children: []
  }

  shouldComponentUpdate (props: TabSetProps): boolean {
    return (
      props.children !== this.props.children ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  handleTabSelect = (selectedTab: string): void => {
    if (selectedTab !== this.props.selectedTab) {
      const { onChange } = this.props

      this.setState({ selectedTab })

      onChange(selectedTab)
    }
  }

  mapChildren (children: JSX.Element | JSX.Element[], selectedTab: string): JSX.Element[] {
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

  getChildren (): JSX.Element[] {
    const {
      children,
      selectedTab
    } = this.props

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
