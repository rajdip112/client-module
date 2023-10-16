
import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// import SelectPl from '../Inputs/SelectPl'
// import AutoCompleteLr from '../Inputs/AutoCompleteLr'
import { Select, Autocomplete } from '../Inputs'
import { generateRandom } from "../../helpers/tools";

interface IComponent {
    formObj: any,
    callback?: any
    dialog?: boolean
    closeBtn?: any
}

export const FormComponent: React.FC<IComponent> = ({ formObj, dialog = false, callback = false, closeBtn = false }) => {


    const handleChange = (e: any) => {
        setSaveState(e.target.value, e.target.name)
    };

    const handleChangeAt = (value: any, name: any) => {
        setSaveState(value, name)
    };

    const handleChangeDp = (value: any, name: any) => {
        setSaveState(value, name)
    };

    function setSaveState(value: any, name: any) {
        const obj: any = saveObj
        let item: any
        for (let i in formObj.items) {
            item = formObj.items[i]
            if (item.name && item.name === name) {
                obj[name] = value
            }
        }
        setSaveObj(obj)
    }

    const handleSubmit = (name: any) => {
        if (dialog && callback) {
            callback(saveObj)
        } else if (formObj.callback) formObj.callback(name, saveObj)
    };

    function input(row: any) {
        return (
            <TextField id={row.name + '-input'} label={row.label} variant="outlined" sx={{ width: "100%" }}
                onChange={(event) => {
                    setSaveState(event.target.value, row.name);
                }}
            />
        )
    }

    function selectPl(row: any) {
        return (
            <Select
                id={row.name + '-select'}
                label={row.label}
              //  picklist={row.picklist}
                name={row.name}
               // handleChange={handleChange}
                defaultValue={'null'}
            />
        )
    }

    function autoCompleteLr(row: any) {
        return (
            <Autocomplete
                label="Client Rep"
                object={row.object}
                name={row.name}
               // handleChange={handleChangeAt}
              //  usageValue={row.usageValue}
              //  usageText={row.usageText}
            />
        )
    }

    function datepicker(row: any) {
        return (
            <DatePicker label={row.label} sx={{ width: "100%" }}
                onChange={(value: any) => {
                    handleChangeAt(value, row.name);
                }}
            />
        )
    }

    function radio(row: any) {
        let radios: any = []
        try {
            let arr = row.items
            for(let i in arr) {
                radios.push(
                    <FormControlLabel key={generateRandom()} value={arr[i].value} control={<Radio />} label={arr[i].lable} />
                )
            }
        } catch (error) { }
        return (
            <FormControl>
                {row.label ? <FormLabel id={`${row.name}-label`}></FormLabel>: <></> }
                <RadioGroup
                    aria-labelledby={`${row.name}-label`}
                    defaultValue={row.defaultValue ? row.defaultValue : ''}
                    name={row.name}
                >
                    {  radios  }
                </RadioGroup>
            </FormControl>
        )
    }

    function item(row: any) {
        let item: any = false
        switch (row.type) {
            case 'input':
                item = input(row)
                break;
            case 'selectPl':
                item = selectPl(row)
                break;
            case 'autoCompleteLr':
                item = autoCompleteLr(row)
                break;
            case 'datepicker':
                item = datepicker(row)
                break;
            case 'radio':
                item = radio(row)
                break;
        }
        return (
            item ? <Box key={generateRandom()} sx={{ width: "100%", p: 1 }}>{item}</Box> : <></>
        )
    }

    let form: any = [], defaultObj: any = {}
    for (let i in formObj.items) {
        form.push(item(formObj.items[i]))
        if (formObj.items[i].name) defaultObj[formObj.items[i].name] = ''
    }

    let btn: any
    {
        formObj.submitButton ? btn = <Box sx={{ width: "100%", p: 1 }}><Button variant="contained" onClick={() => handleSubmit(formObj.name)}>{formObj.submitButton}</Button></Box> : btn = <></>
    }
    // {
    //     formObj.submitButtonArray ? btn = <Box sx={{ width: "100%", p: 1 }}>
    //         {formObj.submitButtonArray.map((option: any) => {
    //             return (
    //                 <Button variant="contained" onClick={() => handleSubmit(option.name)}>{option.label}</Button>
    //             )
    //         })}
    //     </Box> : btn = <></>
    // }

    const [saveObj, setSaveObj] = useState<{}>(defaultObj);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {form}
            <Box display={"inline-flex"} sx={{ width: "100%", p: 1 }}>
                {closeBtn ? closeBtn : <></>}
                {formObj.submitButton ? btn : <></>}
            </Box>
        </LocalizationProvider>
    )
}

export default FormComponent