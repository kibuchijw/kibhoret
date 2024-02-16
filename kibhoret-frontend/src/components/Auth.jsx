// Function to decode JWT token
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Function to verify JWT token
export const verifyToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
      return decodedToken;
    }
  }
  return null;
};
