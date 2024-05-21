import { loginRequest, userRequest } from "../api/auth";
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { useForm } from "react-hook-form"; 

function LoginPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  const setUser = useAuthStore(state => state.setUser);
  const [alert, setAlert] = useState(null);

  const { handleSubmit, register } = useForm();

  const onData = async ({ email, password }) => {
    try {
      const resLogin = await loginRequest(email, password);
      setToken(resLogin.data.token);
      const resUser = await userRequest(resLogin.data.user.id);
      setUser(resUser.data);
      setTimeout(function(){navigate('/task')}, 1500);
    } catch (error) {
      setAlert({ message: 'El usuario o contraseña son incorrectos', type: 'red' });    
      // setTimeout(function(){navigate('/')},1500)  
      return error;
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesion
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onData)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  autoComplete="current-password"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Aun no tienes cuenta?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Registrate
            </a>
          </p>
          {alert && <Alert message={alert.message} type={alert.type} />}
        </div>
        
      </div> 
  );
}

export default LoginPage;
