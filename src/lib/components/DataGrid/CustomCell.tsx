import React, { useState, useEffect } from "react"
import Typography from '@mui/material/Typography';

import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface ICustomCell {
  type: string,
  title: string,
  handleClick?: any,
  handleDelete?: any,
  menuItems?: any
  id?: any,
}
const CustomCell: React.FC<ICustomCell> = ({ type, menuItems, title, handleClick, handleDelete, id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleCloseClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  let cell: any = <></>

  switch (type) {
    case 'menu':
      cell = (
        <>
          <IconButton
            onClick={handleActionClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'actions-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <ExpandCircleDownOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="actions-menu"
            open={open}
            onClose={handleCloseMenu}
            onClick={handleCloseClick}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.12))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {menuItems}
          </Menu>
        </>

      )
      break;
    case 'detail':
      cell = (
        <Typography variant="body1" gutterBottom onClick={handleClick} id={id} title={title} sx={{ cursor: 'pointer', color: 'blue', mb: 0 }}>{title}</Typography>
      )
      break;
    case 'delete':
      cell = (
        <DeleteOutlineOutlinedIcon onClick={handleClick} style={{ cursor: 'pointer', color: 'blue' }} />
      )
      break;
    case 'edit':
      cell = (
        <>
          <CreateOutlinedIcon onClick={handleClick} sx={{ mr: 2 }} style={{ cursor: 'pointer', color: 'blue' }} />
          <DeleteOutlineOutlinedIcon onClick={handleDelete} sx={{ mr: 2 }} style={{ cursor: 'pointer', color: 'indianred' }} />
        </>
      )
      break;
  }
  return (cell)
}

export default CustomCell
