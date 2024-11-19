import React, { useState } from 'react';
import AddUniversityForm from './AddUniversityForm';
import Modal from './Modal';

const AddUniversityPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add University
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-4">Add University</h2>
        <AddUniversityForm />
      </Modal>
    </div>
  );
};

export default AddUniversityPage;
