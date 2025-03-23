export interface Member {
  id: string;
  name: string;
  email?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
  category?: string;
}

export interface Group {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
  createdAt: string;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}