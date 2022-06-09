import { Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { ArrayInput, Button, DateInput, DateTimeInput, NumberInput, required, SaveButton, SimpleFormIterator, TextInput, Toolbar } from "react-admin";
import FirdousSelect from "../accounts/FirdousSelect";
import {withStyles} from '@material-ui/core/styles';
import { BookingScheduleForm } from "./booking";
class ScheduleForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };


  render() {
    const { schedule, step, handleChange } = this.props;
    const small = 6;
    const xsmall = 12;
    const medium = 6;
    const styles = {
      button:  { marginRight: "1.5em", width: "100em" },
      RaSimpleFormIterator: {
        form: {
          width:"1800px",
          justifyContent: "space-evenly",
        },
        width25: { marginRight: "1.5em", width: "25%" },
        width35: { marginRight: "1.5em", width: "35%" },
        RaFormInput: {
          input: {
            width: "500px",
          },
        },
        RaInput: {
          width:"500px",
        } 
    }}


    const ra_required = [required()];
    if (step == 2) {
      const FormDiv = withStyles(styles)(({children, classes, ...props}) => {
        return (
            <div className={classes.root}>
                <div className={classes.form}>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <TextInput source="name" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput source="card_id" fullWidth />
                        </Grid>
                    </Grid>
                </div>
                </div>
        )
    }
)
      return (
        <BookingScheduleForm/>
      );
    }
    return null;
  }
}

export default ScheduleForm;
