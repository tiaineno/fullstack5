const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const like = async (page, title, expectedLikes) => {
  const element = await page.getByText(title).locator('..')
  await element.getByRole('button', { name: 'like' }).click()
  
  const newPage = page.getByText(title).locator('..')
  await newPage.getByText(`likes ${expectedLikes}`).waitFor()
}

export { loginWith, createBlog, like }