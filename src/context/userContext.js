import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../service/constants";
import useAuth from "../hooks/useAuth";

const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const { token, loggedInUser } = useAuth();
  const [user, setUser] = useState(loggedInUser);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    setloading(true);
    const fetchUser = async () => {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
      const tempUser = await fetch(`${API_URL}/users/${userId}`)
        .then((res) => res.json())
        .then((result) => result.data ?? null);
      setUser(tempUser)
      setloading(false);
    };
    fetchUser();
  }, [token]);

  if (token && loading) { return "loading user" }
  return (
    <userContext.Provider value={{ user }}>
        {children}
    </userContext.Provider>
  )
}

export { userContext, UserContextProvider }
