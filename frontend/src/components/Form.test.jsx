/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import BlogForm from './Form'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> ', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'titletest')
  await user.type(inputs[1], 'authortest')
  await user.type(inputs[2], 'urltest')
  await user.click(sendButton)
  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({ title: 'titletest', author: 'authortest', url: 'urltest' })
})