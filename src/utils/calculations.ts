import { Expense, Member, Settlement } from '../types';

export interface Balance {
  memberId: string;
  memberName: string;
  balance: number;
}

export const calculateBalances = (expenses: Expense[], members: Member[]): Balance[] => {
  const balances: { [memberId: string]: number } = {};
  
  members.forEach(member => {
    balances[member.id] = 0;
  });

  expenses.forEach(expense => {
    const splitAmount = expense.amount / expense.splitBetween.length;
    
    balances[expense.paidBy] += expense.amount;
    
    expense.splitBetween.forEach(memberId => {
      balances[memberId] -= splitAmount;
    });
  });

  return members.map(member => ({
    memberId: member.id,
    memberName: member.name,
    balance: Math.round(balances[member.id] * 100) / 100
  }));
};

export const calculateSettlements = (balances: Balance[]): Settlement[] => {
  const settlements: Settlement[] = [];
  const debtors = balances.filter(b => b.balance < 0).sort((a, b) => a.balance - b.balance);
  const creditors = balances.filter(b => b.balance > 0).sort((a, b) => b.balance - a.balance);

  let i = 0, j = 0;
  
  while (i < debtors.length && j < creditors.length) {
    const debt = Math.abs(debtors[i].balance);
    const credit = creditors[j].balance;
    const amount = Math.min(debt, credit);
    
    if (amount > 0.01) {
      settlements.push({
        from: debtors[i].memberId,
        to: creditors[j].memberId,
        amount: Math.round(amount * 100) / 100
      });
    }
    
    debtors[i].balance += amount;
    creditors[j].balance -= amount;
    
    if (Math.abs(debtors[i].balance) < 0.01) i++;
    if (Math.abs(creditors[j].balance) < 0.01) j++;
  }
  
  return settlements;
};