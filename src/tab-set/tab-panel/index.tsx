import React from 'react'

export interface TabPanelProps {
  children?: JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
  tab: string
  selectedTab: string
  render?: () => JSX.Element | JSX.Element[] | string | number | boolean | undefined | null
}

export default function TabPanel (props: TabPanelProps): JSX.Element | null {
  const {
    tab,
    selectedTab
  } = props

  if (tab === selectedTab) {
    const {
      render = () => null,
      children = render()
    } = props

    if (children) { // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      return (
        <div className='tab-panel'>
          {children}
        </div>
      )
    }
  }

  return null
}
