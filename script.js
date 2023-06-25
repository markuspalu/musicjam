
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = ev.target;
    var isTargetEmpty = target.children.length;
    var isCircle = target.tagName === "IMG";

    function isColorM() {
        var isColorMatch = data + "border" == target.id;
        if (target.id == "recs") {
            return true;
        } else {
            return isColorMatch;
        }
    }

    if (isTargetEmpty === 0 && !isCircle && isColorM()) {
        ev.target.appendChild(document.getElementById(data));
    }

    var progressBar = document.getElementById("progress");
    console.log("current value = " + progressBar.value);
    console.log(playTrack(data));
    checker();
    addAnimations();

}


function playTrack(colorCircle) {
    var circle = document.getElementById(colorCircle);
    var audio;
    switch (colorCircle) {
      case "drag1":
        audio = document.getElementById("sound1");
        break;
      case "drag2":
        audio = document.getElementById("sound2");
        break;
      case "drag3":
        audio = document.getElementById("sound3");
        break;
      case "drag4":
        audio = document.getElementById("sound4");
        break;
      case "drag5":
        audio = document.getElementById("sound5");
        break;
      case "drag6":
        audio = document.getElementById("sound6");
        break;
      case "drag7":
        audio = document.getElementById("sound7");
        break;
    }

    var progressBar = document.getElementById("progress");
    if (circle.parentNode.id == 'recs') { 
        function checkBar() {
            if (progressBar.value === 0 && circle.parentNode.id == 'recs') {
                var audioTracks = document.querySelectorAll(".audio-track");
                for (var i = 0; i < audioTracks.length; i++) {
                    audioTracks[i].currentTime = 0;
                }
                clearInterval(intervalId);
                audio.play()
                }
            } 
    } else {
        audio.pause();
    }
    if (audio.paused) {    
        intervalId = setInterval(checkBar, 1);
    }
}

function checker() {
    var recs = document.getElementsByClassName("recs");
    var progressBar = document.getElementById("progress");
    var audioLength = document.getElementById("sound1").duration;
    
    progressBar.max = audioLength;

    if (recs[0].hasChildNodes() || recs[1].hasChildNodes() || recs[2].hasChildNodes() || recs[3].hasChildNodes() || !recs[4].hasChildNodes()) {
            var duration = audioLength;
            var interval = 10;
            var increment = interval / 1000;
            var value = 0;

            if (progressBar.value === 0) {
                var progressInterval = setInterval(function() {
                    value += increment;
                    progressBar.value = value;
                    if (value >= duration || !recs[0].hasChildNodes() && !recs[1].hasChildNodes() && !recs[2].hasChildNodes() && !recs[3].hasChildNodes() && !recs[4].hasChildNodes()) {
                        value = 0;
                        clearInterval(progressInterval);
                        progressBar.value = value;
                        checker();
                    }
                }, interval);
            }
            return;            
        }

    if (!recs[0].hasChildNodes() && !recs[1].hasChildNodes() && !recs[2].hasChildNodes() && !recs[3].hasChildNodes() && !recs[4].hasChildNodes()) {
        progressBar.value = 0;
        return;
    }    
}



var numEffects = 5;

for (var i = 1; i <= numEffects; i++) {
  var effect = document.getElementById("effect" + i);
  var sfx = document.getElementById("sfx" + i);

  effect.addEventListener("click", function(audio) {
    return function() {
      audio.currentTime = 0;
      audio.play();
    };
  }(sfx));
}

var intervalId;

//   effect.addEventListener("mousedown", function(audio) {  
//     return function() {
//       intervalId = setInterval(function() {
//         audio.currentTime = 0;
//         audio.play();
//       }, 214);
//     };
//   }(sfx));
 
//   document.addEventListener("mouseup", function(audio) {
//     return function() {
//       clearInterval(intervalId);
//       audio.pause();
//     };
//   }(sfx));
// }

function addAnimations() {
    let recAnimations = document.getElementsByClassName('recs');
    for (let i = 0; i < recAnimations.length; i++) {
        if (recAnimations[i].children.length > 0) {
            recAnimations[i].classList.add("animate");
        } else {
            recAnimations[i].classList.remove("animate");
        }
    }
}
