import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg mb-8">We can't seem to find the page you're looking for.</p>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default Error;
