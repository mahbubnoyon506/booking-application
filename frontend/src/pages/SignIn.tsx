import { useForm } from "react-hook-form";

export type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const onSubmit = (data: SignInFormValues) => {
    console.log(data);
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
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};

export default SignIn;
