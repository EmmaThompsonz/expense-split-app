import React from 'react';
import { Member, Expense } from '../types';
import { calculateBalances, calculateSettlements } from '../utils/calculations';
import './BalanceSummary.css';

interface BalanceSummaryProps {
  members: Member[];
  expenses: Expense[];
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ members, expenses }) => {
  const balances = calculateBalances(expenses, members);
  const settlements = calculateSettlements(balances);

  const getMemberName = (id: string) => {
    return members.find(m => m.id === id)?.name || 'Unknown';
  };

  const formatAmount = (amount: number) => {
    return `$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className="balance-summary">
      <h3>Balance Summary</h3>
      
      <div className="balances">
        {balances.map(balance => (
          <div key={balance.memberId} className={`balance-item ${balance.balance >= 0 ? 'positive' : 'negative'}`}>
            <span className="member-name">{balance.memberName}</span>
            <span className="balance-amount">
              {balance.balance >= 0 ? '+' : '-'}{formatAmount(balance.balance)}
            </span>
          </div>
        ))}
      </div>

      {settlements.length > 0 && (
        <div className="settlements">
          <h4>Suggested Settlements</h4>
          {settlements.map((settlement, index) => (
            <div key={index} className="settlement-item">
              <span className="settlement-text">
                {getMemberName(settlement.from)} owes {getMemberName(settlement.to)} {formatAmount(settlement.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BalanceSummary;