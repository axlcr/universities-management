import React, { useEffect, useState } from 'react';
import { University } from '../types/University';
import api from '../services/api';
import EditUniversityForm from './EditUniversityForm';
import Modal from './Modal';

const UniversityTable = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = () => {
    api
      .get('/universities')
      .then((response) => setUniversities(response.data))
      .catch((error) => console.error(error));
  };

  const openEditModal = (university: University) => {
    setSelectedUniversity(university);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUniversity(null);
    setEditModalOpen(false);
  };

  const handleUpdate = () => {
    fetchUniversities();
    closeEditModal();
  };

  const handleDelete = (universityId: number, universityName: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${universityName}"?`
    );

    if (confirmDelete) {
      api
        .delete(`/universities/${universityId}`)
        .then(() => {
          setUniversities((prevUniversities) =>
            prevUniversities.filter((uni) => uni.id !== universityId)
          );
          setDeleteMessage(`University "${universityName}" deleted successfully.`);
          setTimeout(() => setDeleteMessage(''), 3000);
        })
        .catch((error) => {
          console.error(error);
          alert('An error occurred while deleting the university.');
        });
    }
  };

  return (
    <div className="container mx-auto px-4">
      {deleteMessage && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {deleteMessage}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Location</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Website</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Contact Emails</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university, index) => (
              <tr
                key={university.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-2 px-4 border-b border-gray-200">{university.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{university.location}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {university.website}
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {university.contact_emails.join(', ')}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center space-x-2">
                  <button
                    onClick={() => openEditModal(university)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(university.id, university.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && selectedUniversity && (
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
          <h2 className="text-lg font-bold mb-4">Edit University</h2>
          <EditUniversityForm
            university={selectedUniversity}
            onUpdate={handleUpdate}
            onClose={closeEditModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default UniversityTable;
