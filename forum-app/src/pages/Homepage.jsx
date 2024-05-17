import { useEffect } from "react";
import Header from "../components/Header";
import HeaderThread from "../components/HeaderThread";
import Navigation from "../components/Navigation";
import Thread from "../components/Thread";
import { parseHTML } from "../utils/formatter.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchThread } from "../utils/redux/thread/action.js";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { actionGetUser, actionGetUserLoggedIn } from "../utils/redux/user/action.js";
import Loading from "../components/Loading.jsx";

function Homepage() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(actionGetUser());
        dispatch(actionGetUserLoggedIn());
        dispatch(actionFetchThread());
    }, [dispatch]);
    
    const loading = useSelector((state) => state.loading.loading);
    const filteredThreads = useSelector((state) => state.filteredThread);
    const auth = useSelector((state) => state.auth);
    const threads = useSelector((state) => state.thread);
    const isAuthenticate = auth?.isAuth;
    const users = useSelector((state) => state.user);
    const userLoggedIn = useSelector((state) => state.userLoggedIn);

    return (
        <>
            <Header/>
            <Loading/>
            <div className="container mt-4 mb-32 mx-auto">
                {loading ?
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-4 shadow-lg">
                            <Skeleton className="h-[16px] w-[10%] rounded-xl"/>
                            <Skeleton className="h-[24px] w-full rounded-xl"/>
                            <Skeleton className="h-[24px] w-full rounded-xl"/>
                            <Skeleton className="h-[16px] w-full rounded-xl"/>
                        </div>
                    ))
                    : 
                    <>
                        <HeaderThread threads={threads.thread || []}/>
                        {filteredThreads?.filteredThread?.map((data, i) => {
                            return (
                                <Thread key={i} title={data.title} body={parseHTML(data.body)} category={data.category} createdAt={data.createdAt} totalComments={data.totalComments} likes={data.upVotesBy} dislikes={data.downVotesBy} ownerId={data.ownerId} id={data.id} users={users.user || []} userLoggedIn={userLoggedIn.userLoggedIn}/>
                            )
                        })}
                    </>
                }
                {isAuthenticate &&             
                    <>
                        <div className="relative">
                            <div className="fixed bottom-28 right-[5%]">
                                <Link to={"/new"} className="bg-gray-700 text-white p-2 rounded-full material-symbols-outlined">add</Link>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Navigation/>
        </>
    )
}

export default Homepage;