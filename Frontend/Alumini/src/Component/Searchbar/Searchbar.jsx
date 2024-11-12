import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme, bgcolor, width }) => ({
  position: 'relative',
  borderRadius: '20px',
  height: '35px',
  backgroundColor: bgcolor || '#EEEEEE', // Customizable background color
  '&:hover': {
    backgroundColor: alpha(bgcolor || '#EEEEEE', 0.9),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: width || '100%', // Customizable width
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: width || 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme, iconColor }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: iconColor || theme.palette.text.primary, 
}));

const StyledInputBase = styled(InputBase)(({ theme, inputWidth }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: inputWidth || '40ch', 
    },
    '&::placeholder': {
      fontSize: '12px', 
      color: theme.palette.text.secondary,
      textAlign: 'center', 
    },
  },
}));

function Searchbar({
  backgroundColor,
  placeholderText = 'Search…',
  iconColor,
  width,
  inputWidth,
  value,
  onChange,
}) {
  return (
    <Search bgcolor={backgroundColor} width={width}>
      <SearchIconWrapper iconColor={iconColor}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholderText}
        inputProps={{ 'aria-label': 'search' }}
        value={value} // Controlled input value
        onChange={onChange} // Input change handler
        inputWidth={inputWidth}
      />
    </Search>
  );
}

export default Searchbar;
