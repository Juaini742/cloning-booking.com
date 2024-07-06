import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success", type: "SUCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <section className="h-screen flex flex-col">
      <div className="bg-primary w-full h-20 flex items-center">
        <span className="text-2xl text-white font-bold tracking-tight pl-4">
          <Link to="/">CloneBooking.com</Link>
        </span>
      </div>
      <div className="flex-1 container pt-10">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 border-b border-black/25 pb-5"
        >
          <h2 className="text-3xl font-bold ">Create an Account</h2>
          <div className="flex flex-col md:flex-row gap-5">
            <label
              htmlFor="firstName"
              className="text-gray-700 text-sm font-bold flex-1"
            >
              First Name
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-bold"
                {...register("firstName", {
                  required: "This filed is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </label>
            <label
              htmlFor="lastName"
              className="text-gray-700 text-sm font-bold"
            >
              Last Name
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-bold"
                {...register("lastName", {
                  required: "This filed is required",
                })}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </label>
          </div>
          <label htmlFor="email" className="text-gray-700 text-sm font-bold">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-bold"
              {...register("email", { required: "This filed is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <label htmlFor="password" className="text-gray-700 text-sm font-bold">
            Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-bold"
              {...register("password", {
                required: "This filed is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
          <label
            htmlFor="confirmPassword"
            className="text-gray-700 text-sm font-bold"
          >
            Confirm Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-bold"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your password fo not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
          <span>
            <button
              type="submit"
              className="btn-primary px-5 py-2 text-xl rounded-md"
            >
              Create Account
            </button>
          </span>
        </form>
        <div className="text-center mt-5">
          <p>
            If you already have Account,{" "}
            <Link to="/sign-in" className="text-primary font-bold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
