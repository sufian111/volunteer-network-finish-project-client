import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  withStyles,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import React, { useState } from "react";
import "./AddEventForm.css";

const AddEventForm = () => {
  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.common.white,
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
  }))(InputBase);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });

  const handleChange = (e) => {
    const newService = { ...formData };
    newService[e.target.name] = e.target.value;
    setFormData(newService);
  };

  const handleSubmit = () => {
    fetch("https://fathomless-tundra-56724.herokuapp.com/addService", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("add data");
      });

    console.log(formData);
  };

  return (
    <>
      <form className="addeventform">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel shrink htmlFor="event-title">
                Event Title
              </InputLabel>
              <BootstrapInput
                onBlur={handleChange}
                name="title"
                placeholder="Event Title"
                id="event-title"
                defaultValue={formData.title}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel shrink htmlFor="event-description">
                Description
              </InputLabel>
              <BootstrapInput
                multiline
                rows={4}
                placeholder="Event Description"
                id="event-description"
                name="description"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <TextField name="image" type="file" onChange={handleChange}></TextField> */}
            <InputLabel shrink htmlFor="event-title">
              Image URL
            </InputLabel>
            <BootstrapInput
              onBlur={handleChange}
              name="image"
              placeholder="Host your image in imagebb.com and drop the link"
              id="event-image"
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            {loading ? (
              <Button
                onClick={handleSubmit}
                mt={2}
                disabled
                variant="contained"
                color="primary"
              >
                Submit
                <CircularProgress />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                mt={2}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddEventForm;
