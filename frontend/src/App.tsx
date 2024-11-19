import React, { useState } from 'react';
import UniversityTable from './components/UniversityTable';
import AddUniversityForm from './components/AddUniversityForm';
import Modal from './components/Modal';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="container mx-auto p-4">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 md:p-6 rounded-md shadow-md flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center md:text-left">
          Universities
        </h1>
        <div className="flex justify-center md:justify-end">
          <button
            onClick={openModal}
            className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-md shadow hover:bg-gray-100 transition-all duration-200"
          >
            Add University
          </button>
        </div>
      </header>
      <div className="mt-6">
        <UniversityTable />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-4">Add University</h2>
        <AddUniversityForm />
      </Modal>
    </div>
  );
};

export default App;
