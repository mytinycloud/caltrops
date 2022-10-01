
export function setTheme(theme: string) {
    if (document.documentElement.getAttribute("data-theme") !== theme ) {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

/*
 * Returns a new object by cloning the source object and then inserting the specified key
 */
export function modifyObject(obj: any, key: string, value: any): any {
    return { ...obj, [key]: value }
}

export function downloadObject(obj: any, filename: string, pretty: boolean = false) {
    // Could instead look at https://github.com/eligrey/FileSaver.js

    let data = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify(obj, undefined, pretty ? 2 : undefined)
    );
    let node = document.createElement('a');
    node.setAttribute("href",     data);
    node.setAttribute("download", filename);
    document.body.appendChild(node); // required for firefox
    node.click();
    node.remove();
}

export function saveObject(name: string, obj: any,) {
    localStorage.setItem(name, JSON.stringify(obj))
}

export function loadObject(name: string): any | null {
    const text = localStorage.getItem(name)
    if (text) {
        return JSON.parse(text)
    }
    return null;
}