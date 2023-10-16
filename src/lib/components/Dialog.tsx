import React, { useEffect, useState, useCallback } from "react"
import { Item, ItemIcon } from '../styles/component-styles'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Dialog as MDialog } from '@mui/material/';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {
    content?: any
    handleClose: any
    submitButton?: any,
    noActions?: boolean,
    callback?: any,
    icon?: any,
    title: any,
    open: any
};

const Dialog: React.FC<Props> = ({ handleClose, open, content = false, noActions = false, callback = false, submitButton = false, title = false, icon = false }) => {
    let dialogContent = content

    const handleSubmit = () => {
        if (callback) callback()
    };
    let bIcon: any = false
    if (icon && icon === 'search') {
        bIcon = <SearchIcon />
    } else if (icon && icon === 'save') {
        bIcon = <SaveIcon />
    } else if (icon && icon === 'arrow') {
        bIcon = <KeyboardArrowRightIcon />
    } else if (icon && icon === 'add') {
        // bIcon = <AddIcon />
    }
    return (
        <MDialog maxWidth="lg" onClose={handleClose} open={open}>
            {title ? <DialogTitle>{title}</DialogTitle> : <></>}
            <DialogContent>
                <Item>
                    {dialogContent}
                </Item>
            </DialogContent>
            {noActions ? <></> :
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {submitButton ? <Button variant="contained" onClick={handleSubmit} endIcon={bIcon}>{submitButton}</Button> : <></>}
                </DialogActions>

            }
        </MDialog>
    );
}

export default Dialog;