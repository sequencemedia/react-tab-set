import type {
  JSX
} from 'react'
import React, {
  Children,
  cloneElement,
  useState,
  useEffect
} from 'react'
import {
  v4
} from 'uuid'
import debug from 'debug'

import isTabPanel from './is-tab-panel.mts'
import isTabGroup from './is-tab-group.mts'

const log = debug('react-tab-set/tab-set')
const error = debug('react-tab-set/tab-set:error')

export interface TabSetProps {
  children: JSX.Element | JSX.Element[]
  selectedTab: string
  onChange: (selectedTab: string) => void
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

      if (isTabGroup(type)) {
        return cloneElement(
          child,
          { // eslint-disable-line @typescript-eslint/no-unsafe-argument
            ...props,
            selectedTab,
            onTabSelect
          }
        )
      }

      if (isTabPanel(type)) {
        return cloneElement(
          child,
          { // eslint-disable-line @typescript-eslint/no-unsafe-argument
            ...props,
            selectedTab
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

function DEFAULT_HANDLE_CHANGE (selectedTab: string): void {
  log(selectedTab)
}

export default function TabSet (props: TabSetProps): JSX.Element {
  const {
    children,
    selectedTab: tab = v4()
  } = props

  const [selectedTab, setSelectedTab] = useState(tab)

  useEffect(() => {
    if (selectedTab !== tab) {
      setSelectedTab(tab)
    }
  }, [tab])

  useEffect(() => {
    if (selectedTab !== tab) {
      const {
        onChange = DEFAULT_HANDLE_CHANGE
      } = props

      try {
        onChange(selectedTab)
      } catch {
        error('Error `onChange`')
      }
    }
  }, [selectedTab])

  return (
    <div className='selectedTab-set'>
      {mapChildren(children, selectedTab, setSelectedTab)}
    </div>
  )
}
