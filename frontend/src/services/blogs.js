import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }
  console.log(newObject)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async object => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, setToken, put, remove }