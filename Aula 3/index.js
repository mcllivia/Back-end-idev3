const express = require('express')
const userService = require('./userService')

const app = express()
app.use(express.json()) //ativa o json no express

//rota para usuario ser criado
app.post("/users", async (req, res) => {
    try {
        const { nome, email, senha, endereço, telefone, cpf } = req.body //passa um arquivo 
        if (!nome || !email || !senha || !endereço || !telefone || !cpf) { //caso o nome e o email sejam diferentes vai dar erro
            return res.status(400).json({ error: "Todos os campos são obrigatórios" }) //mensagem caso dê erro
        }
        const user = await userService.addUser(nome, email, senha, endereço, telefone, cpf)
        res.status(200).json({ mensagem: "Usuário Cadastrado com Sucesso!" });
    } catch (erro) {
        res.status(401).json({ error: erro.message })
    }
});

//rota pra listar todos os usuarios
app.get("/users", (req, res) => {
    res.json(userService.getUsers())
})

app.delete("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const resultado =  await userService.deleteUser(id)
        if (!resultado) {
            return res.status(406).json({ error: "Usuário não existe" })
        }
      return   res.status(200).json({ resultado })
    } catch (erro) {
    res.status(404).json({ error: erro.message });
    }
})

app.put("/users/:id", async (req, res) => {
    try {
    const id = parseInt(req.params.id)
    const { nome, email, senha, endereço, telefone, cpf } = req.body
        const resultado = userService.putUser (id,nome, email, senha, endereço, telefone, cpf)
        res.status(200).json({ mensagem: "Usuário editado com sucesso!" })
    } catch (erro) {
        console.error("Erro ao editar usuário:", erro);
        res.status(500).json({ error: "Ja possui um usuario com este cpf" });
    }
})

const port = 3000
app.listen(port, () => {
    console.log("O servidor está rodando na porta: ", port)
})