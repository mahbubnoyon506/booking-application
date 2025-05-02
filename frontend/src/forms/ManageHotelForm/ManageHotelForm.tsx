import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";

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
  imageURLs: FileList;
};
const ManageHotelForm = () => {
  const formMethod = useForm<HotelFormData>();
  return (
    <FormProvider {...formMethod}>
      <form className="flex flex-col gap-10" action="">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
