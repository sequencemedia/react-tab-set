import React from 'react'
import {
  v4
} from 'uuid'

export interface TabProps {
  children: JSX.Element | JSX.Element[] | string | number | boolean
  tab: string
  selectedTab: string
  onTabSelect: (value: React.SetStateAction<string>) => void
}

export default function Tab (props: TabProps): JSX.Element {
  const {
    children,
    tab,
    selectedTab,
    onTabSelect
  } = props

  const className = (tab === selectedTab)
    ? 'tab selected'
    : 'tab'

  return (
    <li
      className={className}
      onClick={(): void => {
        onTabSelect(tab)
      }}>
      {children}
    </li>
  )
}

Tab.defaultProps = {
  selectedTab: v4(),
  onTabSelect () { }
}
