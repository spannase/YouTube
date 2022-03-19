import navbar from "../components/navbar.js";

  let nav = document.getElementById("container");

  nav.innerHTML = navbar();

  let ytLogo = document
    .getElementById("logo")
    .addEventListener("click", function () {
      window.location.href = "index.html";
    });

  ///////////////////////////
  let video_data = JSON.parse(localStorage.getItem("clicked_video"));

  let video_div = document.getElementById("video_details");

  let iframe = document.createElement("iframe");

  iframe.src = `https://www.youtube.com/embed/${video_data.videoId}`;
  iframe.width = "95%";
  iframe.height = "65%";
  iframe.setAttribute("allowfullscreen", "true");

  let title = document.createElement("h3");
  title.textContent = video_data.snippet.title;

  let date = document.createElement("p");
  date.textContent = video_data.snippet.publishTime.split("T")[0];

  let br = document.createElement("hr");

  let channelName = document.createElement("h3");
  channelName.textContent = video_data.snippet.channelTitle;

  let description = document.createElement("p");
  description.textContent = video_data.snippet.description;

  let btn = document.getElementById("subscribebtn");
  let channel = document.getElementById("channel");

  channel.append(channelName, btn);
  video_div.append(iframe, title, date, br, channel, description);

  //////////////////recommendation/////////////////////

  async function popular() {
    try {
      // let video_query = document.getElementById("video").value;

      let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=food&type=video&key=AIzaSyBCTd42IfwcWwtx-31zxsY8MNH1_QQMLUY&maxResults=7`
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

  let recommendation = document.getElementById("recommendation");

  const appendVideos = (item) => {
    recommendation.innerHTML = "";

    item.forEach(({ snippet, id: { videoId } }) => {
      console.log(snippet);

      let div = document.createElement("div");
      div.setAttribute("id", "recomm_div");

      let title = document.createElement("p");
      title.textContent = snippet.title;

      let thumbnail = document.createElement("img");
      thumbnail.src = snippet.thumbnails.medium.url;

      let data_to_send = {
        snippet,
        videoId,
      };

   

      recommendation.append(div);
      div.append(thumbnail, title);
    });
  };