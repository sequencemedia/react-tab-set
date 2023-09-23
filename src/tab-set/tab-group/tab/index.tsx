import React, { Component } from 'react'
import {
  v4
} from 'uuid'

export interface TabProps {
  onTabSelect: (tab: string) => void
  children: JSX.Element | JSX.Element[] | string | number | boolean
  tab: string
  selectedTab: string
}

export default class Tab extends Component<TabProps> {
  /*
   *  The tab and selected tab defaults do not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    onTabSelect () {},
    tab: v4(),
    selectedTab: v4(),
    children: []
  }

  shouldComponentUpdate (props: TabProps): boolean {
    return (
      props.children !== this.props.children ||
      props.tab !== this.props.tab ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  handleClick = (): void => {
    const { tab, onTabSelect } = this.props

    onTabSelect(tab)
  }

  render (): JSX.Element {
    const {
      tab,
      selectedTab,
      children
    } = this.props

    const className = (tab === selectedTab)
      ? 'tab selected'
      : 'tab'

    return (
      <li className={className} onClick={this.handleClick}>
        {children}
      </li>
    )
  }
}
