import { createBrowserRouter } from 'react-router'
import Root from './Root'
import Home from '../pages/Home'
import About from '../pages/About'
import Meridian from '../pages/Meridian'
import BathBodyWorks from '../pages/BathBodyWorks'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'work/meridian', Component: Meridian },
      { path: 'work/bath-body-works', Component: BathBodyWorks },
    ],
  },
])
