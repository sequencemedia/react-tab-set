import type {
  JSX
} from 'react'
import React from 'react'
import {
  v4
} from 'uuid'

export interface TabPanelProps {
  children?: JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
  tab: string
  selectedTab: string
  render?: () => JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
}

function DEFAULT_RENDER (): null {
  return null
}

export default function TabPanel (props: TabPanelProps): JSX.Element | null {
  const {
    tab,
    selectedTab = v4()
  } = props

  if (tab === selectedTab) {
    const {
      render = DEFAULT_RENDER,
      children = render()
    } = props

    if (children) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions -- Truthiness is good, actually
      return (
        <div className='tab-panel'>
          {children}
        </div>
      )
    }
  }

  return null
}
