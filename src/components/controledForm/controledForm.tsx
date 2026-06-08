import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formSchemaWithPasswords } from '../../services/form.schema';
import { countries } from '../../store/countries';
import type { Submission } from '../../types/types';

import { PasswordIndicator } from '../passwordIndicator/passwordIndicator';
import { Autocomplete } from '../autocomplete/autocomplete';
import { validateImageFile } from '../../services/imageValidation';

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
    watch,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaWithPasswords),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined as unknown as number,
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

  const passwordValue = watch('password');

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file);

    if (error) {
      setValue('imageBase64', '', { shouldValidate: true });
      setImagePreview('');
      await trigger('imageBase64');
      return;
    }

    const base64 = await convertToBase64(file);

    setValue('imageBase64', base64, { shouldValidate: true });
    setImagePreview(base64);

    await trigger('imageBase64');
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
        <label htmlFor="name">Name</label>
        <input id="name" className="form-input" {...register('name')} />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          className="form-input"
          min={0}
          step={1}
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && <p className="form-error">{errors.age.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" className="form-input" {...register('email')} />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select id="gender" className="form-input" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="form-error">{errors.gender.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>

        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <Autocomplete
              value={field.value}
              options={countries}
              onChange={field.onChange}
              name="country"
            />
          )}
        />

        {errors.country && (
          <p className="form-error">{errors.country.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-input"
          {...register('password')}
        />
        <PasswordIndicator value={passwordValue || ''} />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className="form-input"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="form-error">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          className="form-input"
          onChange={handleImage}
        />

        {imagePreview && <img src={imagePreview} alt="preview" width={80} />}

        {errors.imageBase64 && (
          <p className="form-error">{errors.imageBase64.message}</p>
        )}
      </div>

      <label htmlFor="acceptedTerms" className="form-checkbox">
        <input
          id="acceptedTerms"
          type="checkbox"
          {...register('acceptedTerms')}
        />
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
