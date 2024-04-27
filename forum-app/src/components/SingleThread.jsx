import { useParams } from "react-router";
import Comment from "./Comment";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { getAllUser, getThreadById } from "../utils/data";
import { formatDate } from "../utils/formatter";

function SingleThread() {
    const { threadId } = useParams();
    const [thread, setThread] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        async function fetchThread(threadId) {
            const threadFetch = await getThreadById(threadId);
            setThread(threadFetch);
        }
        async function getUsers() {
            const user = await getAllUser();
            setUsers(user.data.users);
        }
        fetchThread(threadId);
        getUsers();
    }, [thread, users])
    
    const filterUser = users?.filter((data) => data.id == thread.ownerId);
    return(
        <>
            <Header/>
            <div className="container">
                <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-8 shadow-lg">
                    <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                        <p>{thread.category}</p>
                    </div>
                    <h1 className="font-bold text-2xl">{thread.title}</h1>
                    <p className="text-md">{thread.body}</p>
                    <div className="flex flex-row gap-4 items-center text-sm">
                        <button className="flex gap-2 items-center">
                            <span className="material-symbols-outlined">thumb_up</span>
                            <span>{thread.upVotesBy.length}</span>
                        </button>                        
                        <button className="flex gap-2 items-center">
                            <span className="material-symbols-outlined">thumb_down</span>
                            <span>{thread.downVotesBy.length}</span>
                        </button>                        
                        <p>{formatDate(thread.createdAt)}</p>
                        <p>Dibuat oleh {filterUser[0].name}</p>
                    </div>
                    <form action="#" className="flex flex-col gap-4">
                        <h1 className="font-semibold">Beri Komentar</h1>
                        <textarea name="" id="" className="h-32 w-full p-2 border border-gray-500 rounded resize-none"></textarea>
                        <button className="bg-gray-700 text-white p-2 rounded">Kirim</button>
                    </form>
                    <h1 className="font-semibold">Komentar (0)</h1>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default SingleThread;