import { TextField, FormControl } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Autocomplete, RadioGroup, Select, Switch } from './'
import { DatePicker } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const HookFormInput = (props: any) => {
    const Input = ((props: any) => {
        switch (props.type) {
            case 'select': return <Select {...props} />
            case 'textfield':
                return <TextField {...props} />
            case 'autotext':
                return <Autocomplete {...props} />
            case 'radio':
                return <RadioGroup {...props} />
            case 'switch':
                return <Switch checked={props.value} {...props} />
            case 'date':
                return <LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker {...props} /></LocalizationProvider>
            default: return <></>
        }
    })

    return (
        <FormControl fullWidth>
            {/* controller hooks this input to react-hook-form */}
            <Controller
                defaultValue={props.defaultValue}
                control={props.control}
                name={props.name}
                // passes props to input
                render={({ field: { ref, ...field } }) => <Input {...props} {...field} />}
            />
        </FormControl>
    )
}

export default HookFormInput
