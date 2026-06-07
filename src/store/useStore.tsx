import { create } from 'zustand';
import type { FormStore } from '../types/types';
import { countries } from './countries';

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  countries: countries,

  addSubmission: (submission) =>
    set((state) => ({
      submissions: [submission, ...state.submissions],
    })),
}));
