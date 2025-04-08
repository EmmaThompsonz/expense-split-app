import React, { useState } from 'react';
import { Group, Expense } from '../types';
import ExpenseList from './ExpenseList';
import AddExpenseModal from './AddExpenseModal';
import BalanceSummary from './BalanceSummary';
import './GroupDetail.css';

interface GroupDetailProps {
  group: Group;
  onBack: () => void;
  onUpdateGroup: (updatedGroup: Group) => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ group, onBack, onUpdateGroup }) => {
  const [showAddExpense, setShowAddExpense] = useState(false);

  const handleAddExpense = () => {
    setShowAddExpense(true);
  };

  const handleCreateExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      ...expenseData
    };
    
    const updatedGroup = {
      ...group,
      expenses: [...group.expenses, newExpense]
    };
    
    onUpdateGroup(updatedGroup);
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

      {group.expenses.length > 0 && (
        <BalanceSummary
          members={group.members}
          expenses={group.expenses}
        />
      )}

      <AddExpenseModal
        isOpen={showAddExpense}
        members={group.members}
        onClose={() => setShowAddExpense(false)}
        onAddExpense={handleCreateExpense}
      />
    </div>
  );
};

export default GroupDetail;