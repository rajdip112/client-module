import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { PagingButton } from './PageProvider';
// import { CustomTypography } from '../pages/Home';

export const HomeBreadcrumbContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gridColumnGap: '0.5rem',
    gridRowGap: 0,
    width: '100%',
    marginBottom: '0.5rem',
})

interface PagingBreadcrumbProps {
    homeCrumbText?: string,
    crumbText?: string,
    showPath?: boolean
    toPage?: string,
}

const PagingBreadcrumb: FC<PagingBreadcrumbProps> = ({ homeCrumbText = 'Songdex Marketplace', crumbText = '', showPath = true, toPage = 'home' }) => {
    return (
        <HomeBreadcrumbContainer>
            <PagingButton pageobj={{ portlet: toPage }} sx={{ padding: 0, textTransform: 'none' }}>
                <AccountBalanceIcon sx={{ color: 'gray', height: '20px', width: '20px', marginRight: '0.5rem', }} />
                {/* <CustomTypography sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer', } }} variant='body1' light nobold>{`${homeCrumbText}`}&nbsp;&nbsp;&nbsp;/</CustomTypography> */}
            </PagingButton>
            {showPath &&
                <Box display='flex' sx={{ alignItems: 'center' }}>
                    <PaymentsIcon sx={{ color: 'gray', height: '20px', width: '20px', marginRight: '0.5rem' }} />
                    {/* <CustomTypography variant='body1' light nobold>{crumbText}</CustomTypography> */}
                </Box>
            }
        </HomeBreadcrumbContainer>
    )
}

export const OfferTitle = function(){
    const hash = JSON.parse(atob(decodeURIComponent((window as any).location.hash.slice(1))))
    return hash.offername
}

export default PagingBreadcrumb