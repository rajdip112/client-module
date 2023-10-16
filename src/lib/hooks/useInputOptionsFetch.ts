import { useCallback } from 'react'
import { useFetch } from "./useFetch";
import { generateEndpoint } from './useFetch';


export const useInputOptionsFetch = (endpoint?: object, nameKey = 'name') => {
    const { data } = useFetch(endpoint ? generateEndpoint(endpoint) : null)

    // console.log('input options data', data)

    const getFetchedOptions = useCallback(() => {
        let options = []
        if (data && endpoint) {
            /*eslint-disable no-prototype-builtins */
            if (endpoint.hasOwnProperty('picklist')) {
                options = data.map((d: { name: string; id: number }) => { return { name: d.name, id: d.id } })
            }
            if (endpoint.hasOwnProperty('object') && nameKey) {
                options = data.map((d: any) => {
                    const nameVal = nameKey.split('.').reduce((p, prop) => p[prop], d)
                    return { name: nameVal, id: d.id}
                })
            }
            return options
        }

    }, [data, endpoint])

    const fetchedOptions = getFetchedOptions()

    return { fetchedOptions }
}