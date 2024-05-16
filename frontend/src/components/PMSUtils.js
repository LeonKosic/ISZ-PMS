import { jwtDecode } from "jwt-decode";

export const getUsername = () => {
  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  return decodedToken.username;
}