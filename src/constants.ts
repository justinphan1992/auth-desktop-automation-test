export interface ISCENARIO {
  key: string;
  title: string;
}

export const SCENARIOS: ISCENARIO[] = [
  { key: 'registration', title: 'User can register' },
  { key: 'login', title: 'User can login' },
  { key: 'updateProfile', title: 'User can update profile' },
  { key: 'logout', title: 'User can logout' },
];
