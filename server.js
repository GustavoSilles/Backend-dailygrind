const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const routes = require('./src/queries')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get ('/', (request, response) => {
    response.json({info: 'SERVIDOR - dailygrind'})
})

app.get('/usuario', routes.getUsuario)
app.get('/usuario/:id', routes.getUsuarioById)
app.post('/usuario', routes.createUsuario)
app.put('/usuario/:id', routes.updateUsuario)
app.delete('/usuario/:id', routes.deleteUsuario)

app.get('/usuario', routes.getConquista)
app.get('/usuario/:id', routes.getConquistaById)
app.post('/usuario', routes.createConquista)
app.put('/usuario/:id', routes.updateConquista)
app.delete('/usuario/:id', routes.deleteConquista)

app.get('/usuario', routes.getTarefa)
app.get('/usuario/:id', routes.getTarefaById)
app.post('/usuario', routes.createTarefa)
app.put('/usuario/:id', routes.updateTarefa)
app.delete('/usuario/:id', routes.deleteTarefa)

app.get('/usuario', routes.getGrupo)
app.get('/usuario/:id', routes.getGrupoById)
app.post('/usuario', routes.createGrupo)
app.put('/usuario/:id', routes.updateGrupo)
app.delete('/usuario/:id', routes.deleteGrupo)

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})