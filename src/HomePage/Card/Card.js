import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  let color = ["#3f90fc", "#421fcf", "#ffbd3e", "#ff7044"];
  let index = Math.floor(Math.random() * color.length);
  const bgColor = {
    background: color[index],
  };
  return (
    <>
      <Grid item xs={12} md={3} sm={6}>
        <Link to={`/register/${props.id}`}>
          <div className="image">
            <img style={{ width: "100%" }} src={props.image} alt="baby" />
            <div className="heading" style={bgColor}>
              <p>{props.title}</p>
            </div>
          </div>
        </Link>
      </Grid>
    </>
  );
};

export default Card;
