import React, { useState } from 'react';
import { Group } from '../types';
import ExpenseList from './ExpenseList';
import './GroupDetail.css';

interface GroupDetailProps {
  group: Group;
  onBack: () => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ group, onBack }) => {
  const [showAddExpense, setShowAddExpense] = useState(false);

  const handleAddExpense = () => {
    setShowAddExpense(true);
  };

  const totalExpenses = group.expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="group-detail">
      <div className="group-detail-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Groups
        </button>
        <div className="group-info">
          <h2>{group.name}</h2>
          <div className="group-stats">
            <span>{group.members.length} members</span>
            <span>•</span>
            <span>${totalExpenses.toFixed(2)} total</span>
          </div>
        </div>
      </div>

      <div className="members-summary">
        <h3>Members</h3>
        <div className="members-grid">
          {group.members.map((member) => (
            <div key={member.id} className="member-card">
              <span className="member-name">{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      <ExpenseList
        expenses={group.expenses}
        members={group.members}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
};

export default GroupDetail;