export const postNewJoke = async (theJoke) => {
  const response = await fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      text: theJoke,
      told: false,
    }),
  });
};

export const getAllJokes = () => {
  return fetch(`http://localhost:8088/jokes`).then((res) => res.json());
};

export const updateJoke = async (editedJoke) => {
  const response = await fetch(`http://localhost:8088/jokes/${editedJoke.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedJoke),
  });
};

export const deleteJoke = async (jokeId) => {
  const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
