import { useMutation } from "@tanstack/react-query";
import { fetchHotels } from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { mutate, isPending } = useMutation({
    mutationFn: fetchHotels,
    onSuccess: async () => {
      showToast({ message: "Hotels fetched", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error to get hotels", type: "ERROR" });
    },
  });
  useEffect(() => {
    mutate();
  }, []);

  return <div>MyHotels</div>;
};

export default MyHotels;
