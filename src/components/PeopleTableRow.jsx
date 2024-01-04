import React from 'react'
import { deletePerson } from '../consultas/personasAxios'
import { useNavigate } from 'react-router-dom'

export default function PeopleTableRow({ people, setPeople }) {

    const navigate = useNavigate()

    const handleEdit = (person) => {
        navigate(`/add-person?id=${person.id}`)
    }

    const handleDelete = async (id) => {
        await deletePerson(id)
        // Crear una nueva copia del array sin la persona que se acaba de eliminar
        const newPeople = people.filter(p => p.id !== id)
        setPeople(newPeople)
    }

    return (
        people.map((person) => (
            <tr key={person.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {person.id}
                </th>
                <td className="px-6 py-4">
                    {person.nombre}
                </td>
                <td className="px-6 py-4">
                    {person.direccion}
                </td>
                <td className="px-6 py-4">
                    {person.edad}
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" onClick={() => handleEdit(person)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" onClick={() => handleDelete(person.id)} className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                </td>
            </tr>
        ))
    )
}
