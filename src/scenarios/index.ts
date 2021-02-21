import login from './login';
import logout from './logout';
import registration from './registration';
import updateProfile from './updateProfile';

const getScenarios = (key: string) => {
  switch (key) {
    case 'login':
      return login;
    case 'logout':
      return logout;
    case 'registration':
      return registration;
    case 'updateProfile':
      return updateProfile;
    default:
      throw new Error('Invalid Test Case');
  }
};

export default getScenarios;
