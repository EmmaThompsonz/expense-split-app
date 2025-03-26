import React, { useState } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import { Group } from './types';

function App() {
  const [groups] = useState<Group[]>([]);

  const handleSelectGroup = (group: Group) => {
    console.log('Selected group:', group);
  };

  const handleCreateGroup = () => {
    console.log('Create new group');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Split</h1>
        <p>Split your bills with ease</p>
      </header>
      <main>
        <GroupList 
          groups={groups}
          onSelectGroup={handleSelectGroup}
          onCreateGroup={handleCreateGroup}
        />
      </main>
    </div>
  );
}

export default App;