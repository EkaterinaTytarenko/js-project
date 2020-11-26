var playlist=document.querySelector('#playlist');
var container=document.querySelector('#container');
var lyricsContainer=document.querySelector('#lyrics');

function loadPlaylist(){
    playlist.innerHTML="";
    if(typeof (localStorage.songCount)!="undefined"&&Number(localStorage.songCount)!=0) {
        for(let i=1;i<=Number(localStorage.songCount);++i) {
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "custom-control-input";
            checkbox.disabled = false;
            checkbox.id = "track" + i;

            var label = document.createElement('label');
            label.className = "custom-control-label";
            label.htmlFor = "track" + i;
            label.innerHTML = localStorage.getItem("song"+i);;

            var span=document.createElement("span");
            span.className="badge badge-dark float-right";
            span.onclick=function(){displayLyrics(i);};
            span.innerHTML="Lyrics->";

            var div = document.createElement('div');
            div.className = "custom-control custom-checkbox";
            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(span);

            var li = document.createElement("li");
            li.className = "list-group-item";
            li.appendChild(div);

            playlist.appendChild(li);
        }

        var button=document.createElement("button");
        button.type="button";
        button.className="btn-lg btn-primary btn-block mt-4";
        button.innerHTML="Delete";
        button.onclick=function () {
            for(let i=Number(localStorage.songCount);i>0;--i)
                if(document.getElementById("track"+i).checked==true)
                    deleteTrack(i);
            location.href=location.href;
            };

        container.appendChild(button);

    }
};

function deleteTrack(number) {
    localStorage.removeItem("song"+number)
    localStorage.removeItem("id"+number)
    songCount=localStorage.songCount;
    for(let i=number+1;i<=songCount;++i){
        var song=localStorage.getItem("song"+i);
        localStorage.removeItem("song"+i);
        localStorage.setItem("song"+(i-1),song);

        var sid=localStorage.getItem("id"+i);
        localStorage.removeItem("id"+i);
        localStorage.setItem("id"+(i-1),id);
    }
    localStorage.songCount=songCount-1;
};

function displayLyrics(number) {
    var songId=localStorage.getItem("id"+number);
    var songTitle=localStorage.getItem("song"+number);

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var url='http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=7b99e57a5650be8e11c7453c0c85fc34&track_id='+songId;

    fetch(proxyUrl+url)
        .then(function(response){
            return response.json();
        })
        .then(function (jsonResponse) {
            lyricsContainer.innerHTML="";
            var h2=document.createElement("h2");
            h2.innerHTML=songTitle;
            var p=document.createElement("pre");
            p.innerHTML=jsonResponse.message.body.lyrics.lyrics_body;
            var div=document.createElement("div");
            div.appendChild(h2);
            div.appendChild(p);

            lyricsContainer.appendChild(div);
        });

};