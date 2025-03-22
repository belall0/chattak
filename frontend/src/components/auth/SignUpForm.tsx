import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { SignupFormData } from '@/lib/types/auth.type';
import { signupSchema } from '@/lib/schemas/auth.schema';

// UI Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthFormWrapper from '@/components/auth/AuthWrapper';
import FormStatus from '@/components/auth/FormStatus';

// Type Definitions for form fields
interface FormFieldConfig {
  name: keyof SignupFormData;
  label: string;
  type: string;
  placeholder: string;
}

// Form Fields
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Belal Muhammad',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'belal@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '********',
  },
];

const SignupForm = () => {
  const data = null; // to be used later for form status
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: SignupFormData) {
    console.log(values);
  }

  const renderFormFields = ({ name, type, label, placeholder }: FormFieldConfig, key: string) => (
    <FormField
      key={key}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              disabled={false}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // renderFormStatus to render the form status based on the response from the loginAction
  const renderFormStatus = () => {
    if (!data || data.message === undefined) return null;

    return (
      <FormStatus
        type={data.success ? 'success' : 'error'}
        message={data.message}
      />
    );
  };

  return (
    <AuthFormWrapper
      formTitle="Create Your Account"
      formDescription="Sign up to get started. It’s quick and secure."
      formType="signup">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          {formFields.map((field) => renderFormFields(field, field.name))}
          {renderFormStatus()}

          <Button
            type="submit"
            className="w-full"
            disabled={false}>
            Submit
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignupForm;
