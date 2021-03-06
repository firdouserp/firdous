import Link from "@material-ui/core/Link";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import simpleRestProvider from "ra-data-simple-rest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import * as React from "react";
import {
  Admin,
  fetchUtils,
  Layout,
  Login,
  Resource,
  Sidebar
} from "react-admin";
import "./App.css";
import {
  CoaCreate,
  CoaEdit,
  CoaIcon,
  CoaList
} from "./app/components/accounts/coa";
import {
  Coa_typeCreate,
  Coa_typeEdit,
  Coa_typeIcon,
  Coa_typeList
} from "./app/components/accounts/coa_type";
import {
  NotesCreate,
  NotesEdit,
  NotesIcon,
  NotesList
} from "./app/components/accounts/notes";
import {
  VouchersCreate,
  VouchersEdit,
  VouchersIcon,
  VouchersList,
  VouchersShow
} from "./app/components/accounts/vouchers";
import {
  TransactionsCreate,
  TransactionsEdit,
  TransactionsIcon,
  TransactionsList,
  TransactionsShow
} from "./app/components/accounts/vouchers/Transactions";
// import {
//   VoucherEdit,
//   VoucherEntry
// } from "./app/components/accounts/VoucherEntry";
// import {
//   VoucherEntry, VouchersEdit
// } from "./app/components/accounts/VoucherEntry2";
import {
  BookingEdit,
  BookingIcon,
  BookingList,
  BookingsShow
} from "./app/components/bookings/booking";
import BookingFormWizard from "./app/components/bookings/BookingFormWizard";
import {
  ClientsCreate,
  ClientsEdit,
  ClientsIcon,
  ClientsList
} from "./app/components/bookings/clients";
import {
  ScheduleCreate,
  ScheduleEdit,
  ScheduleIcon,
  ScheduleList
} from "./app/components/bookings/schedule";
import Menu from "./app/components/custom/CustomMenu";
import customRoutes from "./app/components/custom/customRoutes";
import Dashboard from "./app/components/Dashboard";
import {
  StockCreate,
  StockEdit,
  StockIcon,
  StockList
} from "./app/components/inventory/stock";
import MyAppBar from "./app/components/MyAppBar";
import MyLoginPage from "./app/components/MyLoginForm";
import {
  EmployeesCreate,
  EmployeesEdit,
  EmployeesIcon,
  EmployeesList
} from "./app/components/payroll/employees";
import {
  ProjectCreate,
  ProjectEdit,
  ProjectIcon,
  ProjectList
} from "./app/components/projects";
import {
  GrnCreate,
  GrnEdit,
  GrnIcon,
  GrnList
} from "./app/components/purchases/grn";
import {
  Purchase_orderCreate,
  Purchase_orderEdit,
  Purchase_orderIcon,
  Purchase_orderList
} from "./app/components/purchases/purchaseorders";
import {
  SupplierCreate,
  SupplierEdit,
  SupplierIcon,
  SupplierList
} from "./app/components/purchases/suppliers";
import AccountsLedgerList from "./app/components/reports/AccountsLedger";
import TrialBalanceConsolidatedList from "./app/components/reports/ConsolidatedTrialBalance";
import { ProjectLedgerDetail, ProjectLedgerList } from "./app/components/reports/ProjectLedger";
import ProjectLedgerCashBank from "./app/components/reports/ProjectLedgerCashBank";
import ProjectLedgerDetailed from "./app/components/reports/ProjectLedgerDetailed";
import SalesSummary from "./app/components/reports/SalesSummary";
import TrialBalanceList from "./app/components/reports/TrialBalance";
import {
  FpropCreate,
  FpropEdit,
  FpropIcon,
  FpropList
} from "./app/components/settings/Fprop";
import {
  SettingCreate,
  SettingEdit,
  SettingIcon,
  SettingList,
  SettingShow
} from "./app/components/settings/setting";
import {
  UnitsCreate,
  UnitsEdit,
  UnitsIcon,
  UnitsList
} from "./app/components/units";
import { UserList } from "./app/components/users";
//import myDataProvider from './app/auth/dataProvider';
//import authProvider from './app/auth/authProvider';
import basicAuthProvider from "./app/providers/basicAuth";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#3f51b5",
    },
  },
  spacing: 8,
  sidebar: {
    //root:{backgroundColor: '#fff',}
  },
  VoucherEntry: {
    border: "1px solid #ccc",
  },
  overrides: {
    MuiTableRow: {
      root: {
        height: 20,
      },
    },
    MuiTableCell: {
      root: {
        borderRight: "1px solid rgba(224, 224, 224, 1)",
      },
    },
    MuiFormHelperText: {
      contained: {
        //display: "none",
      },
      marginDense: {
        //display: "none",
      },
    },

    MuiFilledInput: {
      root: { backgroundColor: "#1976d20f" },
    },
    RaSidebar: {
      // boxShadow:
      //     "2px 0px 1px -1px rgba(0,0,0,0.2), 1px 0px 3px 0px rgba(0,0,0,0.1)",
      drawerPaper: {
        backgroundColor: "#022f5a",
        color: "#ffffff",
        height: "100%",
        paddingTop: "1em",
        "@media (min-width: 0px)": {
          backgroundColor: "#022f5a",
        },
      },
    },
    RaCreate: {
      noActions: {
        marginTop: 0,
        "@media (min-width: 600px)": {
          marginTop: 0,
        },
      },
    },
    RaSimpleFormIterator: {
      form: {
        "@media (min-width: 600px)": {
          display: "flex",
          flexFlow: "row wrap",
        },

        paddingBottom: "1rem",
        paddingTop: "1rem",
        //justifyContent: "space-evenly",
      },
      RaFormInput: {
        input: {
          width: "100%",
        },
      },
      line: {
        borderBottom: "solid 2px rgb(25 118 210)",
      },
    },
    RaLayout: {
      content: {
        //paddingTop: '2em',
        paddingTop: "1em",
      },
    },
    RaList: {
      root: {
        border: "1px solid #e0e0e3",
        backgroundColor: "#fcfcfc",
        color: "#fff",
        padding: "10px",
      },
    },
    RaEdit: {
      root: {
        border: "1px solid #e0e0e3",
        backgroundColor: "#fcfcfc",
        color: "#fff",
        padding: "10px",
      },
      noActions: {
        marginTop: 0,
        "@media (min-width: 600px)": {
          marginTop: 0,
        },
      },
      RaTopToolbar: {
        root: { padding: "0px" },
      },
    },
    RaDatagrid: {
      headerCell: {
        backgroundColor: "#1976d24a",
        color: "#0000008a",
        height: "2.5em",
        textTransform: "uppercase",
        boxShadow: "0 2px 0 rgba(0,0,0,0.05)",
      },
    },

    MuiDivider: {
      light: { backgroundColor: "#6868681f" },
    },
    RaMenuItemLink: {
      root: {
        color: "#fff",
        "&:hover": {
          background: "#007eff",
        },
      },

      active: {
        borderLeftStyle: "solid",
        backgroundColor: "#007eff",
        borderRightStyle: "solid",
        color: "#fff",
        fontWeight: "bold",
      },
      icon: {
        color: "inherit",
      },
    },
  },

  typography: {
    fontFamily: [
      "Helvetica",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const useSidebarStyles = makeStyles({});
const MySidebar = (props) => {
  const classes = useSidebarStyles();
  return <Sidebar {...props} />;
};
//const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} color="primary" />;

const MyLayout = (props) => (
  <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} menu={Menu} />
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ?? "}
      <Link color="inherit" href="https://firdouserp.pk/">
        FirdousERP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const MyLoginPage = () => (
//   <Login
//     // A random image that changes everyday
//     backgroundImage="https://source.unsplash.com/random/1600x900/daily"
//   />
// );

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  //console.log("token:" + localStorage.getItem("jwtToken"));
  const jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) {
    const { token,project } = JSON.parse(jwtToken || {});
    options.headers.set("Authorization", `Bearer ${token}`);
    options.headers.set("Project", `${project.id}`);
  }
 console.log("Request Options :" +url+ ":" + JSON.stringify(options));
  let json = fetchUtils.fetchJson(url, options);
    json.then(function(result) {
      console.log(result) // "Some User token"
   })
  return json;
};
const dataProvider = simpleRestProvider(
  "/api/v1",
  httpClient
);

const messages = {
  en: englishMessages,
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale], "en", {
  allowMissing: true,
});

