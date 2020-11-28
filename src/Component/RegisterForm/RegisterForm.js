import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import "./RegisterForm.css";
import Logo from "../../Image/logos/Group 1329.png";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const RegisterForm = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const { id } = useParams();
  const location = useHistory();

  useEffect(() => {
    setUser({ ...loggedInUser, id });
    fetch("https://sufian111.github.io/Demo_Server_Repo/v-showcategory.json")
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
      });
  }, []);

  const [CardData, setCardData] = useState();
  const [date, setDate] = useState(new Date("10/10/2020").toDateString());
  const [user, setUser] = useState({});
  const inputHendaler = (e) => {
    if (e.target.name === "displayName") {
      let displayName = e.target.value;
      setUser({ ...loggedInUser, displayName });
    }
    if (e.target.name === "email") {
      let email = e.target.value;
      setUser({ ...loggedInUser, email });
    }
    if (e.target.name === "description") {
      let description = e.target.value;
      setUser({ ...loggedInUser, description });
    }
    if (e.target.name === "id") {
      let id = e.target.value;
      setUser({ ...loggedInUser, id });
    }
  };

  const formHendaler = (e) => {
    e.preventDefault();
    e.target.reset();
    fetch("https://volunteer-network-123.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((value) => {
        location.push("/event");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div className="">
        <Link to="/">
          <img style={{ width: "50%" }} src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="form-signup">
        <form onSubmit={formHendaler} className="registerform">
          <TextField
            name="displayName"
            onBlur={inputHendaler}
            defaultValue={loggedInUser.name}
            label="Full Name"
            type="text"
          />
          <TextField
            name="email"
            onBlur={inputHendaler}
            defaultValue={loggedInUser.email}
            label="Email Address"
            type="email"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={date}
              onChange={(v) => {
                let date = v.toDateString();
                setDate(date);
                setUser({ ...loggedInUser, date });
              }}
              name="date"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            name="description"
            onBlur={inputHendaler}
            id="standard-basic"
            label="Description"
          />
          <FormControl>
            <Select
              value={user.id ? user.id : ""}
              onChange={inputHendaler}
              name="id"
              inputProps={{ "aria-label": "Without label" }}
            >
              {CardData &&
                CardData.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
