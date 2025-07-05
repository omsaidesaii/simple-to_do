import React from 'react'
import Todo from './components/Todo'

const App = () => {
  return (
    <div className="min-h-screen py-8 bg-[#414142]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#002765] text-center mb-8"></h1>
        <Todo />
      </div>
    </div>
  )
}

export default App
