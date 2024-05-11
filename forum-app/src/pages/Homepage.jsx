import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeaderThread from "../components/HeaderThread";
import Navigation from "../components/Navigation";
import Thread from "../components/Thread";
import { getAllThread } from "../utils/data.js";
import { parseHTML } from "../utils/formatter.js";
import { Link } from "react-router-dom";

function Homepage() {
    const [threads, setThreads] = useState([]);
    
    useEffect(() => {
        async function fetchThread() {
            const {data} = await getAllThread();
            setThreads(data.threads);
        }
        fetchThread();
    }, [threads]);
    return (
        <>
            <Header/>
            <div className="container pt-24 mx-auto">
                <HeaderThread/>
                {threads.map((data, i) => {
                    return (
                        <Thread key={i} title={data.title} body={parseHTML(data.body)} category={data.category} createdAt={data.createdAt} totalComments={data.totalComments} totalLike={data.upVotesBy.length} totalDislike={data.downVotesBy.length} ownerId={data.ownerId} id={data.id}/>
                    )
                })}
            </div>
            <div className="relative">
                <div className="fixed bottom-28 right-[5%]">
                    <Link to={"/new"} className="bg-gray-700 text-white p-2 rounded-full material-symbols-outlined">add</Link>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default Homepage;