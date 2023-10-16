import React, { useState, useEffect } from 'react'
import { TextField, Box, Autocomplete as MuiAutocomplete, CircularProgress } from '@mui/material'
import { generateRandom } from "../../helpers/tools"


// const url = "http://localhost:8080/o/c/"
// const Liferay = (window as any).Liferay;

type Props = {
    label: string
    object?: string
    selval?: any
    defaultText?: any
    defaultValue?: any
    name?: string
    id?: string | boolean
    freeSolo?: boolean
    required?: boolean
    onChange?: any
    picklist?: string
    options?: { name: string, id: number }[]
};

const Autocomplete: React.FC<Props> = ({
    label,
    defaultText = '',
    defaultValue,
    name,
    id = false,
    freeSolo = false,
    required = false,
    picklist,
    options = [],
    // object,
    onChange
}) => {
    // const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>(null)
    const [inputValue, setInputValue] = useState('')

    // const [selected, setSelected] = useState();
    // const [dText, setDText] = useState(defaultText);

    const handleChange = (event: any, newValue: string | null) => {
        // console.log('autocomplete change', newValue, onChange)
        setValue(newValue)
        onChange && onChange(newValue)
    }

    function handleInputChange(event: any, value: any) {
        // console.log('autocomplete inputchange', value, onChange)
        setInputValue(value);
    }
    // const loading =  options.length > 0 ? false : (open && picklists.length === 0)
    // const dValue = { name: defaultText, id: defaultValue }
    if (!id) id = 'Autocomplete-' + generateRandom()

    // useEffect(() => {
    //     if (!loading) {
    //         return;
    //     }

    //     const fetch = async () => {
    //         try {
    //             //fetch all picklists from Liferay
    //             const url = 'http://localhost:8080/o/headless-admin-list-type/v1.0/list-type-definitions';
    //             const response = await Liferay.Util.fetch(url, {
    //                 headers: {
    //                     'accept': 'application/json',
    //                     'x-csrf-token': Liferay.authToken
    //                 }
    //             });
    //             setPicklists(response.items)
    //         } catch (error) {
    //             console.log('API call error', error)
    //         }
    //     }

    //     if (!picklists.length && picklist && !options) {
    //         fetch();
    //     }

    // }, []);


    // const generateOptions = (list?: any) => {
    //     if (!list) return [];

    //     const newOptions = list.listTypeEntries.map((l: any) => { return { name: l.name, id: l.id } })
    //     return newOptions
    // }

    return (
        <Box>
            <MuiAutocomplete
                value={value}
                freeSolo={freeSolo}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={options}
                sx={{ minWidth: 300 }}
                // getOptionLabel={(option: any) => option.name}
                // isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
                renderInput={(params) => <TextField {...params} placeholder='Select a value' label={label} />}
            />
            {/* <MuiAutocomplete
                // defaultValue={dValue}
                value={value}
                inputValue={inputValue}
                // freeSolo={freeSolo}
                size="medium"
                key={'AT' + id}
                id={'AT' + id}
                // name={'AT' + id}
                // label={label}
                // open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onInputChange={handleInputChange}
                isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
                getOptionLabel={(option: any) => option.name}
                options={optionList}

            renderInput={(params: any) => <TextField value={inputValue} {...params} />}
            /> */}
        </Box>
    );
}

export default Autocomplete;