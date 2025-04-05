import React, { useState } from 'react';
import { Member, Expense } from '../types';
import './AddExpenseModal.css';

interface AddExpenseModalProps {
  isOpen: boolean;
  members: Member[];
  onClose: () => void;
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ 
  isOpen, 
  members, 
  onClose, 
  onAddExpense 
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitBetween, setSplitBetween] = useState<string[]>([]);

  const handleMemberToggle = (memberId: string) => {
    setSplitBetween(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    setSplitBetween(members.map(m => m.id));
  };

  const handleClearAll = () => {
    setSplitBetween([]);
  };

  const handleSubmit = () => {
    if (description.trim() && amount && paidBy && splitBetween.length > 0) {
      onAddExpense({
        description: description.trim(),
        amount: parseFloat(amount),
        paidBy,
        splitBetween,
        date: new Date().toISOString(),
        category: ''
      });
      
      setDescription('');
      setAmount('');
      setPaidBy('');
      setSplitBetween([]);
      onClose();
    }
  };

  const isFormValid = description.trim() && amount && paidBy && splitBetween.length > 0;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Expense</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this expense for?"
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Paid by</label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
            >
              <option value="">Select who paid</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <div className="split-header">
              <label>Split between</label>
              <div className="split-actions">
                <button type="button" onClick={handleSelectAll}>All</button>
                <button type="button" onClick={handleClearAll}>None</button>
              </div>
            </div>
            <div className="member-checkboxes">
              {members.map((member) => (
                <label key={member.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={splitBetween.includes(member.id)}
                    onChange={() => handleMemberToggle(member.id)}
                  />
                  <span>{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          {splitBetween.length > 0 && (
            <div className="split-preview">
              <p>Each person pays: ${amount && splitBetween.length ? (parseFloat(amount) / splitBetween.length).toFixed(2) : '0.00'}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;