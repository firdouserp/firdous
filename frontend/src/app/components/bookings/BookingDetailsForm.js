import { Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { BooleanInput, Button, DateInput, required, TextInput, Toolbar } from "react-admin";
import FirdousSelect from "../accounts/FirdousSelect";
class BookingDetailsForm extends Component {
  
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { booking, step, handleChange } = this.props;
    const small = 6;
    const xsmall = 12;
    const medium = 6;
    const styles = {
      button: {
        margin: 15,
      },
    };
    const ra_required = [required()];
    const jwt = JSON.parse(localStorage.getItem("jwtToken"));
    if (step == 1) {
      return (
        <Box p="1em">
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <div>
            <Grid container spacing={10}>
              <Grid spacing={1} id="left-container" item xs={xsmall} md={4}>
                <Typography variant="h7" gutterBottom>
                  Unit Allotment
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput disabled source="id" fullWidth onBlur={handleChange} />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    {/* <TextInput
                      source="client"
                      defaultValue={booking.client}
                      fullWidth onBlur={handleChange} onBlur={handleChange}

                    /> */}
                    <FirdousSelect

                      label="Client"
                    source="client"
                      optionText="name"
                    list="clients"
                    sort="name"
                  validate={ra_required}
                    fullWidth
                    
                       onBlur={handleChange}   
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                     <FirdousSelect
                       margin="projects"
                      label="projects"
                    source="projects"
                      optionText="title"
                    list="projects"
                    sort="title"
                    filter={{ id: jwt.project.id }}
                    validate={ra_required}
                    fullWidth
                    initialValue={jwt && jwt.project.id}
                  validate={ra_required}
                    fullWidth
                    disabled
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                  <FirdousSelect
                margin="none"
                label="Unit"
                source="unit"
                optionText="title"
                list="units"
                sort="title"
                validate={ra_required}
                  fullWidth
                          
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput  source="code" fullWidth onBlur={handleChange} />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="scode"
                      fullWidth onBlur={handleChange} /*options={{ multiLine: true }}*/
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput fullWidth onBlur={handleChange} multiline source="title" />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                    <DateInput
                      source="book_date"
                      defaultValue={booking.book_date}
                      fullWidth onBlur={handleChange}
                      pattern="\d{4}-\d{2}-\d{2}"
                      initialValue={new Date().toISOString().substring(0, 10)}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="sale_price"
                      defaultValue={booking.sale_price}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall}>
                    <TextInput
                      source="remarks"
                      defaultValue={booking.remarks}
                      fullWidth onBlur={handleChange}
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid spacing={1} id="right-container" item xs={xsmall} md={6}>
                <Typography variant="h7" gutterBottom>
                  Booking Allottee
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                    <TextInput
                      source="name"
                      defaultValue={booking.name}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="father_name"
                      defaultValue={booking.father_name}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="cnic"
                      defaultValue={booking.cnic}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="phone_no"
                      defaultValue={booking.phone_no}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall}>
                    <TextInput
                      source="residential_address"
                      defaultValue={booking.residential_address}
                      fullWidth onBlur={handleChange}
                      multiline
                    />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="occupation"
                      defaultValue={booking.occupation}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="nationality"
                      defaultValue={booking.nationality}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="client"
                      defaultValue={booking.client}
                      fullWidth onBlur={handleChange}
                    />
                    </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="reference_off"
                      defaultValue={booking.reference_off}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="nominee_name"
                      defaultValue={booking.nominee_name}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="relation"
                      defaultValue={booking.relation}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="email"
                      defaultValue={booking.unit}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <BooleanInput
                      source="active"
                      defaultValue={booking.active}
                      fullWidth onBlur={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button source="Booking" />
          </div>

          {/* <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button label="Continue" primary={true} onClick={this.continue} />
            </Box>
          </Toolbar> */}
        </Box>
      );
    }
    return null;
  }
}

export default BookingDetailsForm;
