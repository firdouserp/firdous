import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import * as React from "react";
import { ArrayInput, Button, Create, Datagrid, DateInput, DeleteButton, Edit, EditButton, Filter, FormDataConsumer, List, ListButton, NumberInput, ReferenceField, required, SearchInput, SimpleForm, SimpleFormIterator, SimpleList, TextField, TextInput, TopToolbar } from 'react-admin';
import FirdousSelect from '../accounts/FirdousSelect';

const small = 8;
const xsmall = 12;
const medium = 6;


export const ScheduleIcon = StoreIcon;

export const ScheduleActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

const ScheduleSearchFilter = (props) => (

  <Filter {...props}>
    <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
    <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
    <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
  </Filter>

);

export const ScheduleList = props => (
  <List filters={<ScheduleSearchFilter />} {...props}>
    {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={record => record.title}
        secondaryText={record => `${record.code}`}
        tertiaryText={record => record.id}

      />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <ReferenceField
                        label="Booking"
                        source="booking"
                        reference="Booking"
                    >
                <TextField source="title" />
                    </ReferenceField>
                    <ReferenceField
                        label="Unit"
                        source="unit"
                        reference="Units"
                    >
                <TextField source="title" />
                    </ReferenceField>
          <TextField source="name" />
          <TextField source="contact" />
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>)}
  </List>
);

const ScheduleTitle = ({ record }) => {
  return <span>Schedule {record ? `"${record.title}"` : ''}</span>;
};

export const ScheduleEdit = (props) => (
  <Edit undoable={false} title={<ScheduleTitle />} {...props}>
    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
     <div fullWidth >
        <Box p="1em" width="100%">
          <Typography variant="h6" gutterBottom>
            Payment Schedule
          </Typography>
          <Grid container fullWidth display="flex" >
            <Grid spacing={1} id="left-container" item xs={xsmall} small={small} md={4}>
              <Typography variant="h7" gutterBottom>
                Details
                </Typography>
              
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput disabled source="id" fullWidth />
                </Grid>

                <Grid item xs={xsmall} sm={small} md={medium}>
                <FirdousSelect
                       margin="booking"
                      label="Booking"
                    source="booking"
                      optionText="name"
                    list="booking"
                    sort="name"
                    
                    validate={ra_required}
                    fullWidth
                    
                  
                    />
                   
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                <FirdousSelect
                    margin="unit"
                   label="Unit"
                 source="unit"
                  optionText="title"
                 list="units"
                 sort="title"
                
                 validate={ra_required}
                 fullWidth
                 
               
                 />
            </Grid>
            <Grid item xs={xsmall} sm={small} md={medium} lg={medium} align="left">
              <TextInput
                margin="none"
                label="Remarks"
                source="remarks"
                //resource="vouchers"
                multiline
                fullWidth
              />
            </Grid>
              </Grid>
            

            <Grid spacing={1} id="right-container" align="left"  item xs={xsmall} md={4}>
              <Typography variant="h7" gutterBottom>
                Payment Details
                </Typography>
                <Grid container spacing={2}>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="total_cost"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_booking"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_allocation"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_confirmation"
                    variant='standard'
                    fullWidth
                    multiline
                  />
                </Grid>
                </Grid>
              <Grid container spacing={2}>
                <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                  <TextInput
                    source="on_start"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="monthly_installment"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="quaterly_payment"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_excavation"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_foundation"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_slab"

                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_block"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_plaster"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_plumbing"
                    fullWidth
                    variant='standard'
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_electric"
                    fullWidth
                    variant='standard'
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_coloring"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_finishing"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_possesion"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          


        </Box>
      </div>
    </SimpleForm>
  </Edit>
);
const ra_required = [required()];
const jwt = JSON.parse(localStorage.getItem("jwtToken"));
export const ScheduleCreate = (props) => (

  <Create undoable={false} title="New Schedule" {...props}>
    <SimpleForm
      variant="standard"
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <div fullWidth >
        <Box p="1em" >
          <Typography variant="h6" gutterBottom>
            Payment Schedule
          </Typography>
          <Grid container width="200">
            <Grid  display="flex" spacing={0} id="left-container" item xs={xsmall} small={small} md={6}>
              <Typography variant="h7" gutterBottom>
                Details
                </Typography>
              
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput variant='standard' disabled source="id" fullWidth />
                </Grid>

                <Grid item xs={xsmall} sm={small} md={medium}>
                <FirdousSelect
                      variant='standard'
                       margin="booking"
                      label="Booking"
                    source="booking"
                      optionText="name"
                    list="booking"
                    sort="name"
                    
                    validate={ra_required}
                    fullWidth
                    
                  
                    />
                   
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                <FirdousSelect
                  variant='standard'
                    margin="unit"
                   label="Unit"
                 source="unit"
                  optionText="title"
                 list="units"
                 sort="title"
                
                 validate={ra_required}
                 fullWidth
                 
               
                 />
            </Grid>
            <Grid  variant='standard' item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="total_cost"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
            <Grid item xs={xsmall} sm={small} md={medium} lg={medium} align="left">
              <TextInput
              variant='standard'
                margin="none"
                label="Remarks"
                source="remarks"
                //resource="vouchers"
                multiline
                fullWidth
              />
            </Grid>

           
              </Grid>
              <Grid spacing={1} id="right-container" align="left"  item xs={xsmall} md={6}>
              <Box >
            <ArrayInput
              //initialValue={initial}
              variant="outlined"
              source="pschedules"
              label="Payment Schedule"
              fullWidth
              subscription={{ dirtyFields: true }}
              marginTop="none"
            >
              <SimpleFormIterator fullWidth>
                <FirdousSelect
                  resettable
                  label="Account"
                  list="coa"
                  source="coa"
                  sort="code"
                  //optionText={optionRenderer}
                  //validate={ra_required}
                  //initialValue={1}
                  //resource="vouchers"
                  fullWidth

                 
                  // margin="none"
                />
                <TextInput
                  variant="outlined"
                  margin="none"
                  source="particulars"
                  //resource="vouchers"
                  label="Particulars"
                  multiline
                  fullWidth
               
                />
                {/* <TextInput
                  margin="none"
                  label="RefNo."
                  source="refno"
                  //resource="vouchers"
                  fullWidth
                  formClassName={classes.width20}
                  className={classes.BorderandBackground}
                /> */}

                <NumberInput
                  //formClassName={classes.iteratorinput50}
                  //className={classes.fixedWidth}
                  label="Amount"
                  source="amount"
                  // resource="vouchers"
                  //validate={ra_required}

                
                  fullWidth
                />

               
              </SimpleFormIterator>
            </ArrayInput>
          </Box>
          </Grid>
            <Grid spacing={0} id="right-container" align="left"  item xs={xsmall} md={12}>
              <Typography variant="h7" gutterBottom>
                Payment Details
                </Typography>
                <Grid container spacing={2}>
               
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_booking"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_allocation"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_confirmation"
                    variant='standard'
                    fullWidth
                    multiline
                  />
                </Grid>
                </Grid>
              <Grid container spacing={2}>
                <Grid item xs={xsmall} sm={small} md={medium} lg={medium}>
                  <TextInput
                    source="on_start"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="monthly_installment"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="quaterly_payment"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_excavation"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_foundation"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_slab"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_block"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_plaster"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_plumbing"
                    fullWidth
                    variant='standard'
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_electric"
                    fullWidth
                    variant='standard'
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_coloring"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_finishing"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={xsmall} sm={small} md={medium}>
                  <TextInput
                    source="on_possesion"
                    variant='standard'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          


        </Box>
      </div>
    </SimpleForm>
  </Create>
);