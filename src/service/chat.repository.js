export default class ChatRepository {
    constructor(dao) {
        this.dao = dao
    }
    getChats = async () => {
        return this.dao.getChats()
    }
    getChatsById = async id => {
        return this.dao.getChatsById(id)
    }
    save = async (id, user, message) => {
        return this.dao.saveMessage(id, user, message)
    }
    addChats = async chats => {
        return this.dao.createChats(chats)
    }
    updateChats = async (id, body) => {
        return this.dao.updateChats(id, body)
    }
    deleteChats = async id => {
        return this.dao.deleteChats(id)
    }

}