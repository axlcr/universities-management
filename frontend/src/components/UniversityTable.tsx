import React, { useEffect, useState } from 'react';
import { University } from '../types/University';
import api from '../services/api';
import Modal from './Modal';
import EditUniversityForm from './EditUniversityForm';

const UniversityTable = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = () => {
    api.get('/universities')
      .then((response) => setUniversities(response.data))
      .catch((error) => console.error(error));
  };

  const openModal = (university: University) => {
    setSelectedUniversity(university);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUniversity(null);
    setModalOpen(false);
  };

  const handleUpdate = () => {
    fetchUniversities();
    closeModal();
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Website</th>
            <th className="border px-4 py-2">Contact Emails</th>
            <th className="border px-4 py-2">Actions</th>
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
              <td className="border px-4 py-2">
                <button
                  onClick={() => openModal(university)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedUniversity && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">Edit University</h2>
          <EditUniversityForm
            university={selectedUniversity}
            onUpdate={handleUpdate}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default UniversityTable;
