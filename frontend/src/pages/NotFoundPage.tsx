import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-gray-900">404</h1>

        <div className="mx-auto my-6 h-1.5 w-12 bg-indigo-500"></div>

        <h2 className="mb-4 text-3xl font-bold text-gray-900">Page Not Found</h2>

        <p className="mb-8 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg bg-gray-800 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
