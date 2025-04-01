class User {
    constructor (id,nome,email,senha,endereço,telefone,cpf){
        this.id = id; // id do usuário 
        this.nome = nome; // nome do usuário
        this.email= email; // email do usuário
        this.senha= senha;// senha do usuário
        this.endereço= endereço;// endereço do usuário
        this.telefone= telefone;// telefone do usuário 
        this.cpf= cpf;// cpf do usuário
    }

}
 module.exports = User; // exportar o modulo 