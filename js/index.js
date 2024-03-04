const postFunction = async(categoryName='comedy')=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await response.json();
    const posts = data.posts;
   const postContainer = document.getElementById('post-container');
   postContainer.innerHTML = '';
    posts.forEach((post) => {
        // console.log(post);
        const postContainer = document.getElementById('post-container');
        const activePost = document.getElementById('active-post');
        const div = document.createElement('div');
       
        div.innerHTML = `<div class="grid grid-cols-12 bg-[#f3f3f5] rounded-xl p-2 md:p-8 ">
                            <div class=" col-span-2" id="active-post">
                                <span class="text-end dot circle -mb-1.5" id="active-post" style="${post.isActive === true ? 'background-color: #00FF00' : 'background-color: #FF0000'}"></span>
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
                                            </span><span>${post.posted_time}</span>
                                        </p>
                                    </div>
                                    <div id="draft_post" onclick="draftPost('${post.title}', ${post.view_count})")" class="cursor-grabbing" >
                                        <span class="material-symbols-outlined bg-[#10B981] rounded-full p-1">
                                            drafts
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>`;
                        postContainer.appendChild(div);
                        loadingBarFunction(false)
    });
}

const draftPost = (title, count)=>{
 
   const  allDraftPost = document.getElementById('draft_post');
   const titleContainer = document.getElementById('tiltle_container');
   const div = document.createElement('div');
   div.innerHTML = `<div class="flex flex-row justify-between items-center bg-white p-2 rounded-xl">
                                <h3 class="text-base font-semibold text-[#12132D] text-start">${title}
                                </h3>
                                <p class="flex flex-row justify-center items-center gap-4"><span
                                        class="material-symbols-outlined">
                                        visibility
                                    </span><span>${count}</span>
                                </p>
                            </div>`;
    titleContainer.appendChild(div);
    markFunction()
}
const markFunction = () => {
    const countMark = document.querySelector('.count-mark');
    const dotBg = document.querySelector('.circle');
  
    if (dotBg.classList.contains('bg-green-600')) {
        dotBg.classList.remove('bg-green-600');
    } else {
        dotBg.classList.add('bg-green-600');
    }
    let countMarkText = parseInt(countMark.innerText); 
    countMarkText++; 
    countMark.innerText = countMarkText; 

}

const handleSearch = () => {
   setTimeout( loadingBarFunction(true), 2000)
        // Activate loading bar after 2 seconds

        const categoryName = document.getElementById('search-box').value.toLowerCase();

        if (categoryName) {
            postFunction(categoryName);
        } else {
            alert('Please enter a valid category name');
        }
    }


const loadingBarFunction = (isLoading) => {
    const loadingBar = document.getElementById('loading-bar');
    if (isLoading) {
        loadingBar.classList.remove('hidden');
    } else {
        loadingBar.classList.add('hidden');
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
                            </span><span>${category.author.posted_date?category.author.posted_date:'No Publish Date'}</span></p>
                        <h2 class="card-title text-xl font-bold text-[12132d]">${category.title}</h2>
                        <p class="text-[#12132D99] text-base">${category.description.slice(0, 80)}</p>
                        <div class="flex flex-row justify-start items-center gap-8">
                            <div>
                                <img class=" w-10 h-10 rounded-full" src="${category.profile_image}" alt="">
                            </div>
                            <div>
                                <h3 class="text-base font-bold  text-[#12132D]">${category.author.name}</h3>
                                <p class="text-sm  text-[#12132D99]">${category.author.designation?category.author.designation:'unknown'}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
                postCategory.appendChild(div);
    })
}


postCategory()
postFunction()