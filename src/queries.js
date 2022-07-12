const { response, request } = require('express')

const Pool = require('pg').Pool
const db = new Pool({
    host:'localhost',
    database:'dailygrind_db',
    user:'postgres',
    password:'senai',
    port: 5432
})

const getUsuario = (request, response) => {
    db.query('SELECT * FROM USUARIO ORDER BY IDUSUARIO',
    (error, results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getConquista = (request, response) => {
    db.query('SELECT * FROM CONQUISTAS ORDER BY IDCONQUISTA',
    (error, results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTarefa = (request, response) => {
    db.query('SELECT * FROM TAREFA ORDER BY IDTAREFA',
    (error, results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getGrupo = (request, response) => {
    db.query('SELECT * FROM GRUPO ORDER BY IDGRUPO',
    (error, results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getUsuarioById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM USUARIO WHERE IDUSUARIO = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getConquistaById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM CONQUISTA WHERE IDCONQUISTA = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getTarefaById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM TAREFA WHERE IDTAREFA = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getGrupoById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM GRUPO WHERE IDGRUPO = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUsuario = (request, response) => {
    try{
        const {senha, email, nome} = request.body

        db.query('INSERT INTO USUARIO(senha, email, nome) VALUES($1, $2, $3)',
        [senha, email, nome], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Usuario adicionado')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o registro. ' + error
        })
    }
}
const createConquista = (request, response) => {
    try{
        const {imagem, descricao} = request.body

        db.query('INSERT INTO CONQUISTA(imagem, descricao) VALUES($1, $2)',
        [imagem, descricao], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Conquista adicionada')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir a Conquista.' + error
        })
    }
}
const createTarefa = (request, response) => {
    try{
        const {nome, descricao, data_tarefa, prioridade} = request.body

        db.query('INSERT INTO TAREFA (nome, descricao, data_tarefa, prioridade) VALUES($1, $2, $3, $4)',
        [nome, descricao, data_tarefa, prioridade], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Tarefa adicionada')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir a tarefa.' + error
        })
    }
}
const createGrupo = (request, response) => {
    try{
        const {idusuario, nome, descricao} = request.body

        db.query('INSERT INTO GRUPO (idusuario, nome, descricao) VALUES($1, $2, $3, $4)',
        [idusuario, nome, descricao], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Grupo adicionado')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o grupo.' + error
        })
    }
}
const updateUsuario = (request, response) => {
    const idusuario = parseInt(request.params.id)
    const {senha, email, nome} = request.body

    db.query('UPDATE usuario SET senha = $1,email = $2, nome = $3 WHERE idusuario = $4',
    [senha, email, nome, idusuario], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Usuario atualizado')
    })
}
const updateConquista = (request, response) => {
    const idconquista = parseInt(request.params.id)
    const {imagem, descricao} = request.body

    db.query('UPDATE CONQUISTA SET IMAGEM = $1, DESCRICAO = $2 WHERE idconquista = $3',
    [imagem, descricao], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Conquista atualizada')
    })
}
const updateTarefa = (request, response) => {
    const idtarefa = parseInt(request.params.id)
    const {nome, descricao, data_tarefa, prioridade} = request.body

    db.query('UPDATE TAREFA SET NOME = $1, DESCRICAO = $2, DATA_TAREFA = $3, PRIORIDADE = $4 WHERE idtarefa = $5',
    [nome, descricao, data_tarefa, prioridade], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Tarefa atualizada')
    })
}
const updateGrupo = (request, response) => {
    const idgrupo = parseInt(request.params.id)
    const {idusuario, nome, descricao} = request.body

    db.query('UPDATE CONQUISTA SET IDUSUARIO = $1, NOME = $2, DESCRICAO = $3 WHERE idgrupo = $4',
    [idusuario, nome, descricao], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Grupo atualizado')
    })
}
const deleteUsuario = (request, response) => {
    const idusuario = parseInt(request.params.id)

    db.query('DELETE FROM usuario WHERE idusuario = $1', [idusuario],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}
const deleteConquista = (request, response) => {
    const idconquista = parseInt(request.params.id)

    db.query('DELETE FROM conquista WHERE idconquista = $1', [idconquista],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}
const deleteTarefa = (request, response) => {
    const idtarefa = parseInt(request.params.id)

    db.query('DELETE FROM tarefa WHERE idtarefa = $1', [idtarefa],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}
const deleteGrupo = (request, response) => {
    const idgrupo = parseInt(request.params.id)

    db.query('DELETE FROM grupo WHERE idgrupo = $1', [idgrupo],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}
module.exports = {
    getUsuario,
    getConquista,
    getTarefa,
    getGrupo,
    getUsuarioById,
    getConquistaById,
    getTarefaById,
    getGrupoById,
    createUsuario,
    createConquista,
    createTarefa,
    createGrupo,
    updateUsuario,
    updateConquista,
    updateTarefa,
    updateGrupo,
    deleteUsuario,
    deleteConquista,
    deleteTarefa,
    deleteGrupo
}