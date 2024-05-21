import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../api/auth';
import Alert from '../components/Alert';
import { AxiosError } from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [alert, setAlert] = useState(null);

  const onData = async (data) => {
    try {
      const { name, email, password } = data;
      await registerRequest(name, email, password);
      setAlert({ message: 'Registration successful', type: 'green' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage = error.response.data.message || 'Error in request';
          setAlert({ message: errorMessage, type: 'red' });
          console.error('Server error:', errorMessage);
        }
      }
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Regístrese para obtener una cuenta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className='space-y-6' method="POST" onSubmit={handleSubmit(onData)}>
            <div className="relative">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
                <input
                  type="text"
                  {...register("name", { required: 'Please enter your name' })}
                  className="block mb-4 p-2 w-full rounded-md border-0 py-1.5 pl-7 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Jonh"
                />
              </label>
              {errors.name && <span className='mt-2 text-pink-600 text-sm'>{errors.name.message}</span>}

              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
                <input
                  type="email"
                  {...register("email", { required: 'Please enter your email' })}
                  className="block mb-4 p-2 w-full rounded-md border-0 py-1.5 pl-7 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="example@example.com"
                />
              </label>
              {errors.email && <span className='mt-2 text-pink-600 text-sm'>{errors.email.message}</span>}

              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
                <input
                  type="password"
                  maxLength={18}
                  minLength={8}
                  {...register("password", { required: 'Please enter your password' })}
                  className="block mb-4 p-2 w-full rounded-md border-0 py-1.5 pl-7 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Hola123@."
                />
              </label>
              {errors.password && <p className='mt-2 text-pink-600 text-sm'>{errors.password.message}</p>}
            </div>
            <button type='submit' className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Save
            </button>
            {alert && <Alert message={alert.message} type={alert.type} />}
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;