import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-5">
      <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          placeholder="Type name"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-5">
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="city"
        >
          City
          <input
            type="text"
            id="city"
            placeholder="Type city"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 text-xs">{errors.city.message}</span>
          )}
        </label>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="country"
        >
          Country
          <input
            type="text"
            id="country"
            placeholder="Type country"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 text-xs">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label
        className="text-gray-700 text-sm font-bold flex-1"
        htmlFor="description"
      >
        Description
        <textarea
          rows={5}
          id="description"
          placeholder="Type description"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-5">
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="pricePerNight"
        >
          Price per night
          <input
            type="number"
            id="pricePerNight"
            placeholder="Type price per night"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500 text-xs">
              {errors.pricePerNight.message}
            </span>
          )}
        </label>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="starRating"
        >
          Star rating
          <select
            className="border rounded w-full p-2 text-gray-700"
            id="starRating"
            {...register("starRating", { required: "This field is required" })}
          >
            <option value="" className="text-sm text-gray-400">
              Select as rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 text-xs">
              {errors.starRating.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
