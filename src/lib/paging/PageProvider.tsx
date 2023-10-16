
import { useState, createContext, FC, useEffect } from 'react'
import { Button } from '@mui/material'
import { usePage } from '../hooks/usePage'
import { PageContextProps, PageObject, PagingButtonProps, Page } from './pagingTypes'
import { OfferTitle } from './PagingBreadcrumb'

const URL_HASH = (window as any).location.hash

export const PageContext = createContext<PageContextProps>({} as PageContextProps);

export const PageProvider: FC<{ children: React.ReactNode, pages: Page[] }> = ({ children, pages }) => {
    const initialUrlHash = atob(decodeURIComponent((window as any).location.hash.slice(1)))
    const parsedHash = initialUrlHash && JSON.parse(initialUrlHash)
    console.log('initial hash', initialUrlHash)
    const foundPageFromURL = pages.find((p) => parsedHash && p.portlet === parsedHash.portlet)
    const nullPage = { portlet: 'null', element: <></> }
    const [activePage, setActivePage] = useState<Page>(foundPageFromURL || (initialUrlHash ? nullPage : (pages.find((p) => p.portlet === 'home') as Page)))
    const [pageId, setPageId] = useState<number | undefined>(parsedHash?.id || undefined)

    //console.log('activePage', activePage, ' pageId:', pageId)

    const handleHashChange = (e: any) => {
        const hash = atob(decodeURIComponent((window as any).location.hash.slice(1)))
        console.log('Hash: ', hash)
        const pHash = hash && JSON.parse(hash)
        const foundPage = pages.find((p) => pHash && p.portlet === pHash.portlet)
        setActivePage(hash ? foundPage as Page : ((pages.find((p) => p.portlet === 'home') as Page) ?? nullPage))
        setPageId(pHash?.id ?? pageId)
    }

    useEffect(() => {
        window.addEventListener("hashchange", handleHashChange)

        return () => window.removeEventListener("hashchange", handleHashChange)
    }, [])

    const goToPage = (pageobj: PageObject) => {
        console.log('going to page', pageobj);
        const newPage = pages.find((p) => p.portlet === pageobj.portlet)

        setActivePage(newPage || pages[0]);
        setPageId(prev => pageobj?.id || prev); //use new id if exists, else use current id
        // eslint-disable-next-line no-prototype-builtins
        if (!pageobj.hasOwnProperty('id')) {
            pageobj.id = pageId
        }
        // if (typeof (pageobj.offername) === 'undefined') {
        //     pageobj.offername = OfferTitle()
        // }
        (window as any).location = '#' + encodeURIComponent(btoa(JSON.stringify(pageobj)))
    }

    return (
        <PageContext.Provider value={{ goToPage, activePage, allPages: pages, pageId }}>
            {children}
        </PageContext.Provider>
    )
}

export const PagingButton: FC<PagingButtonProps> = (props) => {
    const { goToPage } = usePage()
    const { pageobj, children } = props

    const handleClick = (e: any, pageobj: PageObject): void => {
        props.onClick && props.onClick(e)
        goToPage(pageobj)
    }

    return (
        <Button {...props} onClick={(e) => handleClick(e, pageobj)} >{children}</Button>
    )
}

export const RenderedPage = () => {
    const { activePage } = usePage()
    //console.log('found active page', activePage)
    return activePage?.element ?? <></>
}