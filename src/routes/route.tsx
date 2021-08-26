import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../providers/Auth";

interface IRoute {
  path: string;
  component: React.FunctionComponent;
  exact?: boolean;
  isPrivate?: boolean;
}

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: IRoute) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
            }}
          />
        );
      }}
    />
  );
};

export default Route;
