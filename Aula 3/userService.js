const User = require("./user")
const path = require("path") //modulo p manipular caminhos
const fs = require("fs");//modulo p manipular arquivos
const { json } = require("express");
const bcrypt = require("bcryptjs");
const { error } = require("console");
const mysql = require("./mysql")

class userService{
    constructor(){ //quando não passa parâmetro traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json');    
        this.users = this.loadUsers(); // esse array é pra armazenar o user
        this.nextID = this.getNextId(); //contador para gerar id
    }

    loadUsers(){
        try{ // tenta executar o codigo
        if (fs.existsSync(this.filePath)){ //verfica se o arquivo existe
            const data = fs.readFileSync(this.filePath); //le o arqv
            return JSON.parse(data); // transforma o json em objeto
        }
    }catch(erro){ //caso ocorra um erro
        console.log("erro ao carregar arquivo", erro)
    }
        return[]; //quebra de codigos
    }

    getNextId(){
        try{
        if(this.users.length===-0) return 1; 
        return Math.max(...this.users.map(user => user.id))+1;
        }
        catch (erro) {
          console.log("erro ao buscar o id");
        }
    }

saveUsers(){
    try{
    fs.writeFileSync(this.filePath, JSON.stringify(this.users));
}catch(erro){
    console.log('erro ao salvar arquivo');
}
}

    
    async addUser(nome,email,senha,endereço,telefone,cpf){
        try{
            const senhaCripto = await bcrypt.hash(senha, 10);
            
            const resultados = await mysql.execute(
                `INSERT INTO usuario (nome, email, senha, endereço, telefone, CPF) 
                      VALUES (?, ?, ?, ?, ?, ?);`,
                      [nome, email, senhaCripto, endereço, telefone, cpf]
            );
            return resultados;

        }catch(erro){
            console.log("erro ao adicionar usuário", erro);
            throw erro;
        }
    }
    getUsers(){
        try{
        return this.users;
        }catch(erro){
            console.log("erro ao buscar usuário");
        }
    }
    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        }catch (erro){ 
            console.log("erro ao deletar usuário", erro);
            console.log("erro ao deletar usuário");
        }
    }
    async putUser(id, nome, email, senha, endereço, telefone, cpf) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);
            
            const resultados = await mysql.execute(
                `UPDATE usuario 
                 SET nome = ?, 
                     email = ?, 
                     senha = ?, 
                     endereço = ?, 
                     telefone = ?, 
                     CPF = ?
                 WHERE idusuario = ?;`,
                [nome, email, senhaCripto, endereço, telefone, cpf, id]
            );
            
            return resultados;
        } catch(erro) {
            console.log("Erro ao atualizar usuário", erro);
            throw erro;
        }
    }
}
module.exports = new userService;