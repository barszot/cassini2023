import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Content from './Content'
import help_types from './help_types.json'

function App() {
  return (
    <>
      <Content prop={help_types}/>
    </>
  )
}

export default App
