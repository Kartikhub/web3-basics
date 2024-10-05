import { useState } from 'react'
import './App.css'
import { fetchSwapQuote } from './apis/quote'

function App() {

  return (
    <>
      <div>
        <button onClick={fetchSwapQuote}>
          Swap Quote
        </button>
      </div>
    </>
  )
}

export default App
