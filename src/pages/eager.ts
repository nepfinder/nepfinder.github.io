import type { PageMap } from './types'
import About from './About'
import Services from './Services'
import ServiceDetail from './ServiceDetail'
import Solutions from './Solutions'
import Technologies from './Technologies'
import Products from './Products'
import ProductDetail from './ProductDetail'
import Projects from './Projects'
import ProjectDetail from './ProjectDetail'
import Contact from './Contact'
import NotFound from './NotFound'

/** Statically imported pages used by the prerender (SSR) build so full HTML is emitted. */
export const eagerPages: PageMap = {
  About,
  Services,
  ServiceDetail,
  Solutions,
  Technologies,
  Products,
  ProductDetail,
  Projects,
  ProjectDetail,
  Contact,
  NotFound,
}
