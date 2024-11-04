'use client'
export default function SideMain(){
    <div>
        <main className="flex-1 overflow-y-auto p-4 z-10" >
            <div className="overflow-y-auto hover:overflow-y-scroll">
                <div>Create your first playlist</div>
                <div>It's easy, we'll help you</div>
                <div><button className="button text-black">Create playlist</button></div>
                
            </div>
            <div className="mt-5 bg-zinc-900">
                <div>Let's find some podcasts to follow</div>
                <div>We'll keep you updated on new episodes</div>
                <div><button className="button text-black">Browse podcasts</button></div>
            </div>
        </main>
    </div>
}