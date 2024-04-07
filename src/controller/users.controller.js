import { SessionService } from '../service/index.js'
import CustomError from '../errors/custom.errors.js'

export const changeRol = async (req, res , next) => {
    try {
        const uid = req.params.uid

        const user = await SessionService.getSessionById(uid)
        if (!user) {
            CustomError.loginUser(user)
        }
        else {
            if (user.role === 'user') {
                const update = await SessionService.updateRole(user._id, 'premium')
                console.log("ROl: " + update.role)
                return res.json({ status: 'success', payload: update })
            }
            else if (user.role === 'premium') {
                const update = await SessionService.updateRole(user._id, 'user')
                console.log("ROl: " + update.role)
                return res.json({ status: 'success', payload: update })
            }
        }
    } catch (error) {
        next(error)
    }
}
export const updateRol = async (req, res , next ) => {
    try {
        const uid = req.params.uid
        const newRole = req.body.role
        const user = await SessionService.getSessionById(uid)
        if (!user) {
            CustomError.loginUser(user)
        }
        else {
                const update = await SessionService.updateRole(user._id, newRole)
                return res.json({ status: 'success', payload: update })
        }
    } catch (error) {
        next(error)
    }
}
export const allUsers = async (req, res) => {
    try {
        const users = await SessionService.getSession()
        return res.render("usersUpdate", {users})
    } catch (error) {
        console.log("Error al obtener la sesión:", error)
        res.status(500).send("Error interno del servidor")
    }

}
export const deleteInactive = async(req,res) => {
    try {
        const inactive = new Date()
        //Lo dejo en 10 min de inactividad para hacer las prueabas
        inactive.setMinutes(inactive.getMinutes() - 10)

        //inactive.setHours(inactive.getHours() - 48)   comentado dejo las 48hs de inactividad que pide la entrega
       
        //envio el mail a los usuarios inactivos
        const inactiveUsers = await SessionService.inactiveReminder(inactive)
       
        //Borro los usuarios inactivos
        const result = await SessionService.deleteMany({ last_login: { $lt: inactive } })
        res.status(200).send({ message: 'Usuarios inactivos borrados correctamente.', result })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error al intentar borrar usuarios inactivos.' });
    }
}
export const deleteUser = async (req, res) => {
    try {
         const uid = req.params.uid
         console.log("ID DESDE CONTROLLER: 2 //" + uid)
         const userDelete = await SessionService.deleteSession(uid)
         res.sendStatus(204)
    } catch (error) {
        console.log("Error al obtener la sesión:", error)
        res.status(500).send("Error interno del servidor")
    }

}
