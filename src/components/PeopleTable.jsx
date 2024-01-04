import React, { useEffect } from 'react'
import { getAllPeople } from '../consultas/personasAxios'
import PeopleTableRow from './PeopleTableRow';

export default function PeopleTable({ people, setPeople }) {
    useEffect(() => {
        const fetchPeople = async () => {
            const data = await getAllPeople();
            setPeople(data);
        };

        fetchPeople();
    }, []);
    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            NOMBRE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            DIRECCIÓN
                        </th>
                        <th scope="col" className="px-6 py-3">
                            EDAD
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <PeopleTableRow people={people} setPeople={setPeople} />
                    }
                </tbody>
            </table>
        </div>
    )
}
