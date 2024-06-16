import { useNavigate } from 'react-router-dom';

const NoDataFound = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">No Results Found</h1>
                <p className="text-lg mb-8">We couldn't find any data matching your search.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default NoDataFound;
