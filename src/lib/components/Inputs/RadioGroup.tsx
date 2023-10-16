import { FormControl, RadioGroup as MuiRadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material'

interface Radio {
    options: string[],
    name: string,
    label: string,
    row?: boolean,
    onChange: (arg0: any) => void
}

function toTitleCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const RadioGroup: React.FC<Radio> = ({ options, name, onChange, label, row = false }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange((event.target as HTMLInputElement).value)
    }

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
            <MuiRadioGroup
                row={row}
                aria-labelledby={`${name}-radio-group-label"`}
                defaultValue={options[0]}
                name={name}
                onChange={handleChange}
            >
                {options.map((o, index) =>
                    <FormControlLabel key={(o + index).toString()} value={o} control={<Radio />} label={toTitleCase(o)} />
                )}
            </MuiRadioGroup>
        </FormControl>
    );
}

export default RadioGroup