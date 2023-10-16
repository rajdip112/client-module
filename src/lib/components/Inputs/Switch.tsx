import React from 'react'
import { Switch as MuiSwitch, FormGroup, FormControlLabel } from '@mui/material'
import { SwitchProps } from '@mui/material/Switch'
import { styled } from '@mui/material/styles'

const CustomHomeSwitch = styled(MuiSwitch)({
  padding: 8,

  '& .MuiButtonBase-root': {
    margin: 11,
    padding: 0,
    transitionDuration: '300ms'
  },
  '& .MuiSwitch-thumb': {
    height: 16,
    width: 16
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2
  },

  '& .MuiSwitch-switchBase.Mui-checked': {
    // transition: 'transform 2s',
    transform: 'translateX(20px)'
  }
})

interface NewSwitch {
  id?: any,
  onChange?: any,
  label?: string,
  size?: 'medium' | 'small',
  checked: boolean
}

const Switch: React.FC<NewSwitch> = ({ onChange, id, size, checked, label }) => {
  const handleChange = (e: any) => {
    if (onChange && typeof onChange === 'function') {
      onChange(e.target.checked)
    }
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <CustomHomeSwitch
            id={id}
            onChange={handleChange}
            size={size}
            checked={checked}
          />
        }
        label={label}
      />
    </FormGroup>
  )
}

export default Switch
