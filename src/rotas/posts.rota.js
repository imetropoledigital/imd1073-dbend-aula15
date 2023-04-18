const express = require('express')
const router = express.Router()
const postMid = require('../middleware/validarPost.middleware')
const { Post, Usuario } = require('../db/models')
var multer  = require('multer')
const aws = require('aws-sdk')
const path = require('path')
const ErrorHandler = require('../utils/ErrorHandler')
const autenticar = require('../middleware/autenticacao.mid')

const URL_PATH = process.env.URL_PATH || ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
       cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }
})

const fileFilter = (req, file, cb) => {
    const extensoes = /jpeg|jpg/i
    if (extensoes.test(path.extname(file.originalname))){
        cb(null, true)
    }else{
        return cb('Arquivo não suportado. Apenas jpg e jpeg são suportados.')
    }
}

var upload = multer({ storage: storage, fileFilter: fileFilter })

router.post('/', autenticar, upload.single('foto'))
router.post('/', autenticar, postMid)
router.put('/', autenticar, postMid)

router.get('/', async (req, res) => {
    const posts = await Post.findAll()
    res.json({posts: posts})
})

router.get('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, 
        {include: [{model: Usuario}], raw: true, nest: true})

    const postProcessado = prepararResultado(post)
    res.json({posts: postProcessado})
})

router.post('/:id/upload', upload.single('foto'), async (req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    if (post){
        post.foto = getFullpathFilename(req.file)
        await post.save()
        res.json({msg: "Upload realizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
})

router.post('/', async (req, res, next) => {
    try{
        const data = req.body
        if (req.file){
            data.foto = getFullpathFilename(req.file)
        }
        const post = await Post.create(data)
        res.json({msg: "Post adicionado com sucesso!"})
    }catch (err){
        next(new ErrorHandler(500, 'Falha interna ao adicionar postagem'))
    }
    
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const post = await Post.findByPk(id)
    if (post){
        await post.destroy()
        res.json({msg: "Post deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
})

router.put('/', async (req, res) => {

    const id = req.query.id
    const post = await Post.findByPk(id)

    if (post){
        post.titulo = req.body.titulo
        post.texto = req.body.texto
        await post.save()
        res.json({msg: "Post atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
})
function getFullpathFilename(filename) {
    return `${URL_PATH}/static/uploads/${filename.filename}`
}

function prepararResultado(post){
    const result = Object.assign({}, post)
    if (result.createdAt) delete result.createdAt
    if (result.updatedAt) delete result.updatedAt
    if (result.userId) delete result.userId
    if (result.Usuario){
        if (result.Usuario.senha) delete result.Usuario.senha
        if (result.Usuario.createdAt) delete result.Usuario.createdAt
        if (result.Usuario.updatedAt) delete result.Usuario.updatedAt
    }
    return result
}



module.exports = router