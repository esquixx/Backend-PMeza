import FileManager from "./file.manager.js"

export default class Session extends FileManager {
    constructor(filename = './db.session.json') {
        super(filename)
    }

    getSession = async () => { return this.get() }
    getSessionById = async id => { return this.getById(id) }
    createSession = async (user) => { 
        console.log("DESDE FILE " + JSON.stringify(user))
        return this.add(user) 
    }
    getSessionOne = async ({email}) => {
        const data = await this.get()
        const search = data.find(d => d.email == email)
        return search
    }
    updateSessionCart = async (id, cartID) => {
         const update = this.update(id, cartID)
         return update
    }
}