const User = require("./user")
const path = require("path") //modulo p manipular caminhos
const fs = require("fs");//modulo p manipular arquivos
const { json } = require("express");
const bcrypt = require("bcryptjs");
const { error } = require("console");
const mysql = require("./mysql");
const { get } = require("http");

class userService{
    
   

    
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
   async getUsers(id){
        try{
       const resultado = await mysql.execute(
        `SELECT idusuario FROM usuario WHERE id = ?`,
        	[id]	);
            console.log("resultado", resultado);
            return resultado;
        }catch(erro){
            console.log("erro ao buscar usuário",erro);
        }
    }
    async deleteUser(id){
        try{

            const users = await this.getUsers(id);
            if(users.length === 0){
                console.log("Usuário não existe!");
                return;
            }
            const resultado = await mysql.execute(
                `DELETE FROM usuario WHERE idusuario = ?`,
                [id]
            );
            return resultado;
        }catch (erro){ 
 
            console.log("erro ao deletar usuário", erro);
           
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