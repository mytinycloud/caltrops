
export function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
}

/*
 * Returns a new object by cloning the source object and then inserting the specified key
 */
export function modifyObject(src_obj, key, value) {
    return { ...src_obj, [key]: value }
}