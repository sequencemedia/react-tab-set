import Tab from './tab'

export default function isTab (component: any): component is Tab {
  return component === Tab
}
