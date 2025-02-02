import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const RouterData = () => {
    const strictRoute = createBrowserRouter(
        [
            {
                path: '/',
                element: <Home />,
                errorElement: <Error />
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    )
    return strictRoute;
}
export default RouterData;