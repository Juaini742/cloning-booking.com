import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { RiLogoutCircleLine } from "react-icons/ri";

function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-zinc-700 gap-2 px-3 py-3 w-full hover:bg-zinc-200/55 trans-300"
    >
      <span className="text-2xl">
        <RiLogoutCircleLine />
      </span>
      Sign out
    </button>
  );
}
export default SignOutButton;
