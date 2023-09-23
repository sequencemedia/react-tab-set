import React, {
  Children,
  cloneElement
} from 'react'

import isTab from './is-tab.mts'

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
          {
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

export default function TabGroup (props: TabGroupProps): JSX.Element {
  const {
    children,
    selectedTab,
    onTabSelect
  } = props

  return (
    <ul className='tab-group'>
      {mapChildren(children, selectedTab, onTabSelect)}
    </ul>
  )
}
