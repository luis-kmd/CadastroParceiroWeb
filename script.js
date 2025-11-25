// ELEMENTOS 
const informacoesElement = document.getElementById('informacoes')
const cadastrarElement = document.getElementById('cadastrar')
const consultarElement = document.getElementById('consultar')
const cnpjElement = document.getElementById('cnpj')


// DESATIVANDO BOTÃO DE CADASTRO

cadastrarElement.disabled = true

// FUNCOES
async function consultar(){
    const dados = `https://publica.cnpj.ws/cnpj/${cnpjElement.value}`

    const res = await fetch(dados)
    const data = await res.json()
    console.log(data)
    // Dados Para Procedure 
    const municipioCodigo = data.estabelecimento.cidade.ibge_id0
    const nomeAbreviado = data.estabelecimento.nome_fantasia
    const dataSituacaoUF = data.estabelecimento.data_inicio_atividade

    // Dados para Interface
    const municipioNome = data.estabelecimento.cidade.nome
    const cnpjValor = data.estabelecimento.cnpj
    const razaoSocial = data.razao_social
    const inscricaoEstadual = data.estabelecimento.inscricoes_estaduais[0].inscricao_estadual
    const endereco = data.estabelecimento.logradouro
    const numero = data.estabelecimento.numero
    const bairro = data.estabelecimento.bairro
    const estado = data.estabelecimento.estado.sigla
    const pais = data.estabelecimento.pais.nome
    const cep = data.estabelecimento.cep

    informacoesElement.innerText = `CNPJ: ${cnpjValor}
                                    Razão Social: ${razaoSocial}
                                    Inscrição Estadual: ${inscricaoEstadual}
                                    Município: ${municipioNome}
                                    Endereço: ${endereco}, ${numero}
                                    Bairro: ${bairro}
                                    Estado: ${estado}
                                    País: ${pais}
                                    CEP: ${cep}`
    cadastrarElement.disabled = false
}


// ACIONAMENTOS
consultarElement.addEventListener('click', consultar)
cnpjElement.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        consultar()
    }
})

