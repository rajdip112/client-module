// import styled from 'styled-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Item = styled(Box)(({ theme }) => ({
  backgroundColor:  '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const ItemIcon = styled(Box)(() => ({
  width: '100%',
}));

