const express = require('express');
const userService = require ('./userService');

const app = express (); //nome qualquer para express
app.use(express.json());// vou habilitar json express

// rota para criar usuário

app.post("/users", async (req, res) => {
    const {nome,email,senha,endereço,telefone,cpf}= req.body;
    if (!nome|| !email|| !senha || !endereço || !telefone || !cpf){
        return res.status(400).json 
        ( {error:"Nome e o email são obrigatorios"})
    }

    const user = await userService.addUser(nome,email,senha,endereço,telefone,cpf);
    res.status(200).json({user});
});

//rota para listar todos os usuários

app.get("/users", (req,res) => {
    res.json(userService.getUsers());
});

//rota para excluir um usuario pelo id
app.delete("/users/:id",(req,res) =>{
    const id = parseInt (req.params.id); // converte o ID para número
    try {
        const resultado = userService.deleteUser(id); // tenta excluir o usuario
        res.status(200).json(resultado); // retorna a mensagem de sucesso

    } catch (erro){
        res.status(404).json({ error: erro.message}); // retorna a mensaguem de erro
    }
});

//rota para alterar usuario 
app.put("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const {nome,email,senha,endereço,telefone,cpf} = req.body;
    try {
        const user = userService.putUser(id,nome,email,senha,endereço,telefone,cpf);
        res.status(200).json(user);
    } catch (erro){
        res.status(404).json({error: erro.message});
    }
});

const port = 3000;
app.listen(port,() => {
    console.log("Servidor rodando na porta", port);
})