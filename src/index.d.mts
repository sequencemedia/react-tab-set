declare module 'react-tab-set' {
  import { Component } from 'react'

  export interface TabSetProps {
    onChange: (selectedTab: string) => void
    selectedTab: string
    children: JSX.Element | JSX.Element[]
  }

  export interface TabGroupProps {
    onTabSelect: (selectedTab: string) => void
    children: JSX.Element | JSX.Element[]
    selectedTab: string
  }

  export interface TabProps {
    onTabClick: (tab: string) => void
    children: JSX.Element | JSX.Element[] | string | number | boolean
    tab: string
    selectedTab: string
  }

  export interface TabPanelProps {
    children: JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
    tab: string
    selectedTab: string
    render?: () => JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
  }

  export function isTabGroup (component: any): component is TabGroup
  export function isTab (component: any): component is Tab
  export function isTabPanel (component: any): component is TabPanel

  class TabSet extends Component<TabSetProps> {}

  export class TabGroup extends Component<TabGroupProps> {}
  export class Tab extends Component<TabProps> {}
  export class TabPanel extends Component<TabPanelProps> {}

  export default TabSet
}
