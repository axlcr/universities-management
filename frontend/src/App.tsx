import React from 'react';
import UniversityTable from './components/UniversityTable';
import AddUniversityForm from './components/AddUniversityForm';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Universities</h1>
      <AddUniversityForm />
      <UniversityTable />
    </div>
  );
};

export default App;