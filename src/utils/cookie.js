import Cookies from 'js-cookie';

const setCookie = (key, value, expires) => {
    Cookies.set(key, value, {
        expires,
    });
};
const getCookie = (key) => Cookies.get(key);

const removeCookie = (key) => Cookies.remove(key);

export { setCookie, getCookie, removeCookie };
