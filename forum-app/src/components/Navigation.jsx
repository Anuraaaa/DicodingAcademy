import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionLogin, actionLogout } from "../utils/redux/auth/action";
import { getAccessToken, putAccessToken } from "../utils/data";
import { useEffect } from "react";
import { showToast } from "../utils/toast";

function Navigation() {
    const auth = useSelector((state) => state.auth);
    const isAuthenticate = auth?.isAuth;
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(actionLogout());
        showToast("Behasil Logout", "white", "green");
        putAccessToken("");
    }

    useEffect(() => {
        const accessToken = getAccessToken();

        if (accessToken) {
            dispatch(actionLogin(accessToken));
        }
    }, [dispatch])

    return (
        <div className="bg-gray-700 fixed bottom-0 w-full">
            <div className="container mx-auto flex justify-around p-6">
                <ul className="flex gap-8">
                    <li>
                        <Link to={"/"} className="text-sm text-white flex flex-col items-center">
                            <span className="material-symbols-outlined text-white">gesture</span>
                            <span>Threads</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/leaderboards"} className="text-sm text-white flex flex-col items-center">
                            <span className="material-symbols-outlined text-white">leaderboard</span>
                            <span>Leaderboard</span>
                        </Link>
                    </li>
                    <li>
                        {isAuthenticate?
                    
                        <button className="text-sm text-white flex flex-col items-center" onClick={handleLogout}>
                            <span className="material-symbols-outlined text-white">logout</span>
                            <span>Logout</span>
                        </button>

                        :
                        
                        <Link to={"/login"} className="text-sm text-white flex flex-col items-center">
                            <span className="material-symbols-outlined text-white">login</span>
                            <span>Login</span>
                        </Link>
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation;