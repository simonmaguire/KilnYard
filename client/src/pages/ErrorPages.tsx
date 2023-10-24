import { useLocation } from "react-router-dom";

export const Page404 = () => {
  return (
    <div className="error-page">
      <h2>Uh Oh! This page was not found</h2>
      <h2>
        <a href="/">Return to Gallery</a>
      </h2>
    </div>
  );
};

export const NotFound = () => {
  let { state } = useLocation();

  return (
    <div className="error-page">
      <h2>Uh Oh! {state.message}</h2>
      <h2>
        <a href="/">Return to Gallery</a>
      </h2>
    </div>
  );
};
