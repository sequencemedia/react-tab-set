declare module 'react-tab-set' {
  import type {
    JSX
  } from 'react'

  import React, {
    Component
  } from 'react'

  export interface TabSetProps {
    children: JSX.Element | JSX.Element[]
    selectedTab: string
    onChange: (selectedTab: string) => void
  }

  export interface TabGroupProps {
    children: JSX.Element | JSX.Element[]
    selectedTab: string
    onTabSelect: (value: React.SetStateAction<string>) => void
  }

  export interface TabProps {
    children: JSX.Element | JSX.Element[] | string | number | boolean
    tab: string
    selectedTab: string
    onTabSelect: (value: React.SetStateAction<string>) => void
  }

  export interface TabPanelProps {
    children?: JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
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
