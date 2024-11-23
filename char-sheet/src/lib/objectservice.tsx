
class ObjectService {

    root_obj: any
    path: string[]
    setter: (obj: any) => void

    constructor(obj: any, setter: (obj: any) => void, path: string[] = []) {
        this.root_obj = obj
        this.path = path
        this.setter = setter
    }

    // Returns a service that represents a child item
    child(path: string): ObjectService {
        return new ObjectService(this.root_obj, this.setter, [...this.path, path])
    }

    // Returns a service that represents the parent object
    parent(): ObjectService {
        return new ObjectService(this.root_obj, this.setter, this.path.slice(0, -1))
    }

    // Returns a service for a relative object
    // The tree is traversed up 'descend' number of nodes to a parent node
    // Then down the path specified by 'path'
    navigate(path: string[], descend: number = 0): ObjectService {
        let base_path = descend === 0 ? this.path : this.path.slice(0, -descend )
        return new ObjectService(this.root_obj, this.setter, base_path.concat(path))
    }

    // Returns the object described by the service
    subscribe(default_item: any = undefined): any {
        let obj = this.root_obj
        for (let p of this.path) {
            obj = obj[p]
            if (obj === undefined) { return default_item }
        }
        return obj
    }

    // Note: If we plant to rely on memoization, then we should replace all modified objects - treating them as immutable.
    // Replaces the referenced object with a new object, then invokes the setter (republishing the root)
    publish(obj: any) {
        const path_length = this.path.length
        if (path_length)
        {
            // Traverse the object
            let node = this.root_obj
            for (let i = 0; i < path_length - 1; i++) {
                let child = node[this.path[i]]
                // We may be referencing a branch that doesnt exist. Build it as we go.
                if (child === undefined) {
                    child = {}
                    node[this.path[i]] = child
                }
                node = child
            }
            // Set the final item
            node[this.path[path_length - 1]] = obj
            // Notify subscribers. The object must be regenerated, otherwise react ignores the change.
            this.setter( { ...this.root_obj } )
        }
        else {
            this.setter( { ...obj} )
        }
    }

    // Sets a key in the targeted object
    set_key(key: string, value: any) {
        let obj = this.subscribe({})
        obj[key] = value
        this.publish(obj)
    }

    // Deletes a key from the targeted object
    remove_key(key: string) {
        let obj = this.subscribe({})
        delete obj[key]
        this.publish(obj)
    }

    // Sets an item in the targeted array
    set_index(index: number, item: any) {
        let obj = this.subscribe([])
        obj[index] = item
        this.publish(obj)
    }

    // Deletes an item from the targeted array
    remove_index(index: number) {
        let obj = this.subscribe([])
        obj.splice(index, 1)
        this.publish(obj)
    }

    // Inserts an item into the targeted array
    insert_index(index: number, item: any) {
        let obj = this.subscribe([])
        obj.splice(index, 0, item)
        this.publish(obj)
    }

    // Appends an item into the targeted array
    append_index(item: any) {
        let obj = this.subscribe([])
        obj.push(item)
        this.publish(obj)
    }
}

export default ObjectService;