import React, { useEffect, useState } from 'react';
import { University } from '../types/University';
import api from '../services/api';

const UniversityTable = () => {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    api.get('/universities')
      .then((response) => setUniversities(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Location</th>
          <th className="border px-4 py-2">Website</th>
          <th className="border px-4 py-2">Contact Emails</th>
        </tr>
      </thead>
      <tbody>
        {universities.map((university) => (
          <tr key={university.id}>
            <td className="border px-4 py-2">{university.name}</td>
            <td className="border px-4 py-2">{university.location}</td>
            <td className="border px-4 py-2">
              <a href={university.website} target="_blank" rel="noopener noreferrer">
                {university.website}
              </a>
            </td>
            <td className="border px-4 py-2">{university.contact_emails.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UniversityTable;
