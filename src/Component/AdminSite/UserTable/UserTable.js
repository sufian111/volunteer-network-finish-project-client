import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./UserTable.css";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: "60%",
  },
});

const UserTable = () => {
  const classes = useStyles();

  const rowDeleted = (id) => {
    if (window.confirm("Are You Sure?")) {
      fetch("https://localhost:3001/userdelete", {
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

  useEffect(() => {
    fetch("https://fathomless-tundra-56724.herokuapp.com/order")
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  const [rows, setRows] = useState("");

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email Id</TableCell>
            <TableCell align="center">Registertion Date</TableCell>
            <TableCell align="center">Volunteer list</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.displayName}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.category[0].title}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => rowDeleted(row._id)}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <h1>loading....!</h1>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
