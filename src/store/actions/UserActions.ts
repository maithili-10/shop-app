const ActionTypes = {
  SIGN_IN_SUCCESS: "[User] Login success",
  SIGN_IN_ERROR: "[User] Login error",
  SIGN_OUT: "[User] Logout",
  Address_ERROR: "[User] Register error",
};

const loginSuccess = (user: object) => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    user,
  };
};
const loginError = (error: string) => {
  return {
    type: ActionTypes.SIGN_IN_ERROR,
    error,
  };
};
const logout = () => {
  return { type: ActionTypes.SIGN_OUT };
};

const addressError = (error: string) => {
  return {
    type: ActionTypes.Address_ERROR,
    error,
  };
};


const UserActions = { loginError, loginSuccess, logout,addressError, ActionTypes };
export default UserActions;
