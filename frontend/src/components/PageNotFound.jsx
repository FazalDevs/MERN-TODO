import React from 'react'

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
            <h1 className="text-9xl font-bold text-gray-700">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Oops! Page not found</h2>
            <p className="mt-2 text-gray-600 text-center max-w-md">
                The page you're looking for doesn't exist or has been moved. Try going back home.
            </p>
            <a
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Go to Homepage
            </a>
        </div>
    )
}

export default PageNotFound