// components/NameForm.tsx
"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  name: string;
};

interface NameFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const NameForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-center">
      <div className='flex items-center justify-center space-x-1 space-y-1 w-full flex-wrap'>
        <label htmlFor="name"></label>
        <input
          placeholder="Enter name"
          id="name"
          className="mt-1 block w-[400px] max-w-[80vw] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
            maxLength: {
              value: 30,
              message: 'Name must be no more than 30 characters',
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Name can only contain alphabets and spaces',
            },
          })}
        />
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Go
      </button>
      </div>
      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
    </form>
  );
};

export default NameForm;
