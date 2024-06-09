import type {
  JSX
} from 'react'
import React, {
  useCallback
} from 'react'
import {
  v4
} from 'uuid'
import debug from 'debug'

const log = debug('react-tab-set/tab-set/tab-group/tab')

export interface TabProps {
  children: JSX.Element | JSX.Element[] | string | number | boolean
  tab: string
  selectedTab: string
  onTabSelect: (value: React.SetStateAction<string>) => void
}

function DEFAULT_HANDLE_TAB_SELECT (value: React.SetStateAction<string>): void {
  log(value)
}

export default function Tab (props: TabProps): JSX.Element {
  const {
    children,
    tab,
    selectedTab = v4(),
    onTabSelect = DEFAULT_HANDLE_TAB_SELECT
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
