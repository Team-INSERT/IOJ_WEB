import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => cookies.set(name, value, {...options})

export const getCookie = (name: string) => cookies.get(name)

export const deleteCookie = (name: string) => cookies.remove(name,{path: '/'})
