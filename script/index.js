import navbar from "../components/navbar.js";

let nav = document.getElementById("container");

nav.innerHTML = navbar();

document.getElementById("btn").addEventListener("click", searchVideo);

let ytLogo = document
  .getElementById("logo")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });

//  let  url= "GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=tesla&type=video&key=[YOUR_API_KEY]";

const API = "AIzaSyBCTd42IfwcWwtx-31zxsY8MNH1_QQMLUY";

let results_div = document.getElementById("search_results");

async function searchVideo() {
  try {
    let video_query = document.getElementById("video").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video_query}&type=video&key=${API}&maxResults=20`
    );

    let data = await res.json();

    let videos = data.items; //      &maxResults=20

    //console.log(videos);
    appendVideos(videos);
  } catch (err) {
    console.log("err:", err);
  }
}

const appendVideos = (item) => {
  results_div.innerHTML = "";

  item.forEach(({ snippet, id: { videoId } }) => {
    console.log(snippet);

    let div = document.createElement("div");

    let title = document.createElement("p");
    title.textContent = snippet.title;

    let thumbnail = document.createElement("img");
    thumbnail.src = snippet.thumbnails.medium.url;

    let data_to_send = {
      snippet,
      videoId,
    };

    div.onclick = () => {
      showVideo(data_to_send);
    };

    results_div.append(div);
    div.append(thumbnail, title);
  });
};

function showVideo(data) {
  localStorage.setItem("clicked_video", JSON.stringify(data));

  window.location.href = "video.html";
}

//////////////////////////////////////

async function popular() {
  try {
    // let video_query = document.getElementById("video").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=Ind&type=video&key=${API}&maxResults=20`
    );

    let data = await res.json();

    let videos = data.items;

    console.log(videos);
    appendVideos(videos);
  } catch (err) {
    console.log("err:", err);
  }
}

popular();