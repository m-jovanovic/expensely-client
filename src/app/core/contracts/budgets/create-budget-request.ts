export class CreateBudgetRequest {
  constructor(
    public userId: string,
    public name: string,
    public amount: number,
    public currency: number,
    public categories: number[],
    public startDate: Date,
    public endDate: Date
  ) {}
}
