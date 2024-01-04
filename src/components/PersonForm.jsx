import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPerson, updatePerson, getPersonById } from '../consultas/personasAxios'

export default function PersonForm({ people, setPeople }) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    const id = params.get('id')

    const [data, setData] = useState({ id: null, nombre: '', direccion: '', edad: '' })

    useEffect(() => {
        if (id) {
            getPersonById(id).then((person) => {
                setData(person)
            }).catch(() => {
                const personFromList = people.find(p => p.id === id)
                if (personFromList) {
                    setData(personFromList)
                }
                console.log(personFromList);
            })
        }
    }, [id])

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let updatedPeople = [...people]
        if (id) {
            const index = updatedPeople.findIndex(p => p.id === id)
            if (index !== -1) {
                updatedPeople[index] = data
            }
            await updatePerson(id, data)
        } else {
            await createPerson(data)
            updatedPeople.push(data)
        }
        setPeople(updatedPeople)
        navigate('/')
    }

    return (
        <>
            <h1 className='text-2xl font-bold mb-10'>Persona</h1>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <input type="hidden" name="id" value={data.id} onChange={handleChange} />
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                        <span className="font-bold">Nombre:</span>
                        <div className="relative">
                            <input type="text" name="nombre" value={data.nombre} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" required />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                        <span className="font-bold">Dirección:</span>
                        <div className="relative">
                            <input type="text" name="direccion" value={data.direccion} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" required />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                        <span className="font-bold">Edad:</span>
                        <div className="relative">
                            <input type="number" name="edad" value={data.edad} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" required />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Guardar</button>
            </form>
        </>
    )
}

