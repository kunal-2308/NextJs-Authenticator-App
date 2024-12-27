export default async function userProfile({params}){
    let {id}= await params;
    return(
        <div className="div-main-user-prfile-container flex flex-col justify-center items-center mt-20 gap-y-5">
            <h1>Profile</h1>
            <p className=" text-3xl">This is the profile of <span className="bg-orange-500 p-2 text-black rounded-lg">{id}</span></p>
        </div>
    )
}