import ShopsList from "./features/shops/ShopsList";
import { MainPage } from "./features/mainPage/MainPage";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import ShopsListExtended from "./features/shops/ShopsListExtended";
import { ShopPage } from "./features/shops/ShopPage";
import { FinalPage } from "./features/finalPage/FinalPage";
import { History } from "./features/history/History";
import {CouponsList} from "./features/coupons/CouponsList";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    common:{
      black: '#000000',
      white: '#FFFFFF',
    },
    background: {//beige
      default: '#FBF2EA',
      paper: '#ECB686',
      paperLight:'#FEF9F6',
    },
    text: {//brown, black
      primary: '#493E33',
      secondary: '#A78F74',
      disabled: '#A7A098',
      hint: '#A4A09D',
    },
    primary: {//yellow
      main: '#EBC080',
      light: '#F7D7A8',
      dark: '#CF8923',
    },
    secondary: {//green
      main: '#8C9E94',
      light: '#AAC0B4',
      dark: '#73827A',
    },
    error: {//red
      main: '#F20000',
      light: '#F25757',
      dark: '#A23A3A',
    },
    success: {//green
      main: '#517250',
      light: '#6F9C6E',
      dark: '#405A40',
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'standard' && {
            '& label.Mui-focused': {
              color: '#A78F74',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#74726E',
            },
            }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' && {
            boxShadow: '0px 1px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)',
            backgroundColor: '#8C9E94',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#73827A',
              boxShadow: '0px 0px 0px',
            },
            '& label.Mui-focused': {
              color: '#A78F74',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#74726E',
            },
            }),
            ...(ownerState.variant === 'outlined' && {
              border: `1px solid #73827A`,
              color: '#73827A',
              '&:hover': {
                boxShadow: '1px 1px 1px #73827A',
                border: `1px solid #73827A`,
              },
            }),
        }),
      },
    },
  },
});

const darkTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 600,
      laptop: 900,
      desktop: 1200
    }
  },
  spacing: [0, 4, 8, 16, 32, 64],
  palette: {
    mode: 'dark',
    common:{
      black: '#000000',
      white: '#FFFFFF',
    },
    background: {
      default: '#303841',
      paper: '#F6C90E',
      paperLight:'#EEEEEE',
    },
    text: {
      primary: '#222831',
      secondary: '#EEEEEE',
      disabled: '#EEEEEE',
      hint: '#EEEEEE',
    },
    primary: {
      main: '#303841',
      light: '#3A4750',
      dark: '#000000',
    },
    secondary: {
      main: '#F6C90E',
      light: '#AAC0B4',
      dark: '#DDE6ED',
    },
    error: {
      main: '#F20000',
      light: '#F25757',
      dark: '#A23A3A',
    },
    success: {
      main: '#517250',
      light: '#6F9C6E',
      dark: '#405A40',
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'standard' && {
            '& label.Mui-focused': {
              color: '#EEEEEE',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#EEEEEE',
            },
            }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' && {
            boxShadow: '0px 1px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)',
            backgroundColor: '#F6C90E',
            color: '#393E46',
            '&:hover': {
              backgroundColor: '#F6C90E',
              boxShadow: '1px 1px 1px #393E46',
            },
            '& label.Mui-focused': {
              color: '#A78F74',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#74726E',
            },
            }),
            ...(ownerState.variant === 'outlined' && {
              border: `1px solid #EEEEEE`,
              color: '#EEEEEE',
              '&:hover': {
                outline: `1px solid #EEEEEE`,
              },
            }),
        }),
      },
    },
  },
});

// const StyledGrid = styled(Grid)(function () {
//   const theme = useTheme();
//   return{
//     [theme.breakpoints.up("mobile")]: {
//       spacing: [1],
//     },
//     [theme.breakpoints.up("tablet")]: {
//       spacing: [3],
//     },
//     [theme.breakpoints.up("laptop")]: {
//     },
//     [theme.breakpoints.up("desktop")]: {
//     },
//   }
// });

function App() {

  return (
    <ThemeProvider theme={darkTheme}>

    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<MainPage />} />

        <Route path="cart">
          <Route index element={<FinalPage />} />
        </Route>

        <Route path="shops" >
          <Route index element={<ShopsListExtended/>}/>
          <Route path=":shopId" element={<ShopPage />} />
        </Route>

        <Route path="history">
          <Route index element={<History />} />
        </Route>

        <Route path="coupons">
          <Route index element={<CouponsList />} />
        </Route> 

      </Route>
    </Routes>
    </ThemeProvider>

  );
}

export default App;
