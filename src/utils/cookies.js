
import Cookies from 'js-cookie';

export function clearCookies() {
    Cookies.remove('auth');
    Cookies.remove('refresh');
}