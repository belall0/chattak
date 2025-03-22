import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiMessageCircle, FiUsers, FiVideo } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <Card className="w-full max-w-lg border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-3xl font-bold text-slate-800">Welcome to Chattak</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="pb-2 text-center text-slate-600">
            Connect with friends, family, and colleagues in real-time. Join channels, send messages, and stay in touch.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-3 py-4 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100">
              <FiMessageCircle className="mb-2 h-8 w-8 text-indigo-500" />
              <span className="text-sm font-medium text-slate-700">Messaging</span>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100">
              <FiUsers className="mb-2 h-8 w-8 text-indigo-500" />
              <span className="text-sm font-medium text-slate-700">Channels</span>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100">
              <FiVideo className="mb-2 h-8 w-8 text-indigo-500" />
              <span className="text-sm font-medium text-slate-700">Notifications</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Link
              to="/login"
              className="flex-1">
              <Button className="flex w-full cursor-pointer items-center justify-center bg-indigo-600 py-6 text-white hover:bg-indigo-700">
                <FiLogIn className="mr-2 h-5 w-5" /> <span>Log In</span>
              </Button>
            </Link>

            <Link
              to="/signup"
              className="flex-1">
              <Button
                variant="outline"
                className="flex w-full cursor-pointer items-center justify-center border-indigo-600 py-6 text-indigo-600 hover:bg-indigo-50">
                <FiUserPlus className="mr-2 h-5 w-5" /> <span>Sign Up</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 flex gap-x-2 text-sm text-slate-500">
        <span>Created with ❤️ by</span>
        <Link
          to="https://github.com/belall0"
          className="font-bold">
          Belal Muhammad
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
