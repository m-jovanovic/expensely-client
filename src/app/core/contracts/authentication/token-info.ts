import { Permission } from './permission.enum';

export interface TokenInfo {
  userId: string;
  email: string;
  fullName: string;
  isSetupComplete: boolean;
  primaryCurrency: number;
  permissions: Permission[];
  exp: number;
}
