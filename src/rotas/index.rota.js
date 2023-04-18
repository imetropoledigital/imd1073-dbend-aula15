const express = require('express')
const router = express.Router()
const { Post, Usuario } = require('../db/models')
const moment = require('moment')
moment.locale('pt-br')

router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [{
                model: Usuario
        }], raw: true, nest: true
    })

    const postResult = posts.map((post) => prepararResultado(post))
    res.render('pages/posts', {posts: postResult, layout: 'layouts/layout-blog.ejs'})
})

router.get('/post/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, 
        {include: [{model: Usuario}], raw: true, nest: true})
    res.render('pages/post', {post:prepararResultado(post), layout: 'layouts/layout-blog.ejs'})
})

function prepararResultado(post){
    const result = Object.assign({}, post)
    result.postadoEm = moment(new Date(result.createdAt)).format('DD [de] MMMM [de] yyyy [as] HH:mm')

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