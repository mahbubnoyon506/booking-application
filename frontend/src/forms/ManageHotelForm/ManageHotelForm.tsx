import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../shared/types";
import { useEffect } from "react";

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
  imageURLs: string[];
  imageFiles: FileList;
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isPending: boolean;
};

const ManageHotelForm = ({ onSave, isPending, hotel }: Props) => {
  const formMethod = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethod;

  useEffect(() => {
    reset(hotel);
  }, [reset, hotel]);

  const onSubmit = (formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageURLs) {
      formDataJson.imageURLs.forEach((url, index) => {
        formData.append(`imageURLs[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
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
            className=" min-w-28 bg-blue-600 text-white text-md font-semibold px-4 py-2 hover:bg-blue-500 disabled:bg-gray-500"
            disabled={isPending}
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
