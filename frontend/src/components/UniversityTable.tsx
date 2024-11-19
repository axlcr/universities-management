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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUniversities = [...filteredUniversities].sort((a, b) => {
    let aValue: any = a[sortColumn as keyof University];
    let bValue: any = b[sortColumn as keyof University];

    if (Array.isArray(aValue)) aValue = aValue.join(', ');
    if (Array.isArray(bValue)) bValue = bValue.join(', ');

    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUniversities = sortedUniversities.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4">
      {deleteMessage && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {deleteMessage}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search universities by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border border-gray-300 rounded"
          aria-label="Search universities by name"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer select-none"
                onClick={() => handleSort('name')}
              >
                Name {renderSortIcon('name')}
              </th>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer select-none"
                onClick={() => handleSort('location')}
              >
                Location {renderSortIcon('location')}
              </th>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer select-none"
                onClick={() => handleSort('website')}
              >
                Website {renderSortIcon('website')}
              </th>
              <th
                className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer select-none"
                onClick={() => handleSort('contact_emails')}
              >
                Contact Emails {renderSortIcon('contact_emails')}
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUniversities.map((university, index) => (
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
            {currentUniversities.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 px-4 border-b border-gray-200 text-center text-gray-500"
                >
                  No universities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 space-x-2">
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}

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
