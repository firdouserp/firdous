import { Box, Grid, Link, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import FirdousSelect from "../accounts/FirdousSelect";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PrintIcon from "@material-ui/icons/Print";
import {
  BooleanInput,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  Filter,
  List,
  ListButton,
  SearchInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
  TopToolbar,DateInput, required,Toolbar, SaveButton, Button, ShowButton, ArrayInput, SimpleFormIterator, NumberInput, TabbedForm, FormTab
} from "react-admin";
import BookingShow, { BookingComponent, OutstandingComponent } from "./BookingShow";
import PrintPOComponent from "../purchases/PrintPOComponent";
import ReactToPrint from "react-to-print";
import React from "react";
import { Label } from "@material-ui/icons";

export const BookingIcon = ListAltIcon;
const useStyles = makeStyles({
    RaSimpleFormIterator: {
      form: {
        justifyContent: "space-evenly",
      },
  },
  width25: { marginRight: "0.5em", width: "25%" },
  width10: { marginRight: "0.5em", width: "10%" },
});



const BookingSearchFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      variant="standard"
      placeholder="Title"
      source="title"
      alwaysOn
    />
    <SearchInput
      variant="standard"
      placeholder="SCode"
      source="scode"
      alwaysOn
    />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>
);

export const BookingList = (props) => (
  <List empty={false} filters={<BookingSearchFilter />} {...props}>
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="code" />
        <TextField source="scode" />
        <TextField source="title" />
        <TextField source="remarks" />
        <TextField source="active" />
        <EditButton variant="contained" color="secondary" />
        <DeleteButton />
      </Datagrid>
    )}
  </List>
);

