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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
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
            }
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NameForm;
