import type {
  JSX
} from 'react'

import TabPanel from './tab-panel/index.tsx'

export default function isTabPanel (component: JSX.Element['type']): boolean {
  return component === TabPanel
}
