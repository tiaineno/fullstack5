import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/notification'
import BlogForm from './components/Form'
import Togglable from './components/Togglable'
import LoginForm from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification([`Logged in as ${user.username}`, 'green'])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(['Wrong credentials', 'red'])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    setNotification(['Logged out', 'green'])
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleNewBlog = async (blog) => {
    try {
      console.log(blog)
      const newBlogObject = await blogService.create(blog)
      setBlogs(blogs.concat(newBlogObject))
      blogFormRef.current.toggleVisibility()
      setNotification([`A new blog ${newBlogObject.title} by ${newBlogObject.author} added`, 'green'])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      if (exception.response.status === 401) {
        setNotification(['Error with identifying user, please log out', 'red'])
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } else {
        setNotification(['Title and url required', 'red'])
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  const updateBlog = (newBlog) => {
    if (typeof newBlog === 'string') {
      setBlogs(blogs.filter(blog => blog.id !== newBlog))
      setNotification(['Blog removed', 'green'])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else {
      setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : newBlog))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification}/>
        <LoginForm
          onSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          password={password}
          username={username}
        />
      </div>
    )
  }

  const blogSort = () => (blogs.sort((a, b) => b.likes - a.likes))

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification}/>
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogSort().map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user}/>
      )}
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlog}/>
      </Togglable>


    </div>
  )
}

export default App