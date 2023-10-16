export function paramString(obj:any, pg:any, per_page:any) {
    let params = ''
    for(let key in obj) {
      params += `&${key}=${obj[key]}`
    }
    if(pg) params += `&page=${pg}`
    if(per_page) params += '&per_page=' +  per_page
    return params
}

export function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

interface Column {
    field: string,
    headerName: string,
    flex: number
}

export function columnGenerator(colArr: []): any {
    let arr: Column[] = [], title, tmparr: any
    colArr.forEach((col: any) => {
        if (typeof (col) === 'string') {
            title = col.toUpperCase()
            arr.push({
                "field": col,
                "headerName": title.replace(/_/g, " "),
                "flex": 1,
            })
        } else {
            arr.push(col)
        }
    })
    return arr
}

export const loadPath = (args:any, search:any) => {
    // let pg = subPage();
    let pg = '';
    if (args.pg) {
        pg = args.pg;
    }
    var path = `_ajax.php`;
    if (args.url) {
        path = args.url + path;
    }
    let addon = '';
    if (args.addon) {
        addon = args.addon;
    }
    if (search) {
        addon += '&search=' + search;
    }
    if (args.exact) {
        addon += '&exact=true';
    }
    if (args.misc) {
        addon += '&misc=true';
    }
    if (args.save) {
        addon += '&save=true';
    }
    if (args.addobj) {
        for (let k in args.addobj) {
            if (k !== 'pg') {
                addon += "&" + k + "=" + args.addobj[k];
            }
        }
    }
    if (typeof (sessionStorage.QWNjZXNz) !== 'undefined' && sessionStorage.QWNjZXNz.length > 0) {
        addon += '&QWNjZXNz=' + php7CharClean(sessionStorage.QWNjZXNz, false);
    }
    if (addon === 'undefined') {
        addon = '';
    }
    if (args.meth) {
        addon += '&ajax_only=' + args.meth;
    }
    return path + '?pg=' + pg + addon;
}

export const php7CharClean = (str: string, reverse: boolean) => {
    if (!str || str === '') {
        return '';
    }

    var arr = ["&", "\\~\\~", "\\~", "\\-", "\\!", "@", "\\#", "\\$", "\\%", "\\^", "\\*", "\\(", "\\)", "\\+", "\\=", "\\{", "\\}", "\\[", "\\]", "\\|", "\\:", "\\;", "\\\"", "\\'", "\\`", "\\<", "\\>", "\\\\", "\\/", "\\ ", "src", "SRC", "sql", "style", "STYLE", "Style", "limit", "LIMIT", "Limit", "0x", "0X", ",", "dig", "DIG", "Dig", "make", "MAKE", "Make", "exec@", "EXEC@", "Exec@", "id", "ID", "Id", "rm", "RM", "Rm", "sh", "SH", "Sh", "system", "SYSTEM", "System", "cat", "CAT", "Cat", "like", "LIKE", "Like", "cricket", "CRICKET", "Cricket"];
    var regex;
    for (var i in arr) {
        if (!reverse) {
            regex = new RegExp(arr[i], "g");
            str = str.replace(regex, '_z' + i + 'z_');
        } else {
            if (stristr(str, '_z' + i + 'z_', false)) {
                regex = new RegExp('_z' + i + 'z_', "g");
                str = str.replace(regex, arr[i].replace("\\", ''));
            }
        }
    }
    return str;
}

export const stristr = (haystack: string, needle: string, bool: boolean) => {
    var pos = 0;
    haystack += '';
    pos = haystack.toLowerCase()
        .indexOf((needle + '')
            .toLowerCase());
    if (pos === -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}

export function startPeriod(startYears:number) {
    let date = new Date();
    var intYearStart = date.getFullYear() - startYears;
    var intMonth = date.getMonth();
    var mStr = intMonth.toString()
    if(intMonth < 10) mStr = "0" + mStr
    const startDt = `${intYearStart}${mStr}`
    return startDt
}


export function endPeriod() {
    let date = new Date();
    var intYearEnd = date.getFullYear().toString();;
    var intMonth = date.getMonth();
    var mStr = intMonth.toString()
    if(intMonth < 10) mStr = "0" + mStr
    const endDt = `${intYearEnd}${mStr}`
    return endDt
}
export function startDate(startYears:number) {
    let date = new Date();
    var intYearStart = date.getFullYear() - startYears;
    var intMonth = date.getMonth();
    var intDay = date.getDay()
    const startDt = `${intMonth}-${intDay}-${intYearStart}`
    return startDt
}


export function endDate() {
    let date = new Date();
    var intYearEnd = date.getFullYear();
    var intMonth = date.getMonth();
    var intDay = date.getDay()
    const endDt = `${intMonth}-${intDay}-${intYearEnd}`
    return endDt
}


export function startDateSlashes(startYears:number) {
    let date = new Date();
    var intYearStart = date.getFullYear() - startYears;
    var intMonth = date.getMonth();
    var intDay = date.getDay()
    const startDt = `${intMonth}/${intDay}/${intYearStart}`
    return startDt
}


export function endDateSlashes() {
    let date = new Date();
    var intYearEnd = date.getFullYear();
    var intMonth = date.getMonth();
    var intDay = date.getDay()
    const endDt = `${intMonth}/${intDay}/${intYearEnd}`
    return endDt
}

export function minDate() {
    let date = new Date();
    var intYearStart = date.getFullYear() - 10;
    var intMonth = date.getMonth();
    var intDay = date.getDay()
    const dt = `${intMonth}/${intDay}/${intYearStart}`
    return dt
}