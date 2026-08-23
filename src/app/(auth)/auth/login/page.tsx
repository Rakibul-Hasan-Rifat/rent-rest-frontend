import { Button } from '@/components/ui/button';
import { HTMLAttributes } from 'react';
import { LoginForm } from './_components/login-form';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
    propertyTypeKey: {};
}

const LoginPage = ({ propertyTypeKey }: PageProps) => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    );
};

export default LoginPage;
