import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification, defaultTheme } from "react-admin";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, Car } from "@material-ui/core/styles";
import { Box, makeStyles, MenuItem } from "@material-ui/core";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import LockIcon from "@material-ui/icons/Lock";

import { translate, userLogin } from "react-admin";
import FirdousSelect from "./accounts/FirdousSelect";
import { Select, TextField } from "@material-ui/core";
import background from "../../app/assets/firdous-night-view.jpg";
const MyLoginPage = ({ theme }) => {
  const styles = makeStyles({
    main: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "flex-start",
      //   background: "url(https://source.unsplash.com/random/1600x900)",
      background: `url(${background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    card: {
      minWidth: 300,
      marginTop: "6em",
    },
    avatar: {
      margin: "1em",
      display: "flex",
      justifyContent: "center",
    },
    icon: {},
    hint: {
      marginTop: "1em",
      display: "flex",
      justifyContent: "center",
    },
    form: {
      padding: "0 1em 1em 1em",
    },
    input: {
      marginTop: "1em",
    },
    actions: {
      padding: "0 1em 1em 1em",
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [project, setProject] = useState("");
  const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    if (!project || project == 0) {
      notify("Please select a project");
      return;
    }
    login({ username, password, project }).catch(() =>
      notify("Invalid username or password")
    );
  };
  const renderInput = () => (
    <FirdousSelect
      source="projects"
      list="projects"
      sort="title"
      optionText="title"
      fullWidth
    />
  );
  const classes = styles();
  return (
    <div className={classes.main}>
      <Card className={classes.card}>
        <div className={classes.avatar}>
          <Avatar className={classes.icon}>
            <LockIcon />
          </Avatar>
        </div>

        <form onSubmit={submit}>
          <div className={classes.form}>
            <div className={classes.input}>
              <TextField
                name="username"
                type="username"
                label="Username"
                // value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </div>
            <div className={classes.input}>
              <TextField
                name="password"
                type="password"
                label="Password"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
            <div className={classes.input}>
              <Select
                name="project"
                label="Project"
                labelId="Project"
                onChange={(e) => setProject(e.target.value)}
                fullWidth
                placeholder="Projects"
                initialValue="0"
              >
                {/* <option value="0" selected>
                  Please select a Project
                </option>
                <option value="47">Infinity</option>
                <option value="48">Pride</option> */}
                <MenuItem value={47}>Infinity</MenuItem>
                <MenuItem value={48}>Pride</MenuItem>
              </Select>
            </div>
          </div>
          <CardActions className={classes.actions}>
            <Button
              variant="raised"
              type="submit"
              color="primary"
              className={classes.button}
              fullWidth
            >
              Login
            </Button>
          </CardActions>
        </form>
      </Card>
      <Notification />
    </div>
  );
};

export default MyLoginPage;
