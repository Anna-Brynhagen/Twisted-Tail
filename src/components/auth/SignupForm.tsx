import { SignupData } from '../../types/User.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface SignupFormProps {
  handleSignup: SubmitHandler<SignupData>;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSignup }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignupData>();

  const passwordRef = useRef('');
  passwordRef.current = watch('password');

  const onSignup: SubmitHandler<SignupData> = async (data) => {
    setIsSubmitting(true);
    await handleSignup(data);
    setIsSubmitting(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSignup)} className="mt-4">
        <Form.Group controlId="email" className="mt-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="mt-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === passwordRef.current || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <div className="text-center mt-4">
          <Button
            type="submit"
            className="form-button btn btn-primary mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
