import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeaderThread from "../components/HeaderThread";
import Navigation from "../components/Navigation";
import Thread from "../components/Thread";
import { getAllThread } from "../utils/data.js";
import { parseHTML } from "../utils/formatter.js";

function Homepage() {
    const [threads, setThreads] = useState([]);
    
    useEffect(() => {
        async function fetchThread() {
            const threadFetch = await getAllThread();
            setThreads(threadFetch);
        }
        fetchThread();
    }, [threads]);
    return (
        <>
            <Header/>
            <div className="container pt-24">
                <HeaderThread/>
                {threads.map((data, i) => {
                    return (
                        <Thread key={i} title={data.title} body={parseHTML(data.body)} category={data.category} createdAt={data.createdAt} totalComments={data.totalComments} totalLike={data.upVotesBy.length} totalDislike={data.downVotesBy.length} ownerId={data.ownerId} id={data.id}/>
                    )
                })}
            </div>
            <Navigation/>
        </>
    )
}

export default Homepage;