import { SyntheticEvent, useState } from 'react';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-64 sm:w-80">
          <img
            src="https://via.placeholder.com/200"
            alt="Placeholder Image"
            width="200"
            height="200"
            className="mx-auto"
          />
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
