import { FirebaseError } from 'firebase/app';
import { ForgotPasswordData } from '../types/User.types';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import useAuth from '../hooks/useAuth';

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordData>();
  const { resetPassword } = useAuth();

  const onResetPassword: SubmitHandler<ForgotPasswordData> = async (data) => {
    setIsSubmitting(true);

    try {
      await resetPassword(data.email);
      setResetPasswordSuccess(true);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found') {
          toast.error('No account found with this email address.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4 center-y">
      <Row>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
        >
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-3">
                Forgot Password?
              </Card.Title>
              {resetPasswordSuccess && (
                <Card.Text className="text-success text-center">
                  Check your email, We have sent you a link to reset your
                  password.
                </Card.Text>
              )}

              <Form onSubmit={handleSubmit(onResetPassword)} className="mt-4">
                <Form.Group controlId="email" className="mt-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    className="form-button btn-success mt-4"
                    type="submit"
                    variant="warning"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Loading...' : 'Send Reset Link'}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                <a href="/login">Back to login</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