const BookingTitle = ({ record }) => {
  return <span>Booking {record ? `"${record.title}"` : ""}</span>;
};
export function formatCurrency(amount) {
  return Number.parseFloat(amount)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
const ra_required = [required()];

export const BookingEdit = (props) => {
  const classes = useStyles();
  const small = 6;
  const xsmall = 12;
  const medium = 6;
  
  const jwt = JSON.parse(localStorage.getItem("jwtToken"));

  return (
    <Edit fullWidth undoable={false} title={<BookingTitle />}  {...props}>
      <TabbedForm variant="standard" margin="none" fullWidth toolbar={<CustomToolbar />}>
      <FormTab variant={"outlined"} label="Booking">
      <Box p="1em" fullWidth>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <div fullWidth>
            <Grid container spacing={10} fullWidth>
              <Grid spacing={1} id="left-container" item xs={xsmall} md={4}>
                <Typography variant="h7" gutterBottom>
                  Unit Allotment
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput disabled source="id" fullWidth  />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    {/* <TextInput
                      source="client"
                      defaultValue={booking.client}
                      fullWidth  

                    /> */}
                  <FirdousSelect label="Client" source="client" list="clients" sort="name" optionText="name" fullWidth validate={ra_required} />
                  
                    
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                     <FirdousSelect
                       margin="projects"
                      label="projects"
                    source="project"
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
                  <FirdousSelect label="Units" source="unit" list="units" sort="title" optionText="title" fullWidth validate={ra_required} />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput  source="code" fullWidth  />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="scode"
                      fullWidth  /*options={{ multiLine: true }}*/
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput fullWidth  multiline source="title" />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                  <DateInput
                      source="book_date"
                      fullWidth 
                      pattern="\d{4}-\d{2}-\d{2}"
                      initialValue={new Date().toISOString().substring(0, 10)}
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="sale_price"
                    
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall}>
                    <TextInput
                      source="remarks"
                      fullWidth 
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
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="father_name"
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="cnic"
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="phone_no"
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall}>
                    <TextInput
                      source="residential_address"
                   
                      fullWidth 
                      multiline
                    />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="occupation"
                   
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="nationality"
                     
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="client"
                    
                      fullWidth 
                    />
                    </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="reference_off"
                     
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="nominee_name"
                    
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="relation"
                    
                      fullWidth 
                    />
                  </Grid>

                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <TextInput
                      source="email"
                   
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={xsmall} sm={small} md={medium}>
                    <BooleanInput
                      source="active"
                     
                      fullWidth 
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

        </Box>
        </FormTab>
        <FormTab variant={"outlined"} label="Schedule">
       <BookingScheduleForm source="pschedules"></BookingScheduleForm>
        </FormTab>
        <FormTab label="Transactions">
            <MyTransactionField source="transactions" />
       </FormTab>
       <FormTab label="Payments">
            <MyPaymentField source="transactions" />
       </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const MyScheduleTotalField =(props)=>{
  const total_schedule = props.record && props.record.pschedules && props.record.pschedules.reduce(
    (sum, item) => sum + ((item.amount && parseFloat(item.amount * item.occurence)) || 0),
    0
  );
  console.log("total schedule : " + total_schedule);
  return (<span >{formatCurrency(total_schedule)}</span>);
}
const MyTransactionField =(props)=>{
  console.log("mytransfield"+JSON.stringify(props))
  const total_cr = props.record.transactions && props.record.transactions.reduce(
    (sum, item) => sum + ((item.dr && parseFloat(item.dr)) || 0),
    0
  );
  const total_dr = props.record.transactions && props.record.transactions.reduce(
    (sum, item) => sum + ((item.cr && parseFloat(item.cr)) || 0),
    0
  );

  props.record.transactions && props.record.transactions.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.vu_date) - new Date(b.vu_date);
  });
  return (
    <table width={"100%"}>
      <thead>
        <tr>
          <td colspan="8"  style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Account Report</td>
        </tr>
      </thead>
  <thead>
   <tr style={{fontSize:'8pt',width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}}>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Vou No.</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Date </th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="left" colspan="4" >Description</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">Debit</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">credit</th>
   </tr>
</thead>

   { props.record.transactions && props.record.transactions.map((item) => (
     
      <tr style={{fontSize:'8pt',width:'50px' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey' }} className="" key={item.description}>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center" className="">{item.vu_no}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center" width={"50px"}>{item.vu_date}</td>
        <td style={{width:'60%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}}colspan="4" className="">{item.particulars}</td>

        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right" className="">{formatCurrency(item.dr)}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right" className="">{formatCurrency(item.cr)}</td>
      </tr>
      
    ))}
      <tr style={{fontSize:'8pt',width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} className="">
        <th/>
        <th/>
        <th style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} colspan="4" align="right">Totals: </th>

        <th style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey',boxShadow: '0 1px 0 red'}} className="">{formatCurrency(total_cr)}</th>
        <th style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey',boxShadow: '0 1px 0 red'}} className="">{formatCurrency(total_dr)}</th>
      </tr>
    </table>
  );
}

const MyPaymentField =(props)=>{


  const total_cr = props.record.transactions && props.record.transactions.reduce(
    (sum, item) => sum + ((item.dr && parseFloat(item.dr)) || 0),
    0
  );
  const total_dr = props.record.transactions && props.record.transactions.reduce(
    (sum, item) => sum + ((item.cr && parseFloat(item.cr)) || 0),
    0
  );
  
  props.record.transactions && props.record.transactions.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.vu_date) - new Date(b.vu_date);
  });

  props.record.outstanding && props.record.outstanding.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.dueon) - new Date(b.dueon);
  });
  return (
    <Grid container fullWidth spacing={2}>
      <Grid item md={6}>
    <table width={"100%"}  style={{border:'1px solid grey',minWidth:'500px'}}>
    <thead>
        <tr>
          <td colspan="8"  style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Schedule Plan</td>
        </tr>
      </thead>
      <thead>
      <tr style={{ fontSize:'9pt',width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} className="">
      
      <th colspan="5" style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">Total Payment Recevied: </th>

      <th style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey',boxShadow: '0 1px 0 red'}} className="">{formatCurrency(total_dr-total_cr)}</th>

    </tr>    
   <tr style={{fontSize:'8pt',width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}}>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="left">Payment Schedule</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Due date </th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Amount Due</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Payment received</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Outstanding</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Balance</th>
      
   </tr>
</thead>
<tbody>
   { props.record.outstanding && props.record.outstanding.map((item) => (
     
      <tr style={{height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey' ,fontSize:'8pt', lineHeight: '4px' }} >
        <td style={{width:'50px' ,height:'16px',borderRight:'1px solid grey',borderBottom:'1px solid grey',fontWeight:'bold'}} align="left" className="">{item.paymentschedule+ ' ' + (item.frequency>0?item.number:"")}</td>
        <td style={{width:'20%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center" width={"50px"}>{item.dueon}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey', paddingRight:'10px'}} align="right">{formatCurrency(item.amount)}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">{item.cumulativepayment>0?formatCurrency(item.amount):((item.cumulativepayment+item.amount)>0?item.cumulativepayment+item.amount:"")}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">{item.cumulativepayment>0?0:((item.cumulativepayment+item.amount)>0?item.amount-(item.cumulativepayment+item.amount):formatCurrency(item.amount))}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">{formatCurrency(item.cumulativepayment)}</td>
      
      </tr>
      
    ))}
    </tbody>
    </table>
    </Grid>
    <Grid item md={6}>
    <table width={"100%"} style={{border:'1px solid grey'}}>
    <thead>
        <tr>
          <td colspan="8"  style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Transactions</td>
        </tr>
      </thead>
      <thead>
   <tr style={{fontSize:'8pt',width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}}>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Vou No.</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center">Date </th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="left" >Description</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">Debit</th>
      <th style={{width:'50px' ,height:'20px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">credit</th>
   </tr>
</thead>
<tbody>
   { props.record.transactions && props.record.transactions.map((item) => (
     
      <tr style={{fontSize:'8pt',width:'50px' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey' }} className="" key={item.description}>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center" className="">{item.vu_no}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="center" width={"50px"}>{item.vu_date}</td>
        <td style={{width:'60%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} className="">{item.particulars}</td>

        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right" className="">{formatCurrency(item.dr)}</td>
        <td style={{width:'10%' ,height:'15px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right" className="">{formatCurrency(item.cr)}</td>
      </tr>
      
    ))}
      <tr style={{fontSize:'8pt',width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} className="">
        <th/>
        <th/>
        <th style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey'}} align="right">Totals: </th>

        <th style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey',boxShadow: '0 1px 0 red'}} className="">{formatCurrency(total_cr)}</th>
        <th style={{width:'50px' ,height:'50px',borderRight:'1px solid grey',borderBottom:'1px solid grey',boxShadow: '0 1px 0 red'}} className="">{formatCurrency(total_dr)}</th>
      </tr>
      </tbody>
    </table>
  </Grid>
  </Grid>
  );
}
const CustomToolbar = (props) => {
  const componentRef = React.useRef();
  const componentRef1 = React.useRef();
  return (
    <Toolbar alwaysEnableSaveButton {...props} classes={useStyles()}>
      <Grid container spacing={2}>
        <Grid item>
          <SaveButton undoable={false} {...props} />
        </Grid>
        <Grid item>
          <ListButton
            basePath={props.basePath}
            label="Back"
            variant="contained"
            color="primary"
            size="medium"
            icon={<ChevronLeft />}
          />
        </Grid>
        <Grid item>
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <Button
                  disabled={!props.record.id}
                  color="primary"
                  variant="contained"
                  label="Print Schedule"
                  size="medium"
                  icon={<PrintIcon />}
                />
              );
            }}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            {console.log(props)}
            {props.record.transactions?
                        <OutstandingComponent record={props.record} ref={componentRef}/>:""}
          </div>
          {/* <OutstandingComponent record={props.record}></OutstandingComponent> */}
        </Grid>
        <Grid item>
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <Button
                  disabled={!props.record.id}
                  color="primary"
                  variant="contained"
                  label="Print Transactions"
                  size="medium"
                  icon={<PrintIcon />}
                />
              );
            }}
            content={() => componentRef1.current}
          />
          <div style={{ display: "none" }}>
            {console.log(props)}
            {props.record.transactions?
                        <BookingComponent record={props.record} ref={componentRef1}/>:""}
          </div>
         
        </Grid>
      </Grid>
      <DeleteButton undoable={false} />
    </Toolbar>
  );
};

export const BookingCreate = (props) => (
  <Create undoable={false} title="New Booking" {...props}>
    <SimpleForm variant="standard">
      <TextInput disabled source="id" />
      <TextInput source="code" />
      <TextInput source="scode" /*options={{ multiLine: true }}*/ />
      <TextInput multiline source="title" />
      <TextInput source="unit" />
      <TextInput source="client" />
      <TextInput source="book_date" />
      <TextInput source="sale_price" />
      <TextInput source="discount" />
      <TextInput source="remarks" />
      <TextInput source="name" />
      <TextInput source="father_name" />
      <TextInput source="residential_address" />
      <TextInput source="phone_no" />
      <TextInput source="occupation" />
      <TextInput source="nationality" />
      <TextInput source="reference_off" />
      <TextInput source="nominee_name" />
      <TextInput source="relation" />
      <TextInput source="cnic" />
      <TextInput source="project" />
      <TextInput source="email" />
      <BooleanInput source="active" />

    </SimpleForm>
  </Create>
);

export const BookingScheduleForm = (props) =>{
  const classes = useStyles();
  return (<Box p="1em"  fullWidth>
  <Typography variant="h6" gutterBottom>
    Payment Schedule :    <MyScheduleTotalField {...props} source="pschedules"/>
  </Typography>
    <Grid container >
     
      <Grid  id="right-container" item md={12}>
        <Grid container>
        <ArrayInput
      variant="outlined"
      source="pschedules"
      label=""
      fullWidth
      subscription={{ dirtyFields: true }}
      marginTop="none"
    >
      <SimpleFormIterator fullWidth>
      <FirdousSelect
    defaultValue="1"
    label="Schedule Type"
    source="type"
    optionText="value"
    list="fprop"
    sort="oid"
    validate={ra_required}
    fullWidth
    fullWidth
    formClassName={classes.width25}
    filter={{ type: "schedule" }} variant={"outlined"}
  />
       
       <DateInput
    initialValue={new Date().toISOString().substring(0, 10)}
    label="Due Date"
    variant="outlined"
    source="duedate"
    //resource="vouchers"
    validate={ra_required}
    autoFocus
    pattern="\d{4}-\d{2}-\d{2}"
    fullWidth
    className={classes.button}
    formClassName={classes.width25}
 
  />
  
        <NumberInput
          label="Amount"
          source="amount"
          validate={ra_required}
          fullWidth
          className={classes.button}
          formClassName={classes.width10}
        />
          <NumberInput
          label="Occurence"
          source="occurence"
          initialValue="1"
          className={classes.button}
          formClassName={classes.width10}
          validate={ra_required}
          fullWidth
        />
        <FirdousSelect
    defaultValue="1"
    label="Frequency"
    source="frequency"
    optionText="value"
    initialValue={40}
    list="fprop"
    sort="oid"
    validate={ra_required}
    fullWidth
    fullWidth
    formClassName={classes.width10}
    filter={{ type: "frequency" }} variant={"outlined"}
  />
      </SimpleFormIterator>
    </ArrayInput>

        </Grid>
      </Grid>
    </Grid>
</Box>)
};
export const BookingsShow = (props) => {
  return <BookingShow {...props} />;
};
