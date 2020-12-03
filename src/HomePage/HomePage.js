import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import React, { useEffect, useState } from "react";
import NavBarSection from "../NavBarSection/NavBarSection";
import Card from "./Card/Card";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  heading: {
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: "36px",
  },
  searchbox: {
    width: "90%",
    margin: "48px auto",
    [theme.breakpoints.up("md")]: {
      width: "480px",
    },
  },
  searchbar: {
    border: "1px solid #d6d6d6",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const [CardData, setCardData] = useState();
  useEffect(() => {
    fetch("https://fathomless-tundra-56724.herokuapp.com/service")
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#F4F7FC" }}>
      <NavBarSection></NavBarSection>
      <Container className={classes.container}>
        <Typography className={classes.heading} variant="h3" gutterBottom>
          I grow by helping people in need.
        </Typography>
        <div className={classes.searchbox}>
          <SearchBar className={classes.searchbar} />
        </div>
      </Container>
      <Container>
        <Grid container spacing={3}>
          {CardData ? (
            CardData.map((v) => (
              <Card image={v.image} id={v.id} key={v.id} title={v.title}></Card>
            ))
          ) : (
            <h1>Loading....</h1>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
