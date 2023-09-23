import React, { Component, Children, cloneElement } from 'react'
import {
  v4
} from 'uuid'

import isTab from './is-tab.mts'

export interface TabGroupProps {
  onTabSelect: (selectedTab: string) => void
  children: JSX.Element | JSX.Element[]
  selectedTab: string
}

export default class TabGroup extends Component<TabGroupProps> {
  /*
   *  The selected tab default does not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    onTabSelect: () => {},
    selectedTab: v4(),
    children: []
  }

  shouldComponentUpdate (props: TabGroupProps): boolean {
    return (
      props.children !== this.props.children ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  handleTabClick = (tab: string): void => {
    const { onTabSelect } = this.props

    onTabSelect(tab)
  }

  mapChildren (children: JSX.Element | JSX.Element[], selectedTab: string): JSX.Element[] {
    return Children.map(children, (child) => {
      const { type } = child

      if (type) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
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
      children,
      selectedTab
    } = this.props

    return this.mapChildren(children, selectedTab)
  }

  render (): JSX.Element {
    return (
      <ul className='tab-group'>
        {this.getChildren()}
      </ul>
    )
  }
}
