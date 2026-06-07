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

  addSubmission: (submission: Submission) => void;
};