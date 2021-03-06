import { Box } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import React, { Component } from "react";
import { Button, Create, DeleteButton, FormWithRedirect, ListButton, SaveButton, Toolbar } from "react-admin";
import BookingConfirm from "./BookingConfirm";
import BookingDetailsForm from "./BookingDetailsForm";
import ScheduleForm from "./ScheduleForm";

//import Confirm from './Confirm';
//import Success from './Success';

class BookingFormWizard extends Component {
  state = {
    step: 1,
    booking: {
      code: "",
      scode: "",
      title: "",
      unit: "123",
      client: "",
      project: "",
      book_date: "",
      sale_price: "",
      discount: "",
      remarks: "",
      client_name: "",
      father_name: "",
      residential_address: "",
      phone_no: "",
      nationality: "",
      cnic: "",
      reference_off: "",
      nominee_name: "",
      relation: "",
      email: "",
    },
    schedule: {
      id: "",
      name: "",
      date: "",
      unit: "",
      type: "",
      floor: "",
      block: "",
      contact: "",
      total_cost: "",
      on_booking: "",
      on_allocation: "",
      on_confirmation: "",
      on_start: "",
      monthly_installment: "",
      quaterly_payment: "",
      on_excavation: "",
      on_foundation: "",
      on_slab: "",
      on_block: "",
      on_plumbing: "",
      on_electric: "",
      on_coloring: "",
      on_finishing: "",
      on_possesion: "",
    },
  };
  
  //Proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  CustomToolbar = (props) => (
    <Toolbar {...props}>
      <Button label="Continue"></Button>
    </Toolbar>
  );

  render(props) {
    const { step } = this.state;
    // Handle field change
    const handleChangeBooking = (e) => {
      console.log("handlechangedBooking");
      let inputName = e.target.name;
      let inputValue = e.target.value;
      let stateCopy = Object.assign({}, this.state);
      stateCopy.booking[inputName] = inputValue;
      this.setState(stateCopy);
    };
    const styles = {
      button: {
        margin: 15,
      },
    };
    const handleChangeSchedule = (e) => {
      console.log("handleChangeSchedule");
      let inputName = e.target.name;
      let inputValue = e.target.value;
      let stateCopy = Object.assign({}, this.state);
      stateCopy.schedule[inputName] = inputValue;
      this.setState(stateCopy);
    };

    const BookingForm = <FormWithRedirect
      {...props}
      render={(formProps) => (
        <form>
          <BookingDetailsForm
            nextStep={this.nextStep}
            handleChange={handleChangeBooking}
            booking={this.state.booking}
            step={step} />

          <ScheduleForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={handleChangeSchedule}
            booking={this.state.booking}
            schedule={this.state.schedule}
            step={step} />
          <BookingConfirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            booking={this.state.booking}
            schedule={this.state.schedule}
            step={step} />
            <Toolbar>
                    <Box  display="flex" justifyContent="space-between" width="100%">
                        <SaveButton
                            saving={formProps.saving}
                            handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                        />
                        {step==1? <Button label="Continue"  variant="contained"
            color="primary"
            size="medium" onClick={this.nextStep} />:  <Button             
            label="Back"
            variant="contained"
            color="primary"
            size="large"
            onClick={this.prevStep}
           
            icon={<ChevronLeft />}
          />}
                        
                        <DeleteButton record={formProps.record} />
                    </Box>
                    
                </Toolbar>
                
        </form>
      )} />;
    return (
      <Create basePath="booking" resource="booking" {...props}>
        {BookingForm}
        
      </Create>
    );
  }
}

export default BookingFormWizard;
