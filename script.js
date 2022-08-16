
$(document).ready(function(c) {
    $('.without_login').on('click', function(c){
        $('.message').fadeOut('slow', function(c){
            $('.message').remove();
        });
    });	  
});

function notSupport() {
    mystatus.innerHTML = "Not support this browser"
}

function onError() {
    mystatus.innerHTML = "Something wrong"
}

function onSuccess(stream) {

    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();
    audioInput = context.createMediaStreamSource(stream);

    volume = context.createGain();
    audioInput.connect(volume);
    var bufferSize = 2048;

    recorder = context.createScriptProcessor(bufferSize, 1, 1);

    recorder.onaudioprocess = function (e) {
        var buffer = e.inputBuffer.getChannelData(0);
        var maxVal = 0;

        for (var i = 0; i < buffer.length; i++) {
            if (maxVal < buffer[i]) {
                maxVal = buffer[i];
            }
        }

        mystatus.innerHTML = "Voice Level: " + Math.round(maxVal * 10)*10;

        if (maxVal > .7) {
            mystatus.innerHTML = "Too loud!!";
        }
    }

    volume.connect(recorder);
    recorder.connect(context.destination);
}