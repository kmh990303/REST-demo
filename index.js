const express = require('express');
const app = express();
const path = require('path'); //절대 경로를 쓰고 있는지 확인해줌
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true })) //post 형식으로 들어오는 모든 형식의 데이터를 파싱
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go bird watching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysaywoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
}) //index 라우트

app.get('/comments/new', (req, res) => {
    res.render('comments/new', { comments })
}) //제출 폼

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
}) //comment의 Post라우트로 데이터를 제출함

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
}) //특정 아이디의 코멘트를 보게 하는 라우트

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText;
    res.redirect('/comments')
}) //수정

app.delete('/comments/:id', (req,res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
}) //삭제

app.get('/tacos', (req, res) => {
    res.send("GET / tacos response")
})

app.post('/tacos', (req, res) => {
    res.send("POST / tacos response")
})

app.listen(3000, () => {
    console.log('ON PORT 3000!')
})

