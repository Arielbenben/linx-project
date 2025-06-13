import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  smbId: number | null;
  username: string | null;
  token: string | null;
  setSmbId: (id: number | null) => void;
  setUsername: (name: string | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [smbId, setSmbId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    setSmbId(null);
    setUsername(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        smbId,
        username,
        token,
        setSmbId,
        setUsername,
        setToken,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
