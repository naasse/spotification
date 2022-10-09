// TODO - all of this should pull from env/params

const url = process.env.NODE_ENV !== "production" ? 'http://localhost:5000' : '';

export const LoginView = () => {
  return (
    <>
      <a href={`${url}/login.do`} className="btn btn-primary">
        Log in with Spotify
      </a>
    </>
  );
};
