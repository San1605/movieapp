import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, setQuery } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState(query);
  const delay = 300;

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = () => {
    // Implement your search functionality here
    console.log('Searching for:', inputValue);
  };

  let timeoutId: NodeJS.Timeout;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setQuery(e.target.value);
    }, delay);
  };

  return (
    <div className={`bg-black flex justify-between items-center h-16 px-8 shadow-lg border-b border-gray-800 transition-all duration-300`}>
      <div className="flex items-center space-x-4">
        {location.pathname !== '/' && (
          <button
            title='button'
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300 focus:outline-none transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        )}
        <h1 className="text-2xl font-bold text-white tracking-wider">Cineplex</h1>
      </div>

      {location.pathname === '/' && (
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search movies..."
            className="py-2 px-4 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 rounded-l-full border-transparent"
            style={{ minWidth: '250px' }} // Adjusting input width
          />
          <button
            title='button'
            onClick={handleSearch}
            className="py-2 px-6 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 rounded-r-full transition duration-300 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
