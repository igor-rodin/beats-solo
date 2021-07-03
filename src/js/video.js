$(function(){
  const player = $('#video')[0];
  const playerWrap = $('.video__player');
  const durationBtn = $('#durationBtn');
  const soundBtn = $('#soundBtn');
  const durationLength = $('#durationLength')[0];
  const soundVolume = $('#soundVolume')[0];
  let totalDuration = 0; 
  let durationInterval;

  initPlayer();

  playerWrap.on('click', (event)=>{
    play();
  });

  durationBtn.on('click', (event)=>{
    play();
  });

  soundBtn.on('click', (event) => {
    mute();
  });

  player.onplay = ()=>{
    $(playerWrap).find('.video__player-run').addClass('play');
    durationBtn.addClass('play');
    durationInterval = setInterval(() => {
      updateDurationLength(player.currentTime);
    }, 1000/60);
    
  }

  player.onpause = ()=>{
    if (durationInterval){
      clearInterval(durationInterval)
    };

    $(playerWrap).find('.video__player-run').removeClass('play');
    durationBtn.removeClass('play');
  }

  $('#durationLength').on('input', (event)=>{
    player.currentTime = $('#durationLength').val() * totalDuration / 100;
    updateDurationLength(player.currentTime);
  })

  $('#soundVolume').on('input', (event)=>{
    const curVolume =$('#soundVolume').val();
    if(curVolume == 0) {
      $(soundBtn).addClass('mute');
      player.muted = true;
    }
    else{
      $(soundBtn).removeClass('mute');
      player.muted = false;
    }
    player.volume = $('#soundVolume').val();
    updateVolume(player.volume, soundVolume.max);
  })

  function initPlayer(){
    totalDuration = player.duration;
    durationLength.min = 0;
    durationLength.value = 0;
    durationLength.step = 1;
    durationLength.max = 100;

    player.volume = 0.5;
    soundVolume.min = 0.;
    soundVolume.max = 1.0;
    soundVolume.step = 0.1;
    soundVolume.value = player.volume;
    updateVolume(soundVolume.value, soundVolume.max);
  }

  function play(){
    player.paused ? player.play() : player.pause();
  }

  function mute(){
    player.muted = !player.muted;
    $(soundBtn).toggleClass('mute');
  }

  function updateDurationLength(currentTime){
    const val = percOfDuration(currentTime, totalDuration);
    durationLength.value = val;
    $('#durationLength').css('background', `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${val}%, #333333 ${val}%)`);
  };

  function updateVolume(volume){
    const val = percOfDuration(volume, soundVolume.max);
    $('#soundVolume').css('background', `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${val}%, #333333 ${val}%)`);
  };

  function percOfDuration(duration, total) {
    return Math.round(100 * duration / total);
  }
});