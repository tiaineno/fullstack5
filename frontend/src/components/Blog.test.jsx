/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testiblogi',
  author: 'Testaaja',
  url: 'test.com',
  likes: '99',
  user: {
    name:'Testimies',
    username: 'MrTest',
    id: '34567890'
  }
}
const user = {
  name:'Testimies',
  username: 'MrTest',
  id: '34567890'
}
const updateBlog = () => {}

test('renders title', () => {
  render(<Blog blog={blog} user={user} updateBlog={updateBlog} />)

  const element = screen.getByText('Testiblogi Testaaja')
  expect(element).toBeDefined()
})

test('clicking the button shows other info', async () => {
  render(
    <Blog blog={blog} user={user} updateBlog={updateBlog} />
  )

  const testuser = userEvent.setup()
  const button = screen.getByText('view')
  await testuser.click(button)
  const urlElement = screen.getByText(/test\.com/)
  expect(urlElement).toBeDefined()
  const nameElement = screen.getByText(/Testimies/)
  expect(nameElement).toBeDefined()
  const likesElement = screen.getByText(/likes 99/)
  expect(likesElement).toBeDefined()
})

test('clicking the like button twice calls updateBlog twice', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} user={user} updateBlog={mockHandler} test={true}/>)

  const testuser = userEvent.setup()

  const button = screen.getByText('view')
  await testuser.click(button)

  const likeButton = screen.getByText('like')
  await testuser.click(likeButton)
  await testuser.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})