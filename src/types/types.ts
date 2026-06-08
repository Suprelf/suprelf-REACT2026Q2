export type Gender = 'male' | 'female';

export type Submission = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: Gender;
  country: string;
  acceptedTerms: boolean;
  password: string;
  imageBase64: string;
  createdAt: number;
};

export type FormStore = {
  submissions: Submission[];
  countries: string[];

  newSubmissionId: string | null;

  addSubmission: (submission: Submission) => void;
  setNewSubmissionId: (id: string | null) => void;
};

export type PasswordStrength = {
  score: number;
  label: 'Weak' | 'Medium' | 'Strong' | 'Very strong';
};

export type SubmissionInput = Omit<Submission, 'id'>;