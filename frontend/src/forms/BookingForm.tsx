import React from "react";
import { UserType } from "../shared/types";

type Props = {
  currentUser: UserType;
};

const BookingForm = ({ currentUser }: Props) => {
  console.log(currentUser);

  return <div>BookingForm</div>;
};

export default BookingForm;
