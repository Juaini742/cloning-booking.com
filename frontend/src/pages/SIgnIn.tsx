import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client";
import {useAppContext} from "../contexts/AppContext";
import {Link, useNavigate} from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

function SIgnIn() {
  const {showToast} = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({message: "Sign in successfully", type: "SUCESS"});
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({message: err.message, type: "ERROR"});
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label htmlFor="email" className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-bold"
          {...register("email", {required: "This filed is required"})}
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
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not registered?{" "}
          <Link className="text-red-500 underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
}
export default SIgnIn;
