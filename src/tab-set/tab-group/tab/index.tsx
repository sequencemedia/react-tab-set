import React, { Component } from 'react'
import {
  v4
} from 'uuid'

interface TabProps {
  onTabClick: (tab: string) => void
  children: JSX.Element | JSX.Element[]
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
    onTabClick: () => {},
    children: [],
    tab: v4(),
    selectedTab: v4()
  }

  shouldComponentUpdate (props: TabProps): boolean {
    return (
      props.children !== this.props.children ||
      props.tab !== this.props.tab ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  handleClick = (): void => {
    const { tab, onTabClick } = this.props

    onTabClick(tab)
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
