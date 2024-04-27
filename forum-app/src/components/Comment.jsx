function Comment() {
    return (
        <div className="flex flex-col border-b-2 border-b-gray-200 gap-4 p-4">
            <div className="flex justify-between">
                <div className="flex">
                    {/* <img src="" alt="" /> */}
                    <h1>nama</h1>
                </div>
                <p>37 menit lalu</p>
            </div>
            <p>komen</p>
            <div className="flex flex-row gap-4 items-center text-sm">
                <button className="flex gap-2 items-center">
                    <span className="material-symbols-outlined">thumb_up</span>
                    <span>100</span>
                </button>                        
                <button className="flex gap-2 items-center">
                    <span className="material-symbols-outlined">thumb_down</span>
                    <span>56</span>
                </button>                        
            </div>
        </div>
    )
}

export default Comment;