import React, { useState } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import CreateGroupModal from './components/CreateGroupModal';
import { Group, Member } from './types';

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSelectGroup = (group: Group) => {
    console.log('Selected group:', group);
  };

  const handleCreateGroup = () => {
    setShowCreateModal(true);
  };

  const handleCreateNewGroup = (name: string, members: Member[]) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      members,
      expenses: [],
      createdAt: new Date().toISOString()
    };
    setGroups([...groups, newGroup]);
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
        <CreateGroupModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateGroup={handleCreateNewGroup}
        />
      </main>
    </div>
  );
}

export default App;