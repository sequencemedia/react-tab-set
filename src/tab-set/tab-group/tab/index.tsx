import type {
  JSX
} from 'react'
import React, {
  useCallback
} from 'react'
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

  const handleClick = useCallback(function onClick (): void {
    onTabSelect(tab)
  }, [tab])

  return (
    <li
      className={className}
      onClick={handleClick}>
      {children}
    </li>
  )
}

Tab.defaultProps = {
  selectedTab: v4(),
  onTabSelect () { }
}
