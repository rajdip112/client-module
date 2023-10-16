import { useState } from 'react'
import { Select as MuiSelect, FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'
import { useFetch, useInputOptionsFetch } from '../../hooks'

interface ISelect {
    name: string
    label: string
    defaultValue?: string
    options?: string[]
    endpoint?: object
    id: string
    size?: 'small' | 'medium',
    onChange?: (value: string) => void
    placeholder?: string
    nameKey?: string
}

const Select: React.FC<ISelect> = ({ name, label, defaultValue = '', options, id, onChange, size = 'small', placeholder = 'Select a value', endpoint, nameKey = 'name' }) => {
    const [selected, setSelected] = useState<string>(defaultValue)
    //if endpoint is a string, it can be passed directly to useFetch without generateEndpoint

    const { fetchedOptions } = useInputOptionsFetch(endpoint, nameKey)
    // const fetchEndpoint = endpoint ? generateEndpoint(endpoint) : null
    // const { data } = useFetch(fetchEndpoint)
    // console.log('select fetch:', data)
    console.log('select selected:', selected)
    const handleChange = (e: SelectChangeEvent<string>) => {
        console.log('select change', e.target.value)
        setSelected(e.target.value);
        onChange && onChange(e.target.value)
    }
    // let fetchedOptions = []
    // if(data){
    //     // eslint-disable-next-line no-prototype-builtins
    //     if(endpoint && endpoint.hasOwnProperty('picklist')){
    //         fetchedOptions = data.map((d: { name: string; id: number }) => {return {name: d.name, id: d.id}})
    //     }
    // }
    const renderedValue = () => !selected ? placeholder : selected

    const renderedOptions = options || fetchedOptions

    console.log('select options', renderedOptions)
    return (
        <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel id={`${name}-label`} shrink sx={{ top: '-7px', left: '0.65em' }}>{label}</InputLabel>
            <MuiSelect
                labelId={`${name}-label`}
                id={`${id}`}
                size={size}
                sx={{ width: '100%', textAlign: 'left' }}
                variant="outlined"
                value={selected}
                name={name}
                notched
                onChange={handleChange}
                label={label}
                displayEmpty
                renderValue={renderedValue}
            >
                {renderedOptions.map((option: { name: string, id: number }, index: number) => {
                    return (
                        <MenuItem key={`${option}${index}`} value={option.name} selected={option.name === selected}>
                            {option.name}
                        </MenuItem>
                    )
                })}
            </MuiSelect>
        </FormControl>
    )

}

export default Select