import React from 'react';
import { Expense, Member } from '../types';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: Expense[];
  members: Member[];
  onAddExpense: () => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, members, onAddExpense }) => {
  const getMemberName = (id: string) => {
    const member = members.find(m => m.id === id);
    return member?.name || 'Unknown';
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="expense-list">
      <div className="expense-header">
        <h3>Expenses</h3>
        <button className="btn-primary" onClick={onAddExpense}>
          + Add Expense
        </button>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-expenses">
          <p>No expenses yet. Add an expense to get started!</p>
        </div>
      ) : (
        <div className="expenses">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-main">
                <div className="expense-info">
                  <h4>{expense.description}</h4>
                  <p className="expense-details">
                    Paid by {getMemberName(expense.paidBy)} on {formatDate(expense.date)}
                  </p>
                  <div className="split-info">
                    Split between: {expense.splitBetween.map(id => getMemberName(id)).join(', ')}
                  </div>
                </div>
                <div className="expense-amount">
                  {formatAmount(expense.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;