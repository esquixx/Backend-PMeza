export default class currentDTO {
    constructor(current){
            this.firest_name = current?.firest_name ?? '""'
            this.last_name = current?.last_name ?? '""'
            this.age = current?.age ?? 0
            this.email = current?.email ?? ''
            this.role = current?.role ?? 'user' 
    }
}