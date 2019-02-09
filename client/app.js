import React from 'react'

import { Navbar, NavbarMobile } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <NavbarMobile />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
