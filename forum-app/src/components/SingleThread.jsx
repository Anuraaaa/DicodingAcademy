import Comment from "./Comment";
import Header from "./Header";
import Navigation from "./Navigation";

function SingleThread() {
    return(
        <>
            <Header/>
            <div className="container">
                <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-8 shadow-lg">
                    <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                        <p>kategori</p>
                    </div>
                    <h1 className="font-bold text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet beatae accusantium cum quia, exercitationem cumque blanditiis?</h1>
                    <p className="text-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic pariatur dicta aspernatur autem, magni quam sint vel vero. Odit sequi ad autem ratione nisi facilis, totam cumque iure ducimus sed excepturi et, libero quo voluptatibus officia quas dolore, assumenda veritatis mollitia? Consectetur, inventore! Illum perspiciatis sequi illo quas cumque. Vel dolore, facilis iusto in vero veritatis voluptatibus adipisci alias tempora, magnam itaque consectetur temporibus!</p>
                    <div className="flex flex-row gap-4 items-center text-sm">
                        <button className="flex gap-2 items-center">
                            <span className="material-symbols-outlined">thumb_up</span>
                            <span>100</span>
                        </button>                        
                        <button className="flex gap-2 items-center">
                            <span className="material-symbols-outlined">thumb_down</span>
                            <span>56</span>
                        </button>                        
                        <p>331 Hari lalu</p>
                        <p>Dibuat oleh</p>
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