// const YOUR_API_KEY = "AIzaSyCHo_oUPHcKAvjT1WiuMj2wDYDYIk9ELH4";

let poplr = async () =>{
    try {
        let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=AIzaSyCHo_oUPHcKAvjT1WiuMj2wDYDYIk9ELH4`;
        let res = await fetch(url);
        
        let data = await res.json();
        appendPop(data.items);

        console.log(data);

    } catch (err) {
        console.log(err);
    }
};
poplr();

let appendPop = (data) =>{
        let popular = document.getElementById("popular");
    
        data.forEach(({id, snippet:{thumbnails,localized: {title} }}) =>{
           
            let div = document.createElement("div");
            
    
            let iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${id}`;
            iframe.allow = "fullscreen";
    
            let h3 = document.createElement("h3");
            h3.innerText = title;
    
            div.append(iframe,h3);
    
            popular.append(div);
        })
    }


let search = async () =>{
    let container = document.getElementById("popular");
    container.innerHTML=null;

    let pop_title = document.getElementById("pop_h3");
    pop_title.innerHTML=null;
    try {
        
        let query = document.getElementById("query").value;
        let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyCHo_oUPHcKAvjT1WiuMj2wDYDYIk9ELH4`;
        let res = await fetch(url);
        
        let data = await res.json();
        append(data.items);

        console.log(data);
    } catch (err) {
        console.log(err);
    }
};



let append = (data) =>{
    let container = document.getElementById("container");
    container.innerHTML = null;
    data.forEach((el) => {

        let img = document.createElement("img");
        img.src = el.snippet.thumbnails.medium.url;

        let h3 = document.createElement("h3");
        h3.innerText = el.snippet.title;

        let div = document.createElement("div");
        div.onclick = () => {
            saveVideo(el);
        };
        div.setAttribute("class", "video");
        div.append(img, h3);

        container.append(div);
    });
}

let saveVideo = (data) =>{
   
    localStorage.setItem("video", JSON.stringify(data))
    window.location.href = "video.html";

}