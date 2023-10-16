/// <reference types="vite/client" />

interface Column {
    field: string,
    headerName: string,
    flex: number
    valueGetter?: (cellValues: any) => string
    renderCell?: (cellValues: any) => React.ReactNode
}