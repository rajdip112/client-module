import { useContext } from 'react'
import { PageContext } from '../paging'

export const usePage = () => {
    const { activePage, goToPage, allPages, pageId } = useContext(PageContext)

    return { activePage, goToPage, allPages, pageId }
}

