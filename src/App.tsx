import { useContext, useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import { Box, TextField, Button, MenuItem } from '@mui/material'
import { Autocomplete, DataGrid, Select} from './lib'
import { initialState } from './main'
import { blue } from '@mui/material/colors'

const columns = [
  {
    field: 'first_name',
    headerName: 'First Name',
    flex: 1
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    flex: 1
  },
  {
    field: 'favorite_color',
    headerName: 'Favorite Color',
    flex: 1
  },
]

const colorOptions = ['red', 'blue', 'green', 'yellow']

function App() {
  // const { form, formDispatch } = useContext(FormContext)
  const [rows, setRows] = useState<any[]>([])
  const savedFields = sessionStorage.getItem('formFields')
  const savedRows = sessionStorage.getItem('tableRows')

  //check sessionStorage for info on first render
  useEffect(() => {
    if (rows.length < 1 && savedRows) {
      setRows(JSON.parse(savedRows))
    }

    if (savedFields) {
      // formDispatch({ type: 'RESET', field: '', value: JSON.parse(savedFields) })
    }
  }, [])

  // useEffect(() => {
  //   console.log('session info updated')
  //   sessionStorage.setItem('formFields', JSON.stringify(form))
  // }, [form])

  useEffect(() => {
    sessionStorage.setItem('tableRows', JSON.stringify(rows))
  }, [rows])

  const options = [
    { name: 'red', id: 0 },
    { name: 'blue', id: 1 },
    { name: 'green', id: 2 }
  ]

  const selectChange = (value: string) => {
    console.log('select changed', value)
  }

  const songOptions = [
    { name: 'hello', id: 0 },
    { name: 'good kid', id: 1 },
    { name: 'immortals', id: 2 },
  ]
  // const [data, setData] = useState()
  // console.log('formcontext', form);
  return (
    <>
      {/* <BuildTest /> */}
      <p>SAMPLE FORM</p>
      <Box sx={{ width: '200px' }}>
        {/* <Select
          name='color'
          label='Color'
          id='color-select'
          options={options}
          defaultValue='blue'
          onChange={selectChange}
        /> */}
      </Box>
      <Box>
        <Autocomplete
          freeSolo
          name='testcomplete'
          options={songOptions/* .map((s)=> s.name) */}
          label='title'
        />

      </Box>
      <Box sx={{ width: '500px', mt: '20px' }}>
        {/* <Select
          name='color'
          label='Color'
          id='color-select'
          options={['blue', 'orange', 'red']}
          onChange={selectChange}
        /> */}
      </Box>
      {/* <Box sx={{ display: 'flex', gap: '5px' }}>
        <TextField
          value={form?.first_name}
          onChange={(e) =>
            formDispatch({
              type: 'text',
              field: 'first_name',
              value: e.target.value
            })
          }
        />
        <TextField
          value={form?.last_name}
          onChange={(e) =>
            formDispatch({
              type: 'text',
              field: 'last_name',
              value: e.target.value
            })
          }
        />
        <Select
          sx={{ minWidth: '150px' }}
          value={form?.favorite_color}
          label="Color"
          onChange={(e) => formDispatch({
            type: 'select',
            field: 'favorite_color',
            value: (e.target.value as string)
          })
          }
        >
          {colorOptions.map((color) =>
            <MenuItem value={color}>{color}</MenuItem>
          )}
        </Select>
        <Button
          variant='contained'
          onClick={() => {
            setRows(prev => [...prev, { id: rows.length + 1, ...form }]);
            formDispatch({ type: 'RESET', field: '', value: initialState })
          }}

        >
          Submit
        </Button>
      </Box>
 */}
      {/*     <Box sx={{ height: '450px', width: '70vw' }}>
        <DataGrid columns={columns} rows={rows || []} row_id='id' showToolbar />
      </Box> */}
    </>
  )
}

export default App
