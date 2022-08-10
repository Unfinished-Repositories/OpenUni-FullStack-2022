import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const putPerson = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person)
  return request.then(response => response.data)
}

const deletePerson = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`)
  return request.then(response => response.data)
}

const personService = { getAll, postPerson, putPerson, deletePerson }

export default personService
