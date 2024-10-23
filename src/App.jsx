import { useState } from "react"
import "./App.css"

export const App = () => {
  const [userInput, setUserInput] = useState("")

  return (
    <div class="app-container">
        <div class="app-heading">
          <h1 class="app-heading-text">
            Chuckle Checklist
          </h1>
        </div>
          <h2>Add Joke</h2>
        <div class="joke-add-form">
          <input 
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            onChange={(event) => {
              setUserInput(event.target.value)
            }}>
          </input>
        </div>
    </div>
  )
}
