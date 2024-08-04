import { Outlet } from 'react-router-dom'
import Header from './Header'
import {Box} from '@mui/material'

const Layout = () => {
    return (
        <>
            <Header />
            <Box sx={{  margin: `90px 25px 0px` }}>
                <Outlet />
            </Box>
        </>
    )
}

export default Layout