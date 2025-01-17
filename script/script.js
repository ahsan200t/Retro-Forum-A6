const loadAllPost = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await response.json();
  const posts = data.posts;
  displayPost(posts);

}

const displayPost = posts => {
  const allPostContainer = document.getElementById('all-post-container');
  allPostContainer.textContent = '';
  allPostContainer.classList.add('space-y-5')
  posts.forEach(item => {

    const div = document.createElement('div');
    div.innerHTML = `

          <div class="lg:flex justify-between items-center p-5 gap-5 border-solid border-2 border-[#7D7DFC]  bg-[#7D7DFC1A] rounded-3xl">
          <div class="bg-white w-24 h-24 rounded-full my-auto mx-auto relative">
          <div id="active-inactive" class="w-4 h-4 rounded-full absolute -top-1 -right-1  ${item?.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"}">

          </div>
          <div>
            <img class="w-24 rounded-xl" src="${item.image}" />
          </div>
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
            <img onclick="loadMessage('${item.title.replace("'", "")}', '${item.view_count}')" id="message-button" src="images/message.png" alt="">
          </div>
       </div>
         </div>


      </div>
      </div>

          `;
    allPostContainer.appendChild(div);


  });

}

const handleSearch = async () => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
  const data = await response.json();
  const searchData = data.posts;
  displayPost(searchData);

  loadingSpinner(false);

}

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden")
  } else {
    loadingSpinner.classList.add("hidden")
  }
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
                  <span class="text-[#12132D99] text-xs">${post?.author?.posted_date || "No Publish Date"}</span></h2>
                  <p class="text-xl font-extrabold">${post.title}</p>
                  <p>${post.description}</p>
              </div>
              <div class="flex justify-start items-center gap-4">
                <img class="w-[44px] h-[44px] rounded-[50px]" src="${post.profile_image}" alt="">
               <div>
                <p class="font-extrabold text-xl">${post.author.name}</p>
                <p>${post?.author?.designation || "Unknown"}</p>
               </div>
              </div>
            </div>
          </div>
        `;
    latestPostContainer.appendChild(div);
  })
}
const loadMessage = (title, view) => {

  const readSection = document.getElementById("read-count");
  const readSectionText = readSection.innerText;
  let currentReadText = parseInt(readSectionText);
  const totalRead = currentReadText + 1;
  readSection.innerText = totalRead;

  const titleContainer = document.getElementById("title-container");
  const div = document.createElement("div");


  div.innerHTML = `
    <div class="flex p-3 bg-white m-3 rounded-lg">
    <h1 class="text-[16px] font-semibold">${title}</h1>
    <div class="flex justify-center items-center gap-2">
      <img class="w-4 h-3" src="images/eye.png" alt="">
      <span>${view}</span>
    </div>
  </div>
    `;
  titleContainer.append(div);

};


loadLatestNews();
loadAllPost();