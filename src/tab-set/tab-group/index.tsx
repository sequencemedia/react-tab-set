import type {
  JSX
} from 'react'
import React, {
  Children,
  cloneElement
} from 'react'
import {
  v4
} from 'uuid'
import debug from 'debug'

import isTab from './is-tab.mts'

const log = debug('react-tab-set/tab-set/tab-group')

export interface TabGroupProps {
  children: JSX.Element | JSX.Element[]
  selectedTab: string
  onTabSelect: (value: React.SetStateAction<string>) => void
}

function mapChildren (
  children: JSX.Element | JSX.Element[],
  selectedTab: string,
  onTabSelect: (value: React.SetStateAction<string>) => void
): JSX.Element[] {
  return Children.map(children, (child) => {
    const { type } = child

    if (type) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      const { props } = child

      if (isTab(type)) {
        return cloneElement(
          child,
          { // eslint-disable-line @typescript-eslint/no-unsafe-argument
            ...props,
            selectedTab,
            onTabSelect
          }
        )
      }

      const {
        children
      } = props

      if (children) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
        return cloneElement(
          child,
          { // eslint-disable-line @typescript-eslint/no-unsafe-argument
            ...props,
            children: mapChildren(children, selectedTab, onTabSelect) // eslint-disable-line @typescript-eslint/no-unsafe-argument
          }
        )
      }
    }

    return child
  })
}

function DEFAULT_HANDLE_TAB_SELECT (value: React.SetStateAction<string>): void {
  log(value)
}

export default function TabGroup (props: TabGroupProps): JSX.Element {
  const {
    children,
    selectedTab = v4(),
    onTabSelect = DEFAULT_HANDLE_TAB_SELECT
  } = props

  return (
    <ul className='tab-group'>
      {mapChildren(children, selectedTab, onTabSelect)}
    </ul>
  )
}
