import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const getAll2 = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
}

const update = async (id, newObject) => {
    const response =  await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data
}

const noteService = {
    getAll,
    getAll2,
    create,
    update
}

export default noteService;