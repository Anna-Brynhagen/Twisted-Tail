export type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ViewUserData = {
  name: string;
  email: string;
  photo: string;
  highscores: [];
};

export type UpdateProfileData = {
  name: string;
  email: string;
  photoFiles: FileList;
  password: string;
  confirmPassword: string;
  highscore: [];
};

export type PlayerHighscore = {
  name: string;
  highestScore: number;
  photo?: string;
};
