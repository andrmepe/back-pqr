const express = require ('express')
const router = express.Router()

const mysql = require('mysql')

const DB = require ('../db/db')

express().use(express.json())

const connectDB =  mysql.createConnection({
    host: DB.DB_HOST,
    user: DB.DB_USER,
    password: DB.DB_PASSWORD,
    database: DB.DB_NAME
})


router.get('/', (req, res)=>{
    const sql = 'SELECT * FROM infopqr'
    connectDB.query(sql, (error, result)=>{
        if(error){
            res.status(500).send(error)
        } else if (result.length > 0){
            res.status(200).send(result)
        } else {
            res.status(400).send('no request received')
        }
    })
})

router.post('/createRequest', (req, res)=>{
    const sql = 'INSERT INTO infopqr SET ?'
    const variableObject = {
        id_numero: req.body.id_numero,
        tipo_id: req.body.tipo_id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        celular: req.body.celular,
        telefono_fijo: req.body.telefono_fijo,
        correo: req.body.correo,
        titulo_pqr: req.body.titulo_pqr,
        tipo_ticket: req.body.tipo_ticket,
        descripcion: req.body.descripcion,
        estado: req.body.estado 
    }
    connectDB.query(sql, variableObject, (error, result)=>{
        if (error) throw error
        res.send ('succesfully added')
    })
})

router.delete('/delete/:idpqr', (req, res)=>{
    const id = req.params.idpqr
    const sql = `DELETE FROM infopqr WHERE idpqr =${id}`
    connectDB.query(sql, error =>{
        if (error) throw error
        res.send (`solicitud con el id ${id} fue eliminado con exito`)
    })
})
module.exports = router