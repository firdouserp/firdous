import { Grid, useMediaQuery } from "@material-ui/core";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import * as React from "react";
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  Filter,
  List,
  SearchInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput
} from "react-admin";
import FirdousSelect from '../accounts/FirdousSelect';


export const ClientsIcon = HomeWorkIcon;

// export const UnitsActions = ({ basePath, data }) => (
//   <TopToolbar>
//     <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
//     {/* <ShowButton basePath={basePath} record={data} /> */}
//   </TopToolbar>
// );

const ClientsSearchFilter = (props) => (
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

export const ClientsList = (props) => (
  <List perPage={25} filters={<ClientsSearchFilter />} {...props}>
    {useMediaQuery((theme) => theme.breakpoints.down("sm")) ? (
      <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => `${record.code}`}
        tertiaryText={(record) => record.id}
      />
    ) : (
        <Datagrid rowClick="edit">
          <TextField source="name" />
          <TextField source="father_name" />
          <TextField source="residential_address" />
          <TextField source="phone_mobile" />
          <TextField source="occupation" />
          <TextField source="email" />
          
          
          
          
          <EditButton variant="contained" color="secondary" />
          <DeleteButton />
        </Datagrid>
      )}
  </List>
);

const ClientsTitle = ({ record }) => {
  return <span>Edit Clients {record ? `"${record.title}"` : ""}</span>;
};

export const ClientsEdit = (props) => (
  <Edit
    undoable={false}
    //actions={<UnitsActions />}
    title={<ClientsTitle />}
    {...props}
  >
    <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
      <Grid container display="flex" fullWidth spacing={1}>
   
      <Grid item xs={12} md={4} >
        <TextInput source="name" fullWidth/>
       </Grid>
        
          <Grid item xs={12} md={4} >
          <TextInput source="father_name"  fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="postal_address" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4}>
          <TextInput source="residential_address" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
          <TextInput source="phone_office" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="phone_residential" fullWidth/>
        </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="phone_mobile" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="occupation" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="age" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nationality" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="reference_of" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nominee_name" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nominee_relation" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nominee_address" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="email" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
        <FirdousSelect source="coa" list="coa" sort="title" optionText="title" fullWidth />
        </Grid>
 </Grid>
</SimpleForm>
</Edit>
);


export const ClientsCreate = (props) => (
  <Create
    //actions={<UnitsActions />}
    title="New Client"
    {...props}
  >
      <SimpleForm
      variant={"standard"}
      sanitizeEmptyValues={false}
      margin="none"
      fullWidth
    >
    
    <Grid container display="flex" fullWidth spacing={1}>
   
    <Grid item xs={12} md={4} >
        <TextInput source="name" fullWidth/>
       </Grid>
        
          <Grid item xs={12} md={4} >
          <TextInput source="father_name"  fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="postal_address" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4}>
          <TextInput source="residential_address" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
          <TextInput source="phone_office" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="phone_residential" fullWidth/>
        </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="phone_mobile" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="occupation" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="age" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nationality" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="reference_of" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nominee_name" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nominee_relation" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="nominee_address" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
          <TextInput source="email" fullWidth/>
          </Grid>
          <Grid item xs={12} md={4} >
        <FirdousSelect source="coa" list="coa" sort="title" optionText="title" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
