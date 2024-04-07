export default class SessionRepository {
    constructor(daoSession, ticketDao, mailModule) {
        this.daoSession = daoSession
        this.mailModule = mailModule
        this.ticketDao = ticketDao
    }
    getSession = async () => {
        return this.daoSession.getSession()
    }
    getSessionOne = async (email, useLean) => {
        return this.daoSession.getSessionOne(email, useLean)
    }
    getSessionById = async id => {
        return this.daoSession.getSessionById(id)
    }
    register = async ({ firest_name, last_name, age, email }, passwordHash) => {
        const newUser = ({
            firest_name,
            last_name,
            age,
            email,
            password: passwordHash,
            role: 'user'
        })
        return this.daoSession.createSession(newUser)
    }
    updateSession = async (id, body) => {
        try {
            return this.daoSession.updateSession(id, body)
        } catch (error) {
            console.log("Error R: " + error)
        }

    }
    updateRole = async (id, rol) => {
        try {
            return this.daoSession.updateRole(id, rol)
        } catch (error) {
            console.log("Error R: " + error)
        }

    }
    deleteSession = async id => {
        return this.daoSession.deleteSession(id)
    }
    updateClientCart = async (userID, cartID) => {
        try {
            const session = await this.daoSession.updateSessionCart(userID, cartID)
            return session
        } catch (error) {
            throw error
        }
    }
    reminder = async (userEmail) => {
        const user = await this.getSessionOne(userEmail, false)

        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        const expirationTimeString = expirationTime.toLocaleString('en-US', { hour12: true });
        console.log("USER EMAIL!")
        // Codificar la cadena de tiempo de expiración para que sea seguro para la URL
        const encodedExpirationTimeString = encodeURIComponent(expirationTimeString)
        const encodedUserEmail = encodeURIComponent(user.email)
        const encodedIdUser = encodeURIComponent(user._id)

        let html = `<div>Mr ${user.firest_name} ,<h2> Password Reset</h2>
        <p>We heard that you lost your password. Sorry about that!</p>
        <p>But don’t worry! You can use the following link to reset your password:</p>
        <a href="http://localhost:8080/api/session/recoveryPass?expirationTime=${encodedExpirationTimeString}&email=${encodedUserEmail}&_id=${encodedIdUser}">Reset your password</a>
        <p>If you don’t use this link within the next hour (${expirationTimeString}), it will expire. 
        <p>Thanks,<br></p></div>`
        const result = this.mailModule.send(user, "Recovery password", html)
        return result
    }

    deleteMany = async (inactive) => {
        return this.daoSession.deleteMany(inactive);
    }

    inactiveReminder = async (inactiveTime) => {
        try {
            const inactiveUsers = await this.daoSession.findInactive(inactiveTime)
            inactiveUsers.forEach(async (user) => {
                const emailContent = `<div>Estimado/a ${user.firest_name},\n\nLamentamos informarle que su cuenta ha sido eliminada debido a la inactividad en el inicio de sesión durante un tiempo prolongado.\n\nAtentamente,\nEl equipo de administración.</div>`;
                await this.mailModule.send(user, 'Eliminación de cuenta por inactividad', emailContent)
                console.log(user.email)
            })
            return inactiveUsers
        } catch (error) {
            throw new Error('Error al buscar usuarios inactivos: ' + error.message)
        }
    }
}