import { ButtonProps } from '@mui/material'

export enum PAGES {
    MAX_PAGES = 7,
    HOME_PAGE = 0,
}

export interface Page {
    portlet: string,
    element: React.ReactElement
}

export type PageObject = {
    portlet: string,
    id?: number,
    offername?: string
}

export interface PageContextProps {
    activePage?: any,
    goToPage: (arg0: PageObject) => void,
    allPages: Page[],
    pageId?: number
}

export interface PagingButtonProps extends ButtonProps {
    pageobj: PageObject
}