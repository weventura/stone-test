import { CanActivateFn } from '@angular/router';
import { TOKEN_AUTH } from '../configuration/constants';

export const authGuard: CanActivateFn = (route, state) => {
  const jwt = TOKEN_AUTH;

  return jwt ? true : false;
};
