import { useState } from "react";
import { people } from "./people";

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordInProgress, setPasswordInProgress] = useState("");
  const [guesses, setGuesses] = useState(0);

  const makeGuess = (guess: string) => {
    setGuesses((curr) => curr + 1);
    setPassword(guess);
  };

  const match =
    people.filter((person) => person.password === password)[0] ?? undefined;

  return (
    <div className="flex min-h-full flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <p className="text-center text-3xl">🧑‍🎄</p>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Get your secret santa
        </h2>
      </div>

      {match && guesses < 3 && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <div className="bg-green-50 py-4 px-4 shadow rounded-lg  sm:px-10">
            <p className=" text-green-800">
              Congratulations {match.name}, you're buying a present for{" "}
              {match.match} 🎁
            </p>
          </div>
        </div>
      )}

      {guesses >= 3 && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <div className="bg-yellow-50 py-4 px-4 shadow rounded-lg  sm:px-10">
            <p className=" text-yellow-800">You've been naughty 🥵</p>
          </div>
        </div>
      )}

      {!match && password && guesses < 3 && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <div className="bg-red-50 py-4 px-4 shadow rounded-lg  sm:px-10">
            <p className=" text-red-800">You've put in the wrong password 😭</p>
          </div>
        </div>
      )}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPassword(passwordInProgress);
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="input"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="input"
                  name="input"
                  type="password"
                  required
                  autoComplete="off"
                  value={passwordInProgress}
                  onChange={(e) => setPasswordInProgress(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => makeGuess(passwordInProgress)}
                type="button"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Give me
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <p>People</p>
          <ul className="list-disc pl-6 pt-1">
            {people.map((p) => (
              <li className="text-sm" key={p.name}>
                <p>{p.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <p className="text-center">Kelly smells 🤕</p>
      </div>
    </div>
  );
};

export default App;
