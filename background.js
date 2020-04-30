
//elements
var speedInput = document.getElementById('speedInput');
var beatsPerMin = document.querySelector('.beats-per-min');
var pausePlay = document.querySelector('.pause');
var pauseButton = document.querySelector('.pauseButton');
var BPMView = document.querySelector('#metronome-count')
var beats = document.querySelectorAll('.audio');
var beats_two = document.querySelectorAll('.audio_two');
var changeSound = document.querySelector('.beat-type');
var beatName = document.querySelector('.beat-name');
var speedButton = document.querySelector('.speed');
var noteType = document.querySelector('.division-class')
var noteTypeButton = document.querySelector('.division')
var initalBeat = 0;
var interval = setInterval(playBeat, 2**31 - 1);
var factor = 1
var defaultTempo = 90
var defaultAccent = 90
var intervals = [defaultAccent, defaultTempo]
var currentSound = 0.2
beats[initalBeat].volume = 0.2
var tripletCount = 1
var STCount = 1
var pauseNum = 0
//actions
speedInput.addEventListener('input', gatherInput);
changeSound.addEventListener('click', numSwich);
noteTypeButton.addEventListener('click', factorSwitch);
pauseButton.addEventListener('click', isPlaying);
window.addEventListener('keyup', function() {
    if (event.which == 32) {
        isPlaying();
    }
    
})
//functions
function numSwich() {
    initalBeat += 1
    if (initalBeat == 6) {
        initalBeat = 0
    }
    if (initalBeat == 0) {
        beatName.innerHTML = 'Ping'
    }
    else if (initalBeat == 1) {
        beatName.innerHTML = 'Kick'
    }
    else if (initalBeat == 2) {
        beatName.innerHTML = 'Drop'
    }
    else if (initalBeat == 3) {
        beatName.innerHTML = 'Bop'
    }
    else if (initalBeat == 4) {
        beatName.innerHTML = 'Flick'
    }
    else if (initalBeat == 5) {
        beatName.innerHTML = 'Pop'
    }
    
}
function playBeat() {
    pausePlay.innerHTML = 'Playing'
    pauseNum = 2;
    beats[initalBeat].currentTime = 0;
    beats[initalBeat].volume = currentSound;
    beats[initalBeat].play();
    accentSwitch();
    pauseButton.classList.remove('clear');
};
function factorSwitch() {
    factor += 1;
    if (factor == 5) {
        factor = 1;
    }
    else if (factor == 1) {
        noteType.innerHTML = 'Quarter'
        accentNumber = 1;
    }
    else if (factor == 2) {
        noteType.innerHTML = 'Eighth'
        accentNumber = 2
    }
    else if (factor == 3) {
        noteType.innerHTML = 'Triplet'
        accentNumber = 3
        
    }
    else if (factor == 4) {
        noteType.innerHTML = 'Sixteenth'
        accentNumber = 4
    }
    setMetronomeSpeed();
}
function accentSwitch() {
    if (factor == 1) {
        currentSound = 1
        noteType.innerHTML = 'Quarter'
    }
    if (factor == 2) {
        figureOutYourLife();
    } 
    if (factor == 3) {
        tripletCount += 1
        if (tripletCount == 1) {
            currentSound = 1
        }
        else {
            currentSound = 0.2
        }
        if (tripletCount == 3) {
            tripletCount = 0
        }
    }
    if (factor == 4) {
        STCount += 1
        if (STCount == 1) {
            currentSound = 1
        }
        else {
            currentSound = 0.2
        }
        if (STCount == 4) {
            STCount = 0
        }
    }
}
function figureOutYourLife() {
    if (currentSound == 0.2) {
        currentSound = 1
    }
    else if (currentSound == 1) {
        currentSound = 0.2
    }
}
function gatherInput() {
    if (this.value > 300 || this.value.length > 3) {
        this.value = 299
    }
    if (this.value < 1) {
        return
    }
    defaultTempo = this.value
    setMetronomeSpeed();
}
function isPlaying() {
    pauseNum += 1
    if (pauseNum == 3) {
        pauseNum = 1
    }
    if (pauseNum == 1) {
        clearInterval(interval)
        pausePlay.innerText = 'Paused'
    }
    if (pauseNum == 2) {    
        clearInterval(interval)
        var BPM = 60/(defaultTempo) * 1000
        interval = setInterval(playBeat, BPM / factor)
        //adding in the BMP count view
        beatsPerMin.innerHTML = defaultTempo + ' BPM'
        pausePlay.innerHTML = 'Playing'
    }
}
function setMetronomeSpeed() {
    clearInterval(interval)
    var BPM = 60/(defaultTempo) * 1000
    interval = setInterval(playBeat, BPM / factor)
    //adding in the BMP count view
    beatsPerMin.innerHTML = defaultTempo + ' BPM'
};


