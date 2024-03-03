const loadAllPost = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await response.json();

    const allPostContainer = document.getElementById('all-post-container');
    data.posts.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="lg:flex justify-between items-center p-5 gap-5 border-solid border-2 border-[#7D7DFC]  bg-[#7D7DFC1A] rounded-3xl">
        <div class="bg-white w-24 h-24 rounded-xl my-auto mx-auto ">
            <img class="pl-20" src="" alt="">
            <img class="" src="${item.image}" alt="">

        </div>
        <!-- main post div -->
       <div class="p-3">
         <!-- Author div -->
      <div class="flex gap-6">
        <p># <span>${item.category}</span> </p>
        <p>Author : <span>${item.author.name}</span></p>
      </div>

      <!-- title & description div -->
     <div>
        <h2 class="text-xl font-bold w-[100%]">${item.title}</h2>
        <p class="w-[100%]">${item.description}</p>
     </div>
     <!-- divider div -->
     <div class="my-8"><img src="images/Line 1.png" alt="">
    </div>
     <!-- comment section -->
     <div class="flex justify-between">

        <div class="flex gap-4">
            <!-- Comment div -->
           <div class="flex items-center gap-2">
               <img src="images/comment (1).png" alt="">
               <span>${item.comment_count}</span>
            </div>
            <!-- eye div -->
            <div class="flex items-center gap-2">
               <img src="images/eye.png" alt="">
               <span>${item.view_count}</span>
            </div>
            <!-- timing div -->
            <div class="flex items-center gap-2">
               <img src="images/watch.png" alt="">
               <p><span>${item.posted_time}</span> min</p>
            </div>

        </div>
        <!-- message div -->
        <div>
           <img src="images/message.png" alt="">
        </div>
     </div>
       </div>


    </div>
    </div>

        `;
        allPostContainer.appendChild(div)

    });
}

const loadLatestNews = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await response.json();

    const latestPostContainer = document.getElementById("latest-post-container");
    latestPostContainer.classList.add("lg:flex");
    data.forEach((post) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="lg:px-10 pt-10 bg-[#7D7DFC1A]">
              <img src="${post.cover_image}" alt="" class="rounded-xl" />
            </figure>
            <div class="card-body gap-4">
              <div>
                <h2 class="card-title"><img src="images/calender.png" alt="">
                  <span class="text-[#12132D99]">${post.author.posted_date}</span></h2>
                  <p class="text-xl font-extrabold">${post.title}</p>
                  <p>${post.description}</p>
              </div>
              <div class="flex justify-start items-center gap-4">
                <img class="w-[44px] h-[44px] rounded-[50px]" src="${post.profile_image}" alt="">
               <div>
                <p class="font-extrabold text-xl">${post.author.name}</p>
                <p>${post?.author?.designation}</p>
               </div>
              </div>
            </div>
          </div>
        `;
        latestPostContainer.appendChild(div);
    })
}



loadLatestNews();
loadAllPost();