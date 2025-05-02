import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  facilities: string[];
  adultCount: number;
  childCount: number;
  pricePerNight: number;
  starRating: number;
  imageURLs: string[]; // Array of strings for existing image URLs
  imageFiles: FileList;
};
const ManageHotelForm = () => {
  const formMethod = useForm<HotelFormData>();
  const { handleSubmit } = formMethod;

  const onSubmit = (data: HotelFormData) => {
    console.log(data);
  };
  return (
    <FormProvider {...formMethod}>
      <form
        className="flex flex-col gap-10"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
