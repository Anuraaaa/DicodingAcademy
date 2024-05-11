import { createThread } from "../utils/data";
import { showToast } from "../utils/toast";
import useInput from "./UseInput";
import { useNavigate } from "react-router";

function FormThread() {

    const [title, onTitleChange] = useInput("");
    const [category, onCategoryChange] = useInput("");
    const [body, onBodyChange] = useInput("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title.length === 0)
            return showToast('Gagal membuat diskusi! judul tidak ada', "white", "red");            

        if (title.length > 64)
            return showToast('Gagal membuat diskusi! judul maksimal 64 karakter', "white", "red");            

        if (category.length === 0)
            return showToast('Gagal membuat diskusi! kategori tidak ada', "white", "red");            
        
        if (category.length > 16)
            return showToast('Gagal membuat diskusi! kategori maksimal 16 karakter', "white", "red"); 
        
        if (body.length === 0)
            return showToast('Gagal membuat diskusi! deskripsi tidak ada', "white", "red");            

        if (body.length > 255)
            return showToast('Gagal membuat diskusi! deskripsi maksimal 255 karakter', "white", "red"); 

        const {error, message} = await createThread({title, body, category});
        if (error)
            return showToast(`Gagal membuat diskusi! ${message}`, "white", "red");

        showToast("Berhasil membuat diskusi!", "white", "green");
        navigate('/');
    }

    return (
        <>
            <div className="container px-8 py-16 mx-auto">
            <form className="flex flex-col border border-gray-300 p-8 gap-4 rounded mt-24" onSubmit={handleSubmit}>
                    <h1 className="text-center font-bold">Buat Diskusi Baru</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Judul</label>
                        <input type="text" id="title" className="border border-gray-500 rounded p-2" value={title} onChange={onTitleChange}/>
                    </div>           
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Kategori</label>
                        <input type="text" id="category" className="border border-gray-500 rounded p-2" value={category} onChange={onCategoryChange}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="desc">Deskripsi</label>
                        <textarea id="desc" className="border border-gray-500 rounded p-2 resize-none h-40" value={body} onChange={onBodyChange}></textarea>
                    </div>
                    <div className="flex flex-row justify-end items-center">
                        <button className="bg-gray-700 rounded p-2 w-[10%] text-white">Buat</button>
                    </div>
                </form>            
            </div>    
        </>
    )
}

export default FormThread;