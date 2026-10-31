import { lazy } from 'react'
import type { PageMap } from './types'

/** Code-split page components for the browser bundle. */
export const lazyPages: PageMap = {
  About: lazy(() => import('./About')),
  Services: lazy(() => import('./Services')),
  ServiceDetail: lazy(() => import('./ServiceDetail')),
  Solutions: lazy(() => import('./Solutions')),
  Technologies: lazy(() => import('./Technologies')),
  Products: lazy(() => import('./Products')),
  ProductDetail: lazy(() => import('./ProductDetail')),
  Projects: lazy(() => import('./Projects')),
  ProjectDetail: lazy(() => import('./ProjectDetail')),
  Contact: lazy(() => import('./Contact')),
  NotFound: lazy(() => import('./NotFound')),
}
