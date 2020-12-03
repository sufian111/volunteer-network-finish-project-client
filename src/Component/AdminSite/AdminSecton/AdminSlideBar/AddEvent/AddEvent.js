import React from "react";
import AddEventForm from "../../../AddEventForm/AddEventForm";
import AdminSlider from "../AdminSlider";

const AddEvent = () => {
  return (
    <>
      <AdminSlider title="Add Event"></AdminSlider>
      <AddEventForm></AddEventForm>
    </>
  );
};

export default AddEvent;
