import TabGroup from './tab-group/index.tsx'

export default function isTabGroup (component: any): component is TabGroup {
  return component === TabGroup
}
