import type {
  JSX
} from 'react'

import Tab from './tab/index.tsx'

export default function isTab (component: JSX.Element['type']): boolean {
  return component === Tab
}
