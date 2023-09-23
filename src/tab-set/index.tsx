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

const error = debug('react-tab-set/tab-set')

export interface TabSetProps {
  children: JSX.Element | JSX.Element[]
  selectedTab: string
  onChange: (selectedTab: string) => void
}

function mapChildren (
  children: JSX.Element | JSX.Element[],
  selectedTab: string,
  onTabSelect: (value: React.SetStateAction<string>) => void): JSX.Element[] {
  return Children.map(children, (child) => {
    const { type } = child

    if (type) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      const { props } = child

      if (isTabGroup(type)) {
        return cloneElement(
          child,
          {
            ...props,
            selectedTab,
            onTabSelect
          }
        )
      }

      if (isTabPanel(type)) {
        return cloneElement(
          child,
          {
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
          {
            ...props,
            children: mapChildren(children, selectedTab, onTabSelect)
          }
        )
      }
    }

    return child
  })
}

export default function TabSet (props: TabSetProps): JSX.Element {
  const {
    children,
    selectedTab: tab
  } = props

  const [selectedTab, setSelectedTab] = useState(tab)

  useEffect(() => { setSelectedTab(tab) }, [tab])

  useEffect(() => {
    const { onChange } = props

    try {
      onChange(selectedTab)
    } catch {
      error('Error `onChange`')
    }
  }, [selectedTab])

  return (
    <div className='selectedTab-set'>
      {mapChildren(children, selectedTab, setSelectedTab)}
    </div>
  )
}

TabSet.defaultProps = {
  selectedTab: v4()
}
