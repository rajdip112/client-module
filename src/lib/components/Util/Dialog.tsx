import React, { useEffect, useState, useCallback } from "react"
import { Item, ItemIcon } from '../../styles/component-styles'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Dialog as MDialog } from '@mui/material/';
import Button from '@mui/material/Button';
import FormComponent from "../Form/FormComponent";

type Props = {
    content?: any
    formObj?: any
    handleClose: any
    submitButton?: any,
    callback?: any,
    open: any
};

const Dialog: React.FC<Props> = ({ handleClose, open, content = false, formObj = false, callback = false, submitButton = false }) => {
    let dialogContent = content
    const formSubmit = (saveObj: any) => {
        // setOpen(false);
        console.log('saveObj F', saveObj)
    };

    if (formObj) {
        // if(formObj && formObj.callback) formObj.callback = formSubmit
        dialogContent = <FormComponent formObj={formObj} dialog={true} closeBtn={<Button onClick={handleClose}>Cancel</Button>} />
    }



    const handleSubmit = () => {
        if (callback) callback()
    };

    return (
        <MDialog maxWidth="lg" onClose={handleClose} open={open}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <Item>
                    {dialogContent}
                </Item>
            </DialogContent>
            {
                formObj ?
                    <></>
                    :
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {submitButton ? <Button variant="contained" onClick={handleSubmit}>{submitButton}</Button> : <></>}
                    </DialogActions>
            }
        </MDialog>
    );
}

export default Dialog;