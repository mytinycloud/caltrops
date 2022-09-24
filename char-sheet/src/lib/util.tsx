
export function setTheme(theme: string) {
    if (document.documentElement.getAttribute("data-theme") !== theme ) {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

/*
 * Returns a new object by cloning the source object and then inserting the specified key
 */
export function modifyObject(src_obj: any, key: string, value: any): any {
    return { ...src_obj, [key]: value }
}