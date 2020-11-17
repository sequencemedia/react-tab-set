import React, { Component } from 'react'
import {
  v4
} from 'uuid'

interface TabPanelProps {
  children: JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
  tab: string
  selectedTab: string
  render: () => JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
}

export default class TabPanel extends Component<TabPanelProps> {
  /*
   *  The tab and selected tab defaults do not have to be a uuid, but a uuid
   *  reduces the likelihood that this default has the same value as
   *  an implemented tab
   */
  static defaultProps = {
    tab: v4(),
    selectedTab: v4()
  }

  shouldComponentUpdate (props: TabPanelProps): boolean {
    if (props.render instanceof Function) return true

    return (
      props.children !== this.props.children ||
      props.tab !== this.props.tab ||
      props.selectedTab !== this.props.selectedTab
    )
  }

  renderPanel (): JSX.Element | null {
    const {
      render,
      children = render()
    } = this.props

    if (children) {
      return (
        <div className='tab-panel'>
          {children}
        </div>
      )
    }

    return null
  }

  render (): JSX.Element | null {
    const {
      tab,
      selectedTab
    } = this.props

    if (tab === selectedTab) {
      return this.renderPanel()
    }

    return null
  }
}
