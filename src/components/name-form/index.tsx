// components/NameForm.tsx
"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full sm:w-auto max-w-screen flex-col items-center justify-center fixed bottom-0 left-0 sm:static sm:flex-wrap pb-1 pr-1 sm:p-0 sm:m-0 transition-all duration-300"
    >
      <div className="flex items-center justify-center space-x-1 space-y-1 w-full">
        <label htmlFor="name"></label>
        <input
          placeholder="Enter name"
          id="name"
          className="mt-1 block w-full sm:w-[400px] sm:max-w-[80vw] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 30,
              message: "Name must be no more than 30 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name can only contain alphabets and spaces",
            },
          })}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          {isSubmitting && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
          {!isSubmitting && <>Go</>}
        </button>
      </div>
      {errors.name && (
        <p className="mt-2 text-sm text-red-600 transition-all">
          {errors.name.message}
        </p>
      )}
    </form>
  );
};

export default NameForm;
