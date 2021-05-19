function lpad(srcStr,padStr,len) {
    let s=srcStr
    let i=String(srcStr).length

    while (i<len) {
        s=padStr+s
        i++
    }
    return s
}

export {lpad}