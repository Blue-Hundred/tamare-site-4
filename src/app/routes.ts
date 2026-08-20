import { createBrowserRouter } from 'react-router'
import Root from './Root'
import Home from '../pages/Home'
import About from '../pages/About'
import Meridian from '../pages/Meridian'
import BathBodyWorks from '../pages/BathBodyWorks'
import ApplePay from '../pages/ApplePay'
import FamilyBanking from '../pages/FamilyBanking'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'work/databases', Component: Meridian },
      { path: 'work/Buy-Online-Pickup-in-Store', Component: BathBodyWorks },
      { path: 'work/applepay', Component: ApplePay },
      { path: 'work/family-banking', Component: FamilyBanking },
    ],
  },
])
