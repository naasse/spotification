export const Logout = () => {
  localStorage.removeItem("accessToken");

  return (
    <div>
      You have been logged out. Click <a href="/login">here</a> to log back in.
    </div>
  );
};
