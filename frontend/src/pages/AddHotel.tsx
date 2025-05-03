import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { addHotel } from "../api-clients";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: addHotel,
    onSuccess: async () => {
      showToast({
        message: "Holet added",
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: "Error creating new hotel",
        type: "ERROR",
      });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <div>
      <ManageHotelForm isPending={isPending} onSave={handleSave} />
    </div>
  );
};

export default AddHotel;
