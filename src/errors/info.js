export const generateUserErrorsInfo = (user) => {
    return `Error al registrar el usuario una o mas propiedades son invalidas o estan incompletas: 
    PROPIEDADES OBLIGATORIAS:
    firest_name: (${user?.firest_name}),
    last_name: (${user?.last_name}),
    age: (${user?.age}),
    email: (${user?.email}),
    `
}

export const loginUserErrorInfo = (use) => {
    return `problems when trying to log in the user does not exist`
}

export const InvalidGitHub = () => {
    return `github access error`
}

export const ProductNotFound =() => {
    return `Product not found`
}

export const ProductInStock =() => {
    return `the product already exists`
}

export const UpdatingError =() => {
    return `Update error`
}

export const DeleteError =() => {
    return `Error when trying to delete, contact the web administrator`
}

export const CartNotFound =() => {
    return `The cart does not exist`
}
export const TicketNotGenerated =() => {
    return `Error: TICKET NOT GENERATED`
}