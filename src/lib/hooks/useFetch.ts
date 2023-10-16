import { useState, useEffect, useCallback } from 'react'
const Liferay = (window as any).Liferay;
const location = (window as any).location
const host = location.origin
const PICKLIST_URL = `${location.origin}/o/headless-admin-list-type/v1.0/list-type-definitions`



const getItemsFromObject = (obj: any): any => {
  if (!obj) return
  for (const key in obj) {
    if (key !== 'items') {
      if (obj[key]) {
        return getItemsFromObject(obj[key])
      }
      else return
    }
    else {
      return obj[key]
    }
  }
}

export function useFetch(endpoint: any, body?: any): any {
  const [data, setData] = useState<any>([])
  const [totalRows, setTotalRows] = useState<any>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const pageInfo = { totalRowCount: 0 }
  const fetchData = useCallback(async () => {
    // console.log('fetch: ', endpoint)
    const arr = endpoint.split('/')
    const pickListName = arr.at(-1)
    try {
      setLoading(true)
      if (endpoint.includes(PICKLIST_URL) && !parseInt(pickListName)) {
        // console.log('endpoint arr', arr, ' picklistname:', pickListName)

        fetchPicklistByName(runSet, pickListName)
        // Liferay.Util.fetch(PICKLIST_URL, {
        //   headers: {
        //     'accept': 'application/json',
        //     'x-csrf-token': Liferay.authToken,
        //     "Content-Type": "application/json"
        //   }
        // })
        //   .then((res: {
        //     json(): unknown; text: {}
        //   }) => res.json())
        //   .then((obj: any) => { runSet(obj.items.find((o: { name: string }) => o.name === pickListName)) })
      }
      else if (endpoint.includes('graphql') && body) {
        fetchGraphQL(runSet, body)
      }
      else {
        Liferay.Util.fetch(endpoint)
          .then((res: {
            json(): unknown; text: {}
          }) => res.json())
          .then((obj: any) => { runSet(obj) })
      }
    }
    catch (error) {
      setLoading(false)
      console.log('API call error', endpoint, error)
    }

  }, [endpoint])

  const fetchPicklistByName = (runSet: any, pickListName: string) => {
    Liferay.Util.fetch(PICKLIST_URL, {
      headers: {
        'accept': 'application/json',
        'x-csrf-token': Liferay.authToken,
        "Content-Type": "application/json"
      }
    })
      .then((res: {
        json(): unknown; text: {}
      }) => res.json())
      .then((obj: any) => {/* console.log('found picklist:', obj.items.find((o: { name: string }) => o.name === pickListName)); */ runSet(obj.items.find((o: { name: string }) => o.name === pickListName)) })
  }
  
  const fetchGraphQL = (runSet: any, query: string) => {
    Liferay.Util.fetch("/o/graphql", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query),
      method: 'POST'
    })
      .then((res: { json(): unknown, text: {} }) => res.json())
      .then((obj: any) => {
        const objItems = getItemsFromObject(obj)
        setLoading(false)
        runSet({items: objItems})
      })
  }

  function runSet(obj: any) {
    try {
      if (obj?.total_rows) setTotalRows(obj['total_rows'])
    } catch (error) { console.error(error) }
    let items = []
    // if (obj.data.c) {
    //   items = getItemsFromObject(obj.data.c)
    // }
    // console.log('fetch obj', obj)
    if (obj?.items) items = obj.items
    if (obj?.listTypeEntries) items = obj.listTypeEntries
    setLoading(false)
    // console.log('fetch items', items)
    setData(items)
  }
  useEffect(() => {
    if (endpoint) fetchData()
  }, [endpoint])
  try {
    pageInfo.totalRowCount = totalRows
  } catch (error) {
    pageInfo.totalRowCount = 0
  }
  return { data, pageInfo, loading, fetchData }
}



export function generateEndpoint(args: any): any {
  let pStr = '', keys: any = []
  try {
    if (args.params) {
      keys = Object.keys(args.params)
      let op = '?'
      for (const i in keys) {
        pStr += `${op}${keys[i]}=${args.params[keys[i]]}`
        op = '&'
      }
      if (args.proxy) {
        const bdy = { path: '_ajax.php' + pStr }
        bdy.path = btoa(bdy.path)
        const p = JSON.stringify({ path: bdy.path })
        const e = encodeURIComponent(p)
        pStr = "/passthrough?body=" + e
      }
    }
  } catch (error) { console.error(error) }
  if (args.endpoint) {
    return `${host}${args.endpoint}${pStr}`
  } else if (args.elastic) {
    return `${host}/o/elastic-connector-api/${args.elastic}${pStr}`
  } else if (args.object) {
    return `${host}/o/c/${args.object}${pStr}`
  } else if (args.proxy) {
    return `${host}/o/${args.proxy}${pStr}`
  } else if (args.graphQL) {
    return `${host}/o/graphql`
  } else if (args.picklist) {
    // if (!parseInt(args.picklist)) { //if not a number, assume searching picklist by name
    //   return PICKLIST_URL
    // }
    return `${PICKLIST_URL}/${args.picklist}`
  }
  return args
}
