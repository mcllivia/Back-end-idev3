// classe base usuário
class usuário {
constructor (nome, email, senha){
    this.nome = nome;
    this.email = email;
    this._senha = senha; // atributo privado 
}

autenticar (senha){
    return senha === this._senha;
}

alterarSenha(novaSenha){
    this._senha = novaSenha;
    console.log ('Senha alterada com sucesso');
}

}

//exemplo de uso 


// classe adimin que herda de usuário
class admin extends usuário {
    constructor (nome, email, senha, nivelAcesso) {
        super (nome,email,senha); // chama o cosntrutor da classe pai
        this.nivelAcesso = nivelAcesso;
    }
    
    banirUsuario(usuario) {
        console.log(`${usuario.nome} foi banido pelo admin ${this.nome}`);
    }

    // polimorfismo sobrepondo o método autenticar 
    autenticar (senha) {
        return senha === this._senha && this.nivelAcesso === 'alto';
    } 
}

const usuario1 = new usuário ('Luiz', 'luiz@gmail.com', '1234'); 
const usuario2 = new admin ('Maria', 'maria@gmail.com', '6789', 'alto');

console.log(usuario1.autenticar('1234')); //senha certa 
console.log (usuario2.autenticar('6789'));
usuario2.banirUsuario(usuario1);




