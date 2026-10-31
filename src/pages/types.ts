import type { ComponentType } from 'react'

export type PageName =
  | 'About'
  | 'Services'
  | 'ServiceDetail'
  | 'Solutions'
  | 'Technologies'
  | 'Products'
  | 'ProductDetail'
  | 'Projects'
  | 'ProjectDetail'
  | 'Contact'
  | 'AiImplementation'
  | 'NcafePrivacy'
  | 'DataDeletion'
  | 'NotFound'

export type PageMap = Record<PageName, ComponentType>
