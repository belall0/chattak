import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthFormWrapperProps {
  children: ReactNode;
  formTitle: string;
  formDescription: string;
  formType: 'login' | 'signup';
}

const AuthFormWrapper = ({ children, formTitle, formDescription, formType }: AuthFormWrapperProps) => {
  return (
    <Card className="w-[320px] sm:w-[400px] md:w-[500px]">
      <CardHeader className="space-y-2 p-6 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {formTitle}
        </CardTitle>

        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{formDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-3">
        {children}

        {formType === 'login' ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground"> Don't have an account?</span>
            <Link to="/auth/signup">
              <span className="text-indigo-600">Sign up</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground"> Already have an account?</span>
            <Link to="/auth/login">
              <span className="text-indigo-600">Log In</span>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthFormWrapper;
