const User = require("./user");
const path = require('path');// modulo para manipular caminhos
const fs = require('fs'); // modulo para manipular arquivos file system
const bcrypt = require('bcryptjs'); //modulo para criptografar senha

class userService {
    constructor() { //toda vez que váriavel comece com um valor fixo não precisa por aqui
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers();// array para armazenar user 
        this.nextID = this.getNextId(); //contador para gerar id 
    }

    loadUsers() {
        try { //tenta executar o bloco de codigo 
            if (fs.existsSync(this.filePath)) {//verifica se o arquivo existe 
                const data = Fs.readFileSync(this.filePath);//le o arquivo 
                return JSON.parse(data); //transforma o json em objeto 
            }
        } catch (erro) {//caso ocorra algum erro 
            console.log('Erro ao carregar arquivo', erro);
        }
        return [];
    }

    //definir o proximo id a ser utilizado 
    getNextId() {
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1; // retorna o maior id e soma mais um
        } catch (erro) {
            console.log('Erro ao buscar o proxio id', erro);
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users));
        } catch (erro) {
            console.log('Erro ao salvar arquivo',erro);
        }
    }

    async addUser(nome, email,senha,endereço,telefone,cpf) {
    
        try {
            const cpfexistente = this.users.some(user => user.cpf === cpf);
            if (cpfexistente) {throw new Error('CPF já cadastrado');}

            const senhaCripto = await bcrypt.hash(senha,10); //criptografa a senha
            
            const user = new User(this.nextID++, nome, email, senhaCripto, endereço, telefone, cpf)  //cria novo user, e o novoid++ é pra toda vez aumentar um no id
            this.users.push(user) //da um push pra armazenar esse user no array de usuarios
            this.saveUsers();
            return user;
        } catch (erro) {
            console.log('Erro ao adicionar usuario', erro);
            throw erro;
        }
    }

    getUsers() {
        try {
            return this.users
        } catch (erro) {
            console.log('Erro ao buscar usuarios', erro);
        }
    }

   async putUser(id, nome, email, senha, endereço, telefone, cpf) {
        try {
            
            const user = this.users.find(user => user.id === id);
            if (!user) {throw new Error('Usuário não encontrado');}
            
            if (cpf !== user.cpf){
                const cpfexistente = this.users.some(u => u.id !== id && u.cpf === cpf);
                if (cpfexistente) {throw new Error('CPF já cadastrado');}
              
            }
        const senhaCripto = await bcrypt.hash(senha,10);
            user.nome = nome;
            user.email = email;
            user.senha = senha;
            user.endereço = endereço;
            user.telefone = telefone;
            user.cpf = cpf;
            this.saveUsers();
            return user;
        } catch (erro) {
            console.log('Erro ao alterar usuario', erro);
            throw erro;
        }
    }

    deleteUser(id){
        try{

            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        } catch (erro) {
            console.log('Erro ao deletar usuario', erro);
        }
    }

}
   

module.exports = new userService     