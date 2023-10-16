import {
    DataGridPro,
    DataGridProProps,
    GridColDef,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridCellParams,
    GridPaginationModel
} from "@mui/x-data-grid-pro"
//   import CustomCell from "./CustomCell"
import React, { useState, useEffect, useCallback } from 'react'
import CustomCell from './CustomCell'
import { Box, MenuItem } from '@mui/material'
import { LicenseInfo } from "@mui/x-license-pro"
import { useFetch, usePage } from '../../hooks'

LicenseInfo.setLicenseKey(
    "13c9362674eabd84c67e69cb0a9f861aTz01MTgzMixFPTE2OTY0NDg4NDQ1NTMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
const location = (window as any).location;
const pageUrl = location.origin + '/' + location.pathname.split('/').slice(1, 3).join('/')
const styles = {
    '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
        marginTop: '1em', marginBottom: '1em'
    }
}

//extending MUI DataGrid props with our own custom props
interface IDataGrid extends DataGridProProps {
    name: string,
    row_id: string, //identifies key in rows object[] to use as unique id
    endpoint?: string,
    showToolbar?: boolean,
    showFilterButton?: boolean,
    showDensitySelector?: boolean,
    customtoolbar?: React.ReactNode,
    editCallback?: (cellValues: GridCellParams, event: any) => void,
    pinned?: { right?: string[], left?: string[] },
    portletConfigs?: any
    graphqlBody?: { query: string, variables: any }
}

