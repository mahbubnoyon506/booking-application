import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/Appcontext";
import { Link, useNavigate } from "react-router-dom";
import { handleSignIn } from "../api-clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: handleSignIn,
    onSuccess: async () => {
      showToast({
        message: "Login successful!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      reset();
      navigate("/");
    },
    onError: () => {
      showToast({
        message: "An error occurred. Please try again.",
        type: "ERROR",
      });
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    mutate(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-4xl font-bold mb-4">Sign In</h1>

      <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </label>

      <label
        className="text-gray-700 text-sm font-bold flex-1"
        htmlFor="password"
      >
        Password
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </label>

      <span className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-sm">
          Not Registered?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Create an account
          </Link>
        </span>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 transition duration-300 ease-in-out disabled:opacity-50"
        >
          {isPending ? "Loading..." : "Sign In"}
        </button>
      </span>
    </form>
  );
};

export default SignIn;
