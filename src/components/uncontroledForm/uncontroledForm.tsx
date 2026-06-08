import { useRef, useState } from 'react';
import { formSchemaWithPasswords } from '../../services/form.schema';
import { countries } from '../../store/countries';
import type { Submission } from '../../types/types';
import './uncontroledForm.css';

type Props = {
  onSubmit: (data: Submission) => void;
};

export const UncontrolledForm = ({ onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const file = fd.get('image') as File;

    const rawData = {
      name: String(fd.get('name')),
      age: Number(fd.get('age')),
      email: String(fd.get('email')),
      gender: fd.get('gender') as Submission['gender'],
      country: String(fd.get('country')),
      acceptedTerms: fd.get('acceptedTerms') === 'on',
      password: String(fd.get('password')),
      confirmPassword: String(fd.get('confirmPassword')),
      imageBase64: '',
      createdAt: Date.now(),
    };

    let imageBase64 = '';

    if (file && file.size > 0) {
      imageBase64 = await convertToBase64(file);
    }

    const parsed = formSchemaWithPasswords.safeParse({
      ...rawData,
      imageBase64,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (key) {
          fieldErrors[key as string] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    const submission: Submission = {
      id: crypto.randomUUID(),
      ...parsed.data,
    };

    onSubmit(submission);

    formRef.current?.reset();
    setErrors({});
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" className="form-input" name="name" />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          className="form-input"
          name="age"
          type="number"
          min={0}
          step={1}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;

            target.value = target.value.replace(/[^0-9]/g, '');
          }}
        />
        {errors.age && <p className="form-error">{errors.age}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" className="form-input" name="email" />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" className="form-input">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" className="form-input">
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && <p className="form-error">{errors.country}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="form-input"
          name="password"
          type="password"
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          className="form-input"
          name="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && (
          <p className="form-error">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/png, image/jpeg"
        />
        {errors.imageBase64 && (
          <p className="form-error">{errors.imageBase64}</p>
        )}
      </div>

      <label className="form-checkbox">
        <input type="checkbox" name="acceptedTerms" />
        Accept Terms and Conditions
      </label>

      {errors.acceptedTerms && (
        <p className="form-error">{errors.acceptedTerms}</p>
      )}

      <button className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
};
