import { useEffect } from "react";
import Header from "../components/Header";
import HeaderThread from "../components/HeaderThread";
import Navigation from "../components/Navigation";
import Thread from "../components/Thread";
import { parseHTML } from "../utils/formatter.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionThread } from "../utils/redux/thread/action.js";
import { getAllThread } from "../utils/data.js";

function Homepage() {
    const auth = useSelector((state) => state.auth);
    const threads = useSelector((state) => state.thread);
    const isAuthenticate = auth?.isAuth;
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchThread() {
            const { data } = await getAllThread();
            dispatch(actionThread(data.threads));
        }
        fetchThread();    
    }, [dispatch]);

    return (
        <>
            <Header/>
            <div className="container pt-24 mx-auto">
                <HeaderThread/>
                {threads?.thread?.map((data, i) => {
                    return (
                        <Thread key={i} title={data.title} body={parseHTML(data.body)} category={data.category} createdAt={data.createdAt} totalComments={data.totalComments} totalLike={data.upVotesBy.length} totalDislike={data.downVotesBy.length} ownerId={data.ownerId} id={data.id}/>
                    )
                })}
            </div>
            {isAuthenticate &&             
                <>
                    <div className="relative">
                        <div className="fixed bottom-28 right-[5%]">
                            <Link to={"/new"} className="bg-gray-700 text-white p-2 rounded-full material-symbols-outlined">add</Link>
                        </div>
                    </div>
                </>
            }
            <Navigation/>
        </>
    )
}

export default Homepage;