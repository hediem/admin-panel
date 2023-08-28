import Cookies from "js-cookie";

const generateToken = () => {
  const token = "your-auth-token";
  // Set the token as a cookie with a specific expiration time
  return token;
};

const setToken = (token) => {
  Cookies.set("token", token, { expires: 1 });
};

const getToken = () => {
  return Cookies.get("token");
};
export { generateToken, setToken, getToken };