const App = () => (
  <Admin
    disableTelemetry
    //i18nProvider={i18nProvider}
    customRoutes={customRoutes}
    theme={theme}
    layout={MyLayout}
    loginPage={MyLoginPage}
    dashboard={Dashboard}
    authProvider={basicAuthProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="Projects"
      list={ProjectList}
      create={ProjectCreate}
      edit={ProjectEdit}
      icon={ProjectIcon}
    />
    <Resource
      name="grn"
      list={GrnList}
      create={GrnCreate}
      edit={GrnEdit}
      icon={GrnIcon}
      options={{ label: "GRN", menu: "false" }}
    />
    <Resource
      name="Booking"
      list={BookingList}
      create={BookingFormWizard}
      edit={BookingEdit}
      icon={BookingIcon}
      
      options={{ label: "Bookings", menu: "false" }}
    />
    <Resource
      name="Clients"
      list={ClientsList}
      create={ClientsCreate}
      edit={ClientsEdit}
      icon={ClientsIcon}
      options={{ label: "Bookings", menu: "false" }}
    />
    <Resource
      name="setting"
      list={SettingList}
      create={SettingCreate}
      edit={SettingEdit}
      icon={SettingIcon}
      show={SettingShow}
      options={{ label: "Setting", menu: "false" }}
    />

    <Resource
      name="reports/projectledger"
      list={ProjectLedgerList}
      edit={ProjectLedgerDetail}
      options={{ label: "Setting", menu: "false" }}
    />

  <Resource
      name="reports/trialbalance"
      list={TrialBalanceList}
      options={{ label: "Setting", menu: "false" }}
    />
   <Resource
      name="reports/trialbalanceconsolidated"
      list={TrialBalanceConsolidatedList}
      options={{ label: "Setting", menu: "false" }}
    />
    <Resource
      name="reports/accountledger"
      list={AccountsLedgerList}
      options={{ label: "Setting", menu: "false" }}
    />

<Resource
      name="reports/projectledgerdetailed"
      list={ProjectLedgerDetailed}
      options={{ label: "Setting", menu: "false" }}
    />
 
 <Resource
      name="reports/projectledgercashbank"
      list={ProjectLedgerCashBank}
      options={{ label: "Setting", menu: "false" }}
    />
     <Resource
      name="reports/salessummary"
      list={SalesSummary}
      options={{ label: "Setting", menu: "false" }}
    />
    <Resource
      name="purchaseorder"
      list={Purchase_orderList}
      create={Purchase_orderCreate}
      edit={Purchase_orderEdit}
      icon={Purchase_orderIcon}
      options={{ label: "Purchase Orders", menu: "false" }}
    />

    <Resource
      name="suppliers"
      list={SupplierList}
      create={SupplierCreate}
      edit={SupplierEdit}
      icon={SupplierIcon}
      options={{ label: "Suppliers", menu: "false" }}
    />
    <Resource
      name="Units"
      list={UnitsList}
      create={UnitsCreate}
      edit={UnitsEdit}
      icon={UnitsIcon}
    />
    <Resource
      name="Stock"
      list={StockList}
      create={StockCreate}
      edit={StockEdit}
      icon={StockIcon}
    />
    <Resource
      name="coa"
      options={{ label: "Chart of Accounts", menu: "false" }}
      list={CoaList}
      create={CoaCreate}
      edit={CoaEdit}
      icon={CoaIcon}
    />
    <Resource
      name="coa_type"
      options={{ label: "Account Types", menu: "false" }}
      list={Coa_typeList}
      create={Coa_typeCreate}
      edit={Coa_typeEdit}
      icon={Coa_typeIcon}
    />
    <Resource
      name="notes"
      options={{ label: "Notes", menu: "false" }}
      list={NotesList}
      create={NotesCreate}
      edit={NotesEdit}
      icon={NotesIcon}
    />
    <Resource
      name="vouchers"
      options={{ label: "Vouchers", menu: "false" }}
      list={VouchersList}
      create={VouchersCreate}
      edit={VouchersEdit}
      show={VouchersShow}
      icon={VouchersIcon}
    />
    <Resource
      name="transactions"
      options={{ label: "Vouchers", menu: "false" }}
      list={TransactionsList}
      create={TransactionsCreate}
      edit={TransactionsEdit}
      show={TransactionsShow}
      icon={TransactionsIcon}
    />
    <Resource
      name="Employees"
      list={EmployeesList}
      create={EmployeesCreate}
      edit={EmployeesEdit}
      icon={EmployeesIcon}
    />
    <Resource
      name="Schedule"
      list={ScheduleList}
      create={ScheduleCreate}
      edit={ScheduleEdit}
      icon={ScheduleIcon}
      options={{ label: "Schedules", menu: "false" }}
    />
            <Resource
      name="fprop"
      list={FpropList}
      create={FpropCreate}
      edit={FpropEdit}
      icon={FpropIcon}
      options={{ label: "Properties", menu: "true" }}
    />

    <Resource name="Users" list={UserList} />
    <Resource name="Userform" />
    <Resource name="vouchers/invalidvou" />
  </Admin>
);

export default App;
