import { test, describe } from 'node:test'
import assert from 'node:assert'
import { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes } from '../utils/list_helper.js'

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []
  const result = dummy(blogs)

  assert.strictEqual(result, 1
  )
})

describe('Total likes', () => {
  test('when list has only one blog, equals its likes', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals sum of their likes', () => {
    const result = totalLikes(blogs)

    assert.strictEqual(result, 36)
  })
})

describe('Favourite blog', () => {
  test('when list is empty, returns empty list', () => {
    const result = favouriteBlog([])

    assert.deepStrictEqual(result, [])
  })

  test('when list has one blog, equals it', () => {
    const result = favouriteBlog(listWithOneBlog)

    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when list has multiple blogs, returns the blog with more likes', () => {
    const result = favouriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[2])
  })
})

describe('Author with the most number of blogs', () => {
  test('when list has one blog, equals it', () => {
    const result = mostBlogs(listWithOneBlog)

    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('when list has multiple blogs, return the author with most blogs', () => {
    const result = mostBlogs(blogs)

    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('Author with the most number of likes', () => {
  test('when list has one blog, equals it', () => {
    const result = mostLikes(listWithOneBlog)

    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('when list has multiple blogs, return the author with most blogs', () => {
    const result = mostLikes(blogs)

    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
