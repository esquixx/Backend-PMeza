import { use } from 'chai'
import SessionModel from '../mongo/models/session.model.js'

export default class Session {
    getSession = async () => {
        const user =  SessionModel.find().lean() 
        return user
    }
    getSessionOne = async ({ email }, useLean = false) => {
        const query = SessionModel.findOne({ email })
        const userFound = useLean ? await query.lean() : await query
        return userFound
    }
    getSessionById = async id => {
        return SessionModel.findById(id)
    }
    createSession = async user => {
        return SessionModel.create(user)
    }
    updateSession = async (id, body) => {
        try {
            return SessionModel.findOneAndUpdate(
                { _id: id },
                { $set: { password: body } },
                { new: true }
            )
        } catch (error) {
            console.log("Error M: " + error)
        }

    }
    updateRole = async (id, rol) => {
        try {
            return SessionModel.findOneAndUpdate(
                { _id: id },
                { $set: { role: rol } },
                { new: true }
            )
        } catch (error) {
            console.log("Error M: " + error)
        }

    }
    updateSessionCart = async (id, cartID) => {
        return SessionModel.findOneAndUpdate(
            { _id: id },
            { $set: { cart: cartID } },
            { new: true }
        )
    }
    deleteSession = async id => {
        return SessionModel.findByIdAndDelete(id)
    }
    deleteMany = async (inactive) => {
        try {
            const result = await SessionModel.deleteMany(inactive);
            return result;
        } catch (error) {
            throw error;
        }
    }
    findInactive = async (inactive) => {
        const userinactive = await  SessionModel.find({ last_login: { $lt: inactive } })
        return userinactive
    }
}