import { FirebaseError } from 'firebase/app';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import useAuth from '../hooks/useAuth';
import { storage } from '../services/firebase';
import { UpdateProfileData } from '../types/User.types';

const UpdateProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const {
    currentUser,
    setPhotoUrl,
    setDisplayName,
    setPassword,
    userEmail,
    userName,
    userPhotoUrl,
    reloadUser,
  } = useAuth();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    defaultValues: {
      email: userEmail ?? '',
      name: userName ?? '',
    },
  });

  const passwordRef = useRef('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  passwordRef.current = watch('password');

  const onUpdateProfile: SubmitHandler<UpdateProfileData> = async (data) => {
    try {
      setIsSubmitting(true);

      if (selectedPhoto) {
        if (userPhotoUrl) {
          const oldPhotoRef = ref(storage, userPhotoUrl);
          await deleteObject(oldPhotoRef);
        }

        const photoRef = ref(
          storage,
          `usersPhotos/${currentUser?.uid}/${selectedPhoto.name}`
        );
        const uploadResult = await uploadBytes(photoRef, selectedPhoto);
        const photoUrl = await getDownloadURL(uploadResult.ref);
        await setPhotoUrl(photoUrl);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }

      if (data.name !== (userName ?? '')) {
        await setDisplayName(data.name);
      }

      if (data.password) {
        await setPassword(data.password);
      }

      reloadUser();
      toast.success('Profile updated successfully.');
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
      toast.info('Photo selected. Press "Update Profile" to save changes.');
    }
  };

  const handleDeletePhoto = async () => {
    if (!userPhotoUrl) {
      toast.error('No photo to delete.');
      return;
    }

    try {
      setIsSubmitting(true);
      const oldPhotoRef = ref(storage, userPhotoUrl);
      await deleteObject(oldPhotoRef);
      await setPhotoUrl('');
      setPreviewPhoto(null);
      reloadUser();

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success('Photo deleted successfully.');
    } catch (error) {
      console.error('Failed to delete photo:', error);
      toast.error('Error deleting photo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="py-3 center-y">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-lg">
            <Card.Body className="profile-card">
              <div className="text-center mb-2">
                <div className="profile-photo d-flex justify-content-center align-items-center mx-auto">
                  <Image
                    src={
                      previewPhoto
                        ? previewPhoto
                        : userPhotoUrl && userPhotoUrl.trim() !== ''
                          ? userPhotoUrl
                          : 'https://via.placeholder.com/150?text=Upload+Photo'
                    }
                    alt="User Photo"
                    fluid
                  />
                </div>
                {userPhotoUrl && (
                  <Button
                    onClick={handleDeletePhoto}
                    size="sm"
                    className="mt-3 btn btn-success"
                  >
                    Delete Photo
                  </Button>
                )}
              </div>
              <Form onSubmit={handleSubmit(onUpdateProfile)} className="px-3">
                <Form.Group controlId="name" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    {...register('name', {
                      minLength: {
                        value: 3,
                        message: 'Name must be at least 3 characters',
                      },
                    })}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="photoFiles" className="mb-4">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    ref={fileInputRef}
                    accept="image/gif, image/jpeg, image/png, image/webp"
                    type="file"
                    onChange={handlePhotoChange}
                  />
                  {errors.photoFiles && (
                    <p className="text-danger">
                      {errors.photoFiles.message || 'Invalid value'}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>Create New Password</Form.Label>
                  <Form.Control
                    placeholder="Enter your new password"
                    type="password"
                    {...register('password', {
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                {watch('password') && watch('password').length > 0 && (
                  <Form.Group controlId="confirmPassword" className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      placeholder="Confirm your new password"
                      type="password"
                      {...register('confirmPassword', {
                        validate: (value) =>
                          value === passwordRef.current ||
                          'Passwords do not match',
                      })}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="form-button btn btn-warning w-100"
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
