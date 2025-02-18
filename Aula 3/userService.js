const User = require ("./user");
class userService {
    constructor() //toda vez que váriavel comece com um valor fixo não precisa por aqui
    {
     this.users = []; // array para armazenar usuário (vazio)
     this.nextId = 1; // contador para gerar id

    }

    addUser(nome,email){
        const user = new User(this.nextId+1, nome, email);
        this.users.push(User);
        return user;
    }
    getUsers(){
        return this.users
    }
}
module.exports = new userService;