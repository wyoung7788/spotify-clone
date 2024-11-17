
export default function SideMain(){
    return(
    <div className="overflow-hidden">
        <main className="h-full overflow-y-hidden hover:overflow-y-auto transition-all duration-300 pl-5" >
            <div className="flex flex-col">
                <div className="rounded-3xl bg-zinc-900 p-4">
                <div className="font-bold">Create your first playlist</div>
                <div className="font-thin mt-2">It's easy, we'll help you</div>
                <div>
                    <button className="mt-2 mb-10 button font-bold text-black">Create playlist</button>
                </div>
                </div>

                <div className="mt-3 bg-zinc-900 p-4 rounded-3xl">
                <div className="font-bold pt-5">Let's find some podcasts to follow</div>
                <div className="font-thin pt-2">We'll keep you updated on new episodes</div>
                <div className="mt-3"><button className="button font-bold pb-10 text-black">Browse podcasts</button></div>
            </div>
                </div>
            
        </main>
    </div>
    )
}