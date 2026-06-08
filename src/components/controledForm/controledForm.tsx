import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formSchemaWithPasswords } from '../../services/form.schema';
import { countries } from '../../store/countries';
import type { Submission } from '../../types/types';

import './controledForm.css';

type FormValues = {
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female';
  country: string;
  acceptedTerms: boolean;
  password: string;
  confirmPassword: string;
  imageBase64: string;
  createdAt: number;
};

type Props = {
  onSubmit: (data: Submission) => void;
};

export const ControlledForm = ({ onSubmit }: Props) => {
  const [imagePreview, setImagePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaWithPasswords),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      gender: 'male',
      country: '',
      acceptedTerms: false,
      password: '',
      confirmPassword: '',
      imageBase64: '',
      createdAt: Date.now(),
    },
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const base64 = await convertToBase64(file);

    setValue('imageBase64', base64, { shouldValidate: true });
    setImagePreview(base64);
  };

  const onSubmitForm = (data: FormValues) => {
    const submission: Submission = {
      id: crypto.randomUUID(),
      ...data,
    };

    onSubmit(submission);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="form">
      <h3>Controlled form</h3>

      <div className="form-group">
        <label>Name</label>
        <input className="form-input" {...register('name')} />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          className="form-input"
          {...register('age', { valueAsNumber: true })}
          min={0}
        />
        {errors.age && <p className="form-error">{errors.age.message}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input className="form-input" {...register('email')} />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select className="form-input" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="form-error">{errors.gender.message}</p>}
      </div>

      <div className="form-group">
        <label>Country</label>
        <select className="form-input" {...register('country')}>
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="form-error">{errors.country.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-input"
          {...register('password')}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="form-error">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="form-input"
          onChange={handleImage}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            width={80}
            style={{ marginTop: 8, borderRadius: 8 }}
          />
        )}

        {errors.imageBase64 && (
          <p className="form-error">{errors.imageBase64.message}</p>
        )}
      </div>

      <label className="form-checkbox">
        <input type="checkbox" {...register('acceptedTerms')} />
        Accept Terms and Conditions
      </label>

      {errors.acceptedTerms && (
        <p className="form-error">{errors.acceptedTerms.message}</p>
      )}

      <button className="form-button" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
