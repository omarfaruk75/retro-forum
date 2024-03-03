const postFunction = async(categoryName)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?{category=categoryName}`);
    const data = await response.json();
    const posts = data.posts;
    posts.forEach((post) => {
        // console.log(post);
        const postContainer = document.getElementById('post-container');
    
        const div = document.createElement('div');

        div.innerHTML = `<div class="grid grid-cols-12 bg-[#f3f3f5] rounded-xl p-2 md:p-8 ">
                            <div class=" col-span-2">
                                <span class="text-end dot -mb-1.5"></span>
                                <img class="max-w-16 rounded-xl " src="${post.image}" alt="">
                            </div>
                            <div class="col-span-10 space-y-6">
                                <div class="flex flex-row gap-6 text-sm text-[#12132DCC]">
                                    <span>#<span>${post.category}</span></span>
                                    <span>Author: <span>${post.author.name}</span></span>
                                </div>
                                <h3 class=" text-base md:text-xl font-bold text-[#12132D] text-start">${post.title}</h3>
                                <p class="text-sm md:text-base text-[#12132D99] text-start">${post.description}</p>
                                <hr style="border-bottom: 2px dashed #12132D40;">
                                <div class="flex flex-row justify-between items-center">
                                    <div class="flex flex-row justify-start gap-2 md:gap-8 items-center">
                                        <p class="flex flex-row justify-center items-center gap-1 md:gap-4"><span
                                                class="material-symbols-outlined">
                                                comment
                                            </span><span>${post.comment_count}</span>
                                        </p>
                                        <p class="flex flex-row justify-center items-center gap-1 md:gap-4"><span
                                                class="material-symbols-outlined">
                                                visibility
                                            </span><span>${post.view_count}</span>
                                        </p>
                                        <p class="flex flex-row justify-center items-center gap-1 md:gap-4"><span
                                                class="material-symbols-outlined">
                                                schedule
                                            </span><span>${post.pooste_time}</span>
                                        </p>
                                    </div>
                                    <div id="draft-post" >
                                        <span class="material-symbols-outlined bg-[#10B981] rounded-full p-1">
                                            drafts
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>`;
                        postContainer.appendChild(div);
    });
}

const handleSearch = ()=>{

        const value = document.getElementById('search-box').value;
        // console.log(value);
        if(value){
            postFunction(value);
        }else{
            alert('please enter a valid category name')
        }
    }
const postCategory = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await response.json();
    data.forEach((category)=>{
        // console.log(category.title);

        const postCategory = document.getElementById('post-category');
        const div = document.createElement('div');
        div.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl p-8 ">
                    <figure><img src="${category.cover_image}"
                            alt="image" /></figure>
                    <div class="card-body space-y-1">
                        <p class="flex flex-row justify-start items-center text-[#12132D99]"><span
                                class="material-symbols-outlined">
                                today
                            </span><span>${category.author.posted_date}</span></p>
                        <h2 class="card-title text-xl font-bold text-[12132d]">${category.title}</h2>
                        <p class="text-[#12132D99] text-base">${category.description.slice(0, 80)}</p>
                        <div class="flex flex-row justify-start items-center gap-8">
                            <div>
                                <img class=" w-10 h-10 rounded-full" src="${category.profile_image}" alt="">
                            </div>
                            <div>
                                <h3 class="text-base font-bold  text-[#12132D]">${category.author.name}</h3>
                                <p class="text-sm  text-[#12132D99]">Unknown</p>
                            </div>
                        </div>
                    </div>
                </div>`;
                postCategory.appendChild(div);
    })
}


postCategory()
postFunction()