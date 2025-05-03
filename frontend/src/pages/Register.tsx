import { useForm } from "react-hook-form";
import { handleRegister } from "../api-clients";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: handleRegister,
    onSuccess: async () => {
      showToast({
        message: "Registration successful!",
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

  const onSubmit = async (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold">Create an account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label
            className="text-gray-700 text-sm font-bold flex-1"
            htmlFor="firstName"
          >
            First Name
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("firstName", { required: "Firstname is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label
            className="text-gray-700 text-sm font-bold flex-1"
            htmlFor="lastName"
          >
            Last Name
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastName", { required: "Lastname is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="email"
        >
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </label>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="confirmPassword"
        >
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              validate: (value: string) => {
                if (!value) {
                  return "Confirm Password is required";
                } else if (value !== watch("password")) {
                  return "Passwords do not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 underline">
              Sign In
            </Link>
          </span>
          <button
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 transition duration-300 ease-in-out"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </span>
      </form>
    </div>
  );
};

export default Register;
