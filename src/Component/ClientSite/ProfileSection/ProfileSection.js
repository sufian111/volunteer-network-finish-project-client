import { Button, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";

import NavBarClient from "../NavBarClient/NavBarClient";
import "./ProfileSection.css";

const ProfileSection = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch(
      "https://volunteer-network-123.herokuapp.com/registerperson/somrat177@gmail.com"
    )
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, []);

  const rowDeleted = (id) => {
    if (window.confirm("Are You Sure?")) {
      fetch("https://volunteer-network-123.herokuapp.com/userdelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => alert(data.msg));
    }
  };

  return (
    <div>
      <NavBarClient></NavBarClient>
      <Container className="bg">
        <Grid container spacing={3}>
          {event ? (
            event.length > 0 ? (
              event.map((v) => {
                return (
                  <Grid key={v._id} item xs={12} md={6}>
                    <div className="event-box">
                      <div className="event-image">
                        <img src={v.category[0].image} alt="event" />
                      </div>
                      <h4>{v.category[0].title}</h4>
                      <p>{v.date}</p>
                      <Button
                        onClick={() => rowDeleted(v._id)}
                        variant="contained"
                      >
                        cancel
                      </Button>
                    </div>
                  </Grid>
                );
              })
            ) : (
              <h1>No Event Found!</h1>
            )
          ) : (
            <h1>Loding...</h1>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default ProfileSection;
