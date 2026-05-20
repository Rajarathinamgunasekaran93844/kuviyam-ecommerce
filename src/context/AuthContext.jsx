import {
  createContext,
  useState,
  useEffect,
} from "react";

/* ====================================== */
/* CREATE CONTEXT */
/* ====================================== */

export const AuthContext =
  createContext();

/* ====================================== */
/* PROVIDER */
/* ====================================== */

export const AuthProvider = ({
  children,
}) => {
  /* USER STATE */

  const [user, setUser] =
    useState(null);

  /* LOADING STATE */

  const [loading, setLoading] =
    useState(true);

  /* ====================================== */
  /* LOAD USER FROM LOCAL STORAGE */
  /* ====================================== */

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "kuviyamLoggedUser"
      );

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }

    setLoading(false);
  }, []);

  /* ====================================== */
  /* REGISTER USER */
  /* ====================================== */

  const register = (
    userData
  ) => {
    /* SAVE REGISTERED USER */

    localStorage.setItem(
      "kuviyamUser",

      JSON.stringify(userData)
    );

    /* AUTO LOGIN */

    localStorage.setItem(
      "kuviyamLoggedUser",

      JSON.stringify(userData)
    );

    setUser(userData);
  };

  /* ====================================== */
  /* LOGIN USER */
  /* ====================================== */

  const login = (
    loginData
  ) => {
    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "kuviyamUser"
        )
      );

    /* USER NOT FOUND */

    if (!savedUser) {
      return {
        success: false,

        message:
          "No account found. Please register first.",
      };
    }

    /* VALIDATE */

    if (
      savedUser.email ===
        loginData.email &&
      savedUser.password ===
        loginData.password
    ) {
      /* SAVE LOGGED USER */

      localStorage.setItem(
        "kuviyamLoggedUser",

        JSON.stringify(savedUser)
      );

      setUser(savedUser);

      return {
        success: true,

        message:
          "Login successful",
      };
    }

    /* INVALID */

    return {
      success: false,

      message:
        "Invalid email or password.",
    };
  };

  /* ====================================== */
  /* LOGOUT */
  /* ====================================== */

  const logout = () => {
    localStorage.removeItem(
      "kuviyamLoggedUser"
    );

    setUser(null);
  };

  /* ====================================== */
  /* UPDATE PROFILE */
  /* ====================================== */

  const updateProfile = (
    updatedUser
  ) => {
    /* UPDATE MAIN USER */

    localStorage.setItem(
      "kuviyamUser",

      JSON.stringify(updatedUser)
    );

    /* UPDATE LOGGED USER */

    localStorage.setItem(
      "kuviyamLoggedUser",

      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  /* ====================================== */
  /* CONTEXT VALUE */
  /* ====================================== */

  const value = {
    user,

    loading,

    register,

    login,

    logout,

    updateProfile,

    isAuthenticated:
      !!user,
  };

  /* ====================================== */
  /* PROVIDER */
  /* ====================================== */

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};