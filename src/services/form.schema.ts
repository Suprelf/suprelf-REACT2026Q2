import { z } from 'zod';
import { countries } from '../store/countries';

const emailSchema = z.string().refine((email) => {
  const parts = email.split('@');

  if (parts.length !== 2) return false;

  const [local, domain] = parts;

  if (!local || !domain) return false;
  if (!domain.includes('.')) return false;

  return true;
}, 'Invalid email format');

export const formSchema = z.object({
  name: z.string().refine((val) => {
    if (!val) return false;
    return val[0] === val[0].toUpperCase();
  }, 'Name must start with uppercase letter'),

  age: z.number().int().nonnegative('Age must be a non-negative number'),

  email: emailSchema,

  gender: z.enum(['male', 'female']),

  country: z.string().refine((val) => countries.includes(val), {
    message: 'Country must be selected from the list',
  }),

  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept Terms and Conditions',
  }),

  password: z.string().min(1, 'Password is required'),

  confirmPassword: z.string().min(1, 'Confirm password is required'),

  imageBase64: z.string().min(1, 'Image is required'),

  createdAt: z.number(),
});

export const formSchemaWithPasswords = formSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export type FormSchema = z.infer<typeof formSchemaWithPasswords>;
