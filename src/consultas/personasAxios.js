import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getAllPeople = async () => {
    const response = await axios.get(`${API_URL}/personas`);
    return response.data;
};

export const getPersonById = async (id) => {
    const response = await axios.get(`${API_URL}/personas/${id}`);
    return response.data;
};

export const createPerson = async (personData) => {
    const response = await axios.post(`${API_URL}/personas`, personData);
    return response.data;
};

export const updatePerson = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/personas/${id}`, updatedData);
    return response.data;
};

export const deletePerson = async (id) => {
    const response = await axios.delete(`${API_URL}/personas/${id}`);
    return response.data;
};
