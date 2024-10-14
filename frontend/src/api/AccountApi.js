import axios from "./axios";

// Login
export const handleLogin = (username, password) =>
  new Promise((resolve, reject) => {
    axios
      .post(
        `/auth/login`,
        { emailOrUsername: username, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((x) => {
        if(x.data.success){
          resolve(x.data.data);
        } else {
          resolve(x.data);
        }
      })
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

// Register / signup
export const registerAccount = (username, email, password) =>
  new Promise((resolve, reject) => {
    axios
      .post(`/auth/signup`, {
        username: username,
        email: email,
        password: password,
      })
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });
