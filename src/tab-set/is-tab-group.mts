import type {
  JSX
} from 'react'

import TabGroup from './tab-group/index.tsx'

export default function isTabGroup (component: JSX.Element['type']): boolean {
  return component === TabGroup
}
