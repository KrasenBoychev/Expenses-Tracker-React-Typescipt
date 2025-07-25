import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegister } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import type {
  FormErrorsInterface,
  InitialValuesInterface,
} from "../../interfaces/authentication";
import validateAuthenticationForm from "./validateAuthenticationForm";

const initialValues = { email: "", password: "", rePass: "" };

export default function Register() {
  const register = useRegister();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormErrorsInterface>({});

  const registerHandler = async ({
    email,
    password,
    rePass,
  }: InitialValuesInterface) => {
    const allErrors = validateAuthenticationForm(email, password, rePass);

    if (Object.entries(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      await register(email, password);
      navigate("/");
    } catch (e: unknown) {
      if (e instanceof Error) {
        const errorList = JSON.parse(e.message);

        if (!Array.isArray(errorList)) {
          setErrors(errorList);
        } else {
          toast.error(errorList[0]);
        }
      }
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    registerHandler,
    setErrors
  );

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
          <p className="mt-2 text-sm text-gray-600">
            Have an account yet?
            <Link
              to="/login"
              className="ml-1 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-5">
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>

          {/* <!-- Form --> */}
          <form method="post" onSubmit={submitHandler}>
            <div className="grid gap-y-4 text-black">
              {/* <!-- Form Group --> */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="email-error"
                    value={values.email}
                    onChange={changeHandler}
                    data-testid="register-email-input"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p
                    className="text-xs text-red-600 mt-2"
                    id="email-error"
                    data-testid="register-email-error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              {/* <!-- End Form Group --> */}

              {/* <!-- Form Group --> */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="password-error"
                    value={values.password}
                    onChange={changeHandler}
                    data-testid="register-password-input"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <p
                    className="text-xs text-red-600 mt-2"
                    id="password-error"
                    data-testid="register-password-error"
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              {/* <!-- End Form Group --> */}

              {/* <!-- Form Group --> */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label htmlFor="rePass" className="block text-sm mb-2">
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="rePass"
                    name="rePass"
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="rePass-error"
                    value={values.rePass}
                    onChange={changeHandler}
                    data-testid="register-rePass-input"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {errors.rePass && (
                  <p
                    className="text-xs text-red-600 mt-2"
                    id="rePass-error"
                    data-testid="register-rePass-error"
                  >
                    {errors.rePass}
                  </p>
                )}
              </div>
              {/* <!-- End Form Group --> */}

              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                data-testid="register-form-button"
              >
                Sign up
              </button>
            </div>
          </form>
          {/* <!-- End Form --> */}
        </div>
      </div>
    </div>
  );
}
