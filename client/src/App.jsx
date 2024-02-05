import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <input type="text" placeholder='email' id='email'/>
      <input type="text" placeholder='password' id='password'/>
      <button id='loginBtn'>login</button>


      <input type="text" placeholder='firstName' id='newFirstName'/>
      <input type="text" placeholder='lastName' id='newLastName'/>
      <input type="text" placeholder='email' id='newEmail'/>
      <input type="text" placeholder='password' id='newPassword'/>
      <button id='signUpBtn'>sign up</button>
    </>
  )
}

export default App
