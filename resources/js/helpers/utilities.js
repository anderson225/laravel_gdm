export default {
    addClass(el, className) {
        if (el.classList) el.classList.add(className)
        else el.className += ' ' + className
    },
    hasClass(el, className) {
        const hasClass = el.classList
            ? el.classList.contains(className)
            : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)

        return hasClass
    },


    checkValidUrl(url) {
        if (
            url.includes('http://localhost') ||
            url.includes('http://127.0.0.1') ||
            url.includes('https://localhost') ||
            url.includes('https://127.0.0.1')
        ) {
            return true
        }
        let pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
            'i'
        ) // fragment locator

        return !!pattern.test(url)
    },

    checkValidDomainUrl(url) {
        if (url.includes('localhost')) {
            return true
        }
        let pattern = new RegExp(
            '^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
        )
        return !!pattern.test(url)
    }
}
