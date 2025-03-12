import { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '../routes/config';

export class NavigationService {
  private static navigate: NavigateFunction;

  static init(navigate: NavigateFunction) {
    this.navigate = navigate;
  }
  static goToHome() {
    this.navigate(ROUTES.HOME);
  }
  
  static goToChat() {
    this.navigate(ROUTES.CHAT);
  }

  static goToLogin() {
    this.navigate(ROUTES.AUTH.LOGIN);
  }
}