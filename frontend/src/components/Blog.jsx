import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, test }) => {
  const [visible, setVisible] = useState(false)

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    if (!test) {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      const response = await blogService.put(updatedBlog)
      console.log({ ...blog, likes: blog.likes+1 })
    }
    updateBlog({ ...blog, likes: blog.likes+1 })
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      updateBlog(blog.id)
    }
  }

  return (
    <div style={style}>
      {visible ? (
        <div className="blog">
          {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button><br/>
          {blog.url}<br/>
          likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
          {blog.user.name} <br/>
          {user.username === blog.user.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog