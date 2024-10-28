// import { useState } from "react";
// import "./App.css";
// import stevePic from "./assets/steve.png";

// export const App = () => {
//   const [userInput, setUserInput] = useState(""); //declare a state variable for user input

//   return (
//     <div className="app-container">
//       <div className="app-heading">
//         <div className="app-heading-circle">
//           <img className="app-logo" src={stevePic} alt="Good job Steve" />
//         </div>
//         <h1 className="app-heading-text">Chuckles Checklist</h1>
//       </div>
//       <div className="joke-add-form">
//         <input
//           className="joke-input"
//           type="text"
//           placeholder="New One Liner"
//           value={userInput}
//           onChange={(event) => {
//             setUserInput(event.target.value); //update the state with user input
//             console.log(event);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import "./App.css";
import {
  deleteJoke,
  getAllJokes,
  postNewJoke,
  updateJoke,
} from "./services/jokeServices";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [userInput, setUserInput] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesArr) => {
      setAllJokes(jokesArr);
    });
  }, []);

  useEffect(() => {
    console.log(allJokes);
    const untold = allJokes.filter((joke) => !joke.told);
    const told = allJokes.filter((joke) => joke.told);
    setUntoldJokes(untold);
    setToldJokes(told);
  }, [allJokes]);

  const toggleJokeStatus = (jokeToEdit) => {
    const editedJoke = {
      id: jokeToEdit.id,
      text: jokeToEdit.text,
      told: !jokeToEdit.told,
    };

    updateJoke(editedJoke).then(() => {
      getAllJokes().then((jokesArr) => {
        setAllJokes(jokesArr);
      });
    });
  };

  const storeAllJokesInState = () => {
    getAllJokes().then((jokesArr) => {
      setAllJokes(jokesArr);
    });
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={userInput}
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
        ></input>
        <button
          className="joke-input-submit"
          onClick={(event) => {
            postNewJoke(userInput).then(() => {
              getAllJokes().then((jokesArr) => setAllJokes(jokesArr));
            });
            setUserInput("");
          }}
        >
          Save Joke
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold Jokes
            <span className="untold-count">({untoldJokes.length})</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <button
                  className="joke-list-action-toggle"
                  onClick={() => toggleJokeStatus(joke)}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
                <button
                  className="joke-list-action-delete"
                  onClick={() => {
                    deleteJoke(joke.id).then(() => {
                      storeAllJokesInState();
                    });
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>
            Told Jokes
            <span className="told-count">({toldJokes.length})</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <button
                  className="joke-list-action-toggle"
                  onClick={() => toggleJokeStatus(joke)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  className="joke-list-action-delete"
                  onClick={() => {
                    deleteJoke(joke.id).then(() => {
                      storeAllJokesInState();
                    });
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
