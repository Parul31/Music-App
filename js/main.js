var songs = [
    {
        name: 'Tamma Tamma (Title Track)',
        file: 'song1.mp3',
        album: 'Badrinath ki Dulhania',
        length: '2:56',
        artist: 'Neha Kakkar',
        image: 'tamma.jpg'
    },
    {
        name: 'Humma Humma',
        file: 'song2.mp3',
        album: 'Ok Jaanu',
        length: '3:15',
        artist: 'Badshah',
        image: 'ok-Jaanu.jpg'
    },
    {
        name: 'Nashe Si Chadh Gayi',
        file: 'song3.mp3',
        album: 'Befikre',
        length: '2:34',
        artist: 'Arijit Singh',
        image: 'befikre.jpg'
    },
    {
        name: 'The Breakup Song',
        file: 'song4.mp3',
        album: 'Ae Dil Hai Mushkil',
        length: '2:29',
        artist: 'Nakash Ajiz',
        image: 'breakup.jpg'
    }
];
function toggleSong() {
        var song = document.querySelector('audio');
        if(song.paused == true) {
            console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        }
        else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
    } 
function fancyTimeFormat(time) {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function updateCurrentTime() {
    var song = document.querySelector('audio');
    // console.log(song.currentTime);
    // console.log(song.duration);
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration);
    console.log(currentTime+duration);
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}
window.onload = function() {
    changeCurrentNameDetails(songs[0]);
    songs.forEach(function(song , index) { 
        var name = '#song' + (index+1);
        var songName = $(name);
        songName.find('.song-name').text(song.name);
        songName.find('.song-album').text(song.album);
        songName.find('.song-length').text(song.length);
        songName.find('.song-artist').text(song.artist);
        addSongNameClickEvent(song,index+1);
    });
    updateCurrentTime();
    setInterval(function() {
        updateCurrentTime();
    }, 1000);    
    $('#songs').DataTable({
        paging: false
    }); 
}
function addSongNameClickEvent(songObj, pos) {
    var id = '#song' + pos;
    var audio = document.querySelector('audio');
    $(id).click(function() {
        var currentSong = audio.src;
        if(currentSong.search(songObj.file) != -1) {
            console.log('If statement executing');
            toggleSong();
        }
        else {
            console.log('Else statement executing');
            audio.src = songObj.file;
            toggleSong();
            changeCurrentNameDetails(songObj);
        }
    }); 
}
function changeCurrentNameDetails(songObj) {
    // Code goes here
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
    $('.play-icon').on('click', function() {
        toggleSong();
    });
    $('body').on('keypress', function(event) {
                if (event.keyCode == 32 && event.target.tagName != 'INPUT') {
                    toggleSong();
                }
            });