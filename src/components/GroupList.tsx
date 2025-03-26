import React from 'react';
import { Group } from '../types';
import './GroupList.css';

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (group: Group) => void;
  onCreateGroup: () => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onSelectGroup, onCreateGroup }) => {
  return (
    <div className="group-list">
      <div className="group-list-header">
        <h2>Groups</h2>
        <button className="btn-primary" onClick={onCreateGroup}>
          + New Group
        </button>
      </div>
      
      {groups.length === 0 ? (
        <div className="empty-state">
          <p>No groups yet. Create your first group to start splitting expenses!</p>
        </div>
      ) : (
        <div className="groups">
          {groups.map((group) => (
            <div 
              key={group.id} 
              className="group-card"
              onClick={() => onSelectGroup(group)}
            >
              <h3>{group.name}</h3>
              <p>{group.members.length} members</p>
              <p>{group.expenses.length} expenses</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupList;