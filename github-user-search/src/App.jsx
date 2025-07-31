import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">GitHub User Search App</h1>
      {/* Future components like <Search /> will be added here */}
      <Search />  
    </div>
  );
}

export default App;
