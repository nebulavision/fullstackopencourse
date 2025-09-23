import { Router } from 'express'
import { Blog } from '../models/blog.js'

const blogsRouter = Router()

blogsRouter.get('/v1/blogs', (request, response) => {
  Blog.find({})
    .then(posts => response.json(posts))
})

blogsRouter.post('/v1/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(result => response.status(201).json(result))
})

export default blogsRouter
