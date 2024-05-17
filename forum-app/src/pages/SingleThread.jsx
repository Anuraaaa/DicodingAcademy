import { useParams } from "react-router";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchSingleThread } from "../utils/redux/thread/action";
import { actionGetUser, actionGetUserLoggedIn } from "../utils/redux/user/action";
import DetailThread from "../components/DetailThread";

function SingleThread() {
    const { threadId } = useParams();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        function fetchThread(threadId) {
            setLoading(true);
            try {
                dispatch(actionFetchSingleThread(threadId));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchThread(threadId);
    }, [threadId, dispatch])

    useEffect(() => {
        dispatch(actionGetUser());
        dispatch(actionGetUserLoggedIn());
    }, [dispatch])

    const users = useSelector((state) => state.user);
    const userLoggedIn = useSelector((state) => state.userLoggedIn);
    const auth = useSelector((state) => state.auth);
    const isAuthenticate = auth?.isAuth;
    const thread = useSelector((state) => state.detailThread);

    return(
        <>
            <Header/>
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-8 shadow-lg mt-4 mb-32">
                    <DetailThread threadId={threadId} loading={loading} thread={thread.detailThread} users={users.user || []} userLoggedIn={userLoggedIn.userLoggedIn} isAuthenticate={isAuthenticate || false}/>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default SingleThread;