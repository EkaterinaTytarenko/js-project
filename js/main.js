var button=document.querySelector('#search');
var trackList=document.querySelector('#trackList');
var container=document.querySelector('#container');

button.onclick=function(){
    var country=document.querySelector('#country').value;
    var number=document.querySelector('#number').value;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var url='http://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=7b99e57a5650be8e11c7453c0c85fc34&chart_name=top&page=1&page_size='+number+'&country='+country;

    fetch(proxyUrl+url)
        .then(function(response){
        return response.json();
    })
        .then(function (jsonResponse) {
            trackList.innerHTML='';
            var track_list=jsonResponse.message.body.track_list;
            var ids={};
            for(let i=0;i<track_list.length;++i) {
                trackContainer=track_list[i];

                var checkbox=document.createElement('input');
                checkbox.type="checkbox";
                checkbox.className="custom-control-input";
                checkbox.disabled=false;
                checkbox.id="check"+i;

                var label=document.createElement('label');
                label.className="custom-control-label";
                label.htmlFor="check"+i;
                label.innerHTML=trackContainer.track.artist_name + ' - ' + trackContainer.track.track_name;
                ids["check"+i]=trackContainer.track.track_id;

                var div=document.createElement('div');
                div.className="custom-control custom-checkbox";
                div.appendChild(checkbox);
                div.appendChild(label);

                var li=document.createElement("li");
                li.className="list-group-item";
                li.appendChild(div);

                trackList.appendChild(li);
            }
            if(container.lastChild.nodeName!="BUTTON") {
                var button=document.createElement("button");
                button.type="button";
                button.className="btn-lg btn-dark btn-block mb-3 mt-3";
                button.innerHTML="Save chosen songs to the playlist";
                button.onclick=function () {
                    if(typeof (localStorage.songCount)=="undefined") {
                        localStorage.setItem("songCount","0");
                    }
                    var labels=document.querySelectorAll("label");
                    for(label of labels){
                        var checkBox=document.querySelector("#"+label.htmlFor);
                        if(checkBox.checked){
                            localStorage.songCount=Number( localStorage.songCount)+1;
                            localStorage.setItem("song"+ localStorage.songCount,label.innerHTML);
                            localStorage.setItem("id"+localStorage.songCount,ids[label.htmlFor]);
                        }
                    }
                }
                container.appendChild(button);
            }
        });
};

