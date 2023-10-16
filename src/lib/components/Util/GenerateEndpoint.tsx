
// const host = "http://localhost:8080"

const host = ""
export default function generateEndpoint(args: any): any {
    let pStr = '', keys: any = []
    try {
        if (args.params) {
            keys = Object.keys(args.params)
            let op = '?'
            for (let i in keys) {
                pStr += `${op}${keys[i]}=${args.params[keys[i]]}`
                op = '&'
            }
            if (args.proxy) {
                const bdy = { path: '_ajax.php' + pStr }
                bdy.path = btoa(bdy.path)
                let p = JSON.stringify({ path: bdy.path })
                let e = encodeURIComponent(p)
                pStr = "/passthrough?body=" + e
            }
        }
    } catch (error) { }
    if (args.endpoint) {
        return `${host}${args.endpoint}${pStr}`
    } else if (args.elastic) {
        return `${host}/o/elasticConnectorApi/search/${args.elastic}${pStr}`
    } else if (args.object) {
        return `${host}/o/c/${args.object}${pStr}`
    } else if (args.proxy) {
        return `${host}/o/${args.proxy}${pStr}`
    } else if (args.picklist) {
        return `${host}/o/headless-admin-list-type/v1.0/list-type-definitions/${args.picklist}`
    }
    return ''
}