import React, { useState } from 'react';
import { Member } from '../types';
import './CreateGroupModal.css';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (name: string, members: Member[]) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState<Member[]>([]);

  const handleAddMember = () => {
    if (memberName.trim()) {
      const newMember: Member = {
        id: Date.now().toString(),
        name: memberName.trim()
      };
      setMembers([...members, newMember]);
      setMemberName('');
    }
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleSubmit = () => {
    if (groupName.trim() && members.length > 0) {
      onCreateGroup(groupName.trim(), members);
      setGroupName('');
      setMembers([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New Group</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <div className="form-group">
            <label>Add Members</label>
            <div className="add-member">
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter member name"
                onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
              />
              <button type="button" onClick={handleAddMember}>Add</button>
            </div>
          </div>

          {members.length > 0 && (
            <div className="members-list">
              <h4>Members ({members.length})</h4>
              {members.map((member) => (
                <div key={member.id} className="member-item">
                  <span>{member.name}</span>
                  <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={!groupName.trim() || members.length === 0}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;