const DataGrid: React.FC<IDataGrid> = (props) => {
    const { name, rows = [], row_id, endpoint, density = 'compact', showToolbar = true, customtoolbar, showFilterButton = true, showDensitySelector = true, editCallback, paginationMode = 'client', portletConfigs = {}, pinned, graphqlBody } = props
    const { goToPage } = usePage()
    const dataGridIsFetching = !!endpoint
    const { data, pageInfo, loading } = useFetch(dataGridIsFetching ? endpoint : null, graphqlBody)
    // console.log('datagrid props', props)

    const savedPaginationModel = sessionStorage.getItem(`${name}-pagination-model`) || ''
    const page = savedPaginationModel ? JSON.parse(savedPaginationModel).page : 0
    const pageSize = savedPaginationModel ? JSON.parse(savedPaginationModel).pageSize : 50

    const [paginationModel, setPaginationModel] = useState({ page, pageSize })
    // const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>(data[0] ?? []);
    const [rowCountState, setRowCountState] = useState(pageInfo?.totalRowCount || 0);

    useEffect(() => {
        setRowCountState((prevRowCountState: any) =>
            pageInfo?.totalRowCount !== undefined
                ? pageInfo?.totalRowCount
                : prevRowCountState,
        );
    }, [pageInfo?.totalRowCount, setRowCountState])

    let columns: GridColDef[] = [];
    const generateColumnHeaders = useCallback((data: any, order?: string, id?: any, links?: any) => {
        const arr: Column[] = []
        if (!data) return arr;
        const orderArr = order?.split(',')
        if (orderArr && orderArr.length > 0) {
            for (const key of orderArr) {
                let columnKey = key.trim()
                let columnRenderVal = ''
                let columnTitle
                if (key.includes('.')) {
                    const splitKey = key.split('.')
                    columnKey = splitKey[0].trim()
                    columnRenderVal = splitKey[1].trim()
                }
                if (columnKey.includes(':')) {
                    columnTitle = columnKey.slice(columnKey.indexOf(':') + 1).trim()
                    columnKey = columnKey.slice(0, columnKey.indexOf(':')).trim()
                }
                if (columnRenderVal.includes(':')) {
                    columnTitle = columnRenderVal.slice(columnRenderVal.indexOf(':') + 1).trim()
                    columnRenderVal = columnRenderVal.slice(0, columnRenderVal.indexOf(':')).trim()
                }
                const obj: Column = {
                    field: columnKey,
                    headerName: columnTitle ?? columnKey.toUpperCase(),
                    flex: 1,
                }
                if (columnRenderVal) {
                    obj['valueGetter'] = (cellValues: any) => cellValues.row[columnKey][columnRenderVal]
                }
                arr.push(obj)
            }
            if (links && links !== '') {
                let index = 0
                for (const link of links) {
                    const trimLink = link.trim()
                    if (trimLink !== '' && trimLink !== '0' && trimLink.toLowerCase() !== 'null' && trimLink.toLowerCase() !== 'no') {
                        const field = arr[index].field
                        const currentColumn = orderArr[index]
                        const nested = currentColumn.includes('.')

                        // eslint-disable-next-line no-loop-func
                        arr[index]['renderCell'] = (cellValues: any) => {
                            return (
                                <CustomCell
                                    type={'detail'}
                                    id={cellValues.row[id]}
                                    title={nested ?
                                        cellValues.row[currentColumn.split('.')[0].trim()][currentColumn.split('.')[1].split(':')[0].trim()]
                                        :
                                        cellValues.row[field]
                                    }
                                    handleClick={(e: React.MouseEvent<HTMLElement>) => goToPage({ id: parseInt((e.target as HTMLInputElement).innerHTML), portlet: trimLink })}
                                />
                            )
                        }
                    }
                    index++
                }
            }
        }
        else {
            for (const key in data[0]) {
                const obj = {
                    field: key,
                    headerName: key.toUpperCase(),
                    flex: 1,
                }
                arr.push(obj)
            }

        }
        return arr;
    }, [data])

    const datagridRows = dataGridIsFetching ? data : rows
    const orderedColumns = (portletConfigs.columnOrdering) ?
        generateColumnHeaders(datagridRows, portletConfigs.columnOrdering, portletConfigs.rowID, portletConfigs.links)
        :
        generateColumnHeaders(datagridRows)

    const savePaginationModel = (newModel: GridPaginationModel, details: any) => {
        setPaginationModel(newModel)
        console.log('NEW PAGINATION, ',  newModel)
        sessionStorage.setItem(`${name}-pagination-model`, JSON.stringify(newModel))
        props.onPaginationModelChange && props.onPaginationModelChange(newModel, details)
    }

    if (data || rows) {
        //in case of DataGrid fetching own data and hard-coded columns are being passed as a prop
        if (props.columns.length > 0) {
            columns = props.columns
        } else {
            columns = [
                ...orderedColumns,
                {
                    field: 'actionsMenu',
                    headerName: '',
                    flex: 1,
                    renderCell: (cellValues: any) => {
                        return (
                            <CustomCell
                                type='menu'
                                title='actionsMenu'
                                menuItems={portletConfigs.actionItems && portletConfigs?.actionItems.map((item: string) =>
                                    <MenuItem key={item} /* sx={{ width: '500px' }} */ onClick={() => goToPage({ portlet: item.toLowerCase(), id: cellValues.row[portletConfigs.rowID] })}>{`View ${item}`}</MenuItem>
                                )}
                            />
                        )
                    }
                }]
        }
    }

    const CustomToolbar = () => {
        if (showToolbar === true) {
            return (
                <>
                    <GridToolbarContainer>
                        <GridToolbarColumnsButton />
                        {showFilterButton && <GridToolbarFilterButton />}
                        {showDensitySelector && <GridToolbarDensitySelector />}
                        {customtoolbar}
                    </GridToolbarContainer>
                </>
            )
        } else {
            return <></>
        }
    }

    // if (columns.length > 0) {
    //     console.log(columns)
    // }
    return (
        <Box sx={{ height: '100%' }}>
            <DataGridPro
                //Forwarded MUI Props
                {...props}

                //Data props
                loading={loading}
                columns={columns}
                rows={datagridRows}
                getRowId={(row) => row[row_id]}

                //Formatting props
                initialState={{ pinnedColumns: pinned, pagination: { paginationModel: props?.paginationModel ?? { pageSize: 50 } } }}
                density={density}
                slots={{
                    toolbar: CustomToolbar
                }}

                //Pagination props
                pagination={true}
                paginationMode={props?.paginationMode ?? paginationMode}
                pageSizeOptions={[25, 50, 100]}
                paginationModel={props?.paginationModel ?? paginationModel}
                onPaginationModelChange={savePaginationModel}
                rowCount={rowCountState}

                // rowSelectionModel={rowSelectionModel}
                // onCellClick={(params, event, details) => { onCellClick && onCellClick(params) }}
                onCellEditStop={(params: GridCellParams, event: any) => {
                    editCallback && editCallback(params, (event.target as HTMLInputElement).value)
                }}
                sx={styles}
            />
        </Box>
    )
}

export default DataGrid