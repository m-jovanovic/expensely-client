import { ExpensePerCategoryResponse } from '../../contracts/transactions/expense-per-category-response';

export interface ExpensesPerCategoryStateModel {
  expensesPerCategory: ExpensePerCategoryResponse[];
  isLoading: boolean;
  error: boolean;
}
