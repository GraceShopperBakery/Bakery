import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {
  BrowserRouter as Router,
  Link,
  BrowserRouter,
  Route
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes />
      </div>
    </Router>
  )
}

export default App
