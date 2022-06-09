import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component } from "react";
import { Button, TopToolbar, useShowController } from 'react-admin';
import ReactToPrint from "react-to-print";
import Booking from './BookingPrint';
import PrintIcon from "@material-ui/icons/Print";
import logo from "../../assets/firdouslogo.png";
import Outstanding from "./SchedulePrint";
const BookingsShow = props => {
    const {
        basePath, // deduced from the location, useful for action buttons
        defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
        loaded, // boolean that is false until the record is available
        loading, // boolean that is true on mount, and false once the record was fetched
        record, // record fetched via dataProvider.getOne() based on the id from the location
        resource, // the resource name, deduced from the location. e.g. 'posts'
        version, // integer used by the refresh feature
    } = useShowController(props);
    const componentRef = React.useRef();
    console.log("record"+ JSON.stringify(record))
    if (!loaded) {
        return <CircularProgress />;
    }
   
    return (

        <div>
             <TopToolbar display='flex' flexGrow={1} >
         <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <Button
                  
                  color="primary"
                  variant="contained"
                  label="Print"
                  size="medium"
                  icon={<PrintIcon />}
                />
              );
            }}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            {console.log(props)}
            <BookingComponent record={record} ref={componentRef} />
          </div>
              </TopToolbar>
          <Booking
            booking={{ ...record }}
            // invoice={{ "createdDate": "25-5-2021", "dueDate": "23-2-9892", "paidDate": "25,1,2021", "paymentMethod": "CASH", "id": "1", "description": "this is description", "items": [{ 'description': 'item1', 'amount': '25' }], "name": "Firdous REsidecy" }}
            //customer={{}}
            company={{ "name": "Firdous ERP", "logoUrl": logo }}
           
        />

        </div>

        



    );
}
export class BookingComponent extends Component {
    render() {
      const { record, loaded } = this.props;
      return (<Booking
            booking={{ ...record }}
            // invoice={{ "createdDate": "25-5-2021", "dueDate": "23-2-9892", "paidDate": "25,1,2021", "paymentMethod": "CASH", "id": "1", "description": "this is description", "items": [{ 'description': 'item1', 'amount': '25' }], "name": "Firdous REsidecy" }}
            //customer={{}}
            company={{ "name": "Firdous ERP", "logoUrl": logo }}
            notes={"This is the confirmation"}
        />);
      
    }
  }

  export class OutstandingComponent extends Component {
    render() {
      const { record, loaded } = this.props;
      return (<Outstanding
            booking={{ ...record }}
            // invoice={{ "createdDate": "25-5-2021", "dueDate": "23-2-9892", "paidDate": "25,1,2021", "paymentMethod": "CASH", "id": "1", "description": "this is description", "items": [{ 'description': 'item1', 'amount': '25' }], "name": "Firdous REsidecy" }}
            //customer={{}}
            company={{ "name": "Firdous ERP", "logoUrl": logo }}
            notes={"This is the confirmation"}
        />);
      
    }
  }
export default BookingsShow