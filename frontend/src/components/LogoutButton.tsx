import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/Appcontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleSignOut } from "../api-clients";

const LogoutButton = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleSignOut,
    onSuccess: async () => {
      showToast({
        message: "Logout successful!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: () => {
      showToast({
        message: "An error occurred. Please try again.",
        type: "ERROR",
      });
      console.log("Sign out failed");
    },
  });

  return (
    <button
      className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-200"
      onClick={() => mutate()}
      disabled={isPending}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
