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
import DateFnsUtils from "@date-io/date-fns";
import React, { useState } from "react";
import "./AddEventForm.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
  const [selectedDate, setSelectedDate] = useState(new Date("10-7-2020"));
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imageUrl: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      let image = e.target.files[0];
      let imageUrl = image && URL.createObjectURL(image);
      setFormData({ ...formData, image, imageUrl });
    }
    if (e.target.name === "title") {
      let title = e.target.value;
      setFormData({ ...formData, title });
    }
  };

  const formHendelar = (e) => {
    e.preventDefault();
    if (formData.image.name && formData.title) {
      const data = new FormData();
      data.append("file", formData.image);
      data.append("upload_preset", "myimage");

      setLoading(true);
      e.target.reset();
      fetch("https://api.cloudinary.com/v1_1/mehidi/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((v) => {
          const image = v.secure_url;
          const title = formData.title;
          fetch("https://volunteer-network-123.herokuapp.com/addcategory", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, image }),
          })
            .then((res) => res.json())
            .then((value) => {
              setFormData({
                title: "",
                image: "",
                imageUrl: "",
              });
              setLoading(false);
              alert(value.msg);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log("Error: ", err));
    } else {
      alert("input is required");
    }
  };
  return (
    <>
      <form className="addeventform" onSubmit={formHendelar}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel shrink htmlFor="event-title">
                Event Title
              </InputLabel>
              <BootstrapInput
                onBlur={handleInputChange}
                name="title"
                placeholder="Event Title"
                id="event-title"
                defaultValue={formData.title}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                name="date"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
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
                onBlur={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <TextField name="image" type="file" onChange={handleInputChange}></TextField> */}
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              className="uploadbtn"
            >
              Upload image
              <input
                accept="image/*"
                name="image"
                onChange={handleInputChange}
                style={{ opacity: "0", position: "absolute", height: "100%" }}
                type="file"
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            {formData.imageUrl && (
              <img
                className="uploadimage"
                src={formData.imageUrl}
                alt="upload"
              />
            )}
            {loading ? (
              <Button
                type="submit"
                mt={2}
                disabled
                variant="contained"
                color="primary"
              >
                Submit
                <CircularProgress />
              </Button>
            ) : (
              <Button type="submit" mt={2} variant="contained" color="primary">
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
