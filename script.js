/*const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const commentSection = document.getElementById('commentSection');

let tapCount = 0;
let lastTapTime = 0;
let tapTimeout;

overlay.addEventListener('click', (e) => {
  const currentTime = new Date().getTime();
  const tapInterval = currentTime - lastTapTime;

  const x = e.clientX;
  const width = overlay.clientWidth;
  const third = width / 3;

  tapCount++;

  clearTimeout(tapTimeout);

  tapTimeout = setTimeout(() => {
    if (tapCount === 1) {
      // Single tap center: Pause/play
      if (x > third && x < 2 * third) {
        video.paused ? video.play() : video.pause();
      }
    } else if (tapCount === 2) {
      // Double tap right: Forward 10s
      if (x > 2 * third) {
        video.currentTime += 10;
      }
      // Double tap left: Rewind 10s
      else if (x < third) {
        video.currentTime -= 10;
      }
    } else if (tapCount === 3) {
      // Triple tap middle: Next video
      if (x > third && x < 2 * third) {
        alert('Next video triggered!');
        // Load your next video here
      }
      // Triple tap right: Close site
      else if (x > 2 * third) {
        window.close(); // May not work in all browsers unless window was opened by script
      }
      // Triple tap left: Show comments
      else if (x < third) {
        commentSection.classList.toggle('visible');
      }
    }

    tapCount = 0;
    lastTapTime = 0;
  }, 300); // Wait to see if more taps come
  lastTapTime = currentTime;
});*/

/*const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const feedback = document.getElementById('feedback');
const commentSection = document.getElementById('commentSection');

let tapCount = 0;
let lastTapTime = 0;
let tapTimeout;

const showFeedback = (text) => {
  feedback.textContent = text;
  feedback.classList.add('show');
  setTimeout(() => feedback.classList.remove('show'), 600);
};

const handleGesture = (x) => {
  const width = overlay.clientWidth;
  const third = width / 3;

  if (tapCount === 1) {
    if (x > third && x < 2 * third) {
      video.paused ? video.play() : video.pause();
      showFeedback(video.paused ? '⏸ Paused' : '▶️ Play');
    }
  } else if (tapCount === 2) {
    if (x < third) {
      video.currentTime -= 10;
      showFeedback('⏪ 10s Back');
    } else if (x > 2 * third) {
      video.currentTime += 10;
      showFeedback('⏩ 10s Forward');
    }
  } else if (tapCount === 3) {
    if (x < third) {
      commentSection.classList.toggle('visible');
    } else if (x > 2 * third) {
      showFeedback('🚪 Closing...');
      setTimeout(() => window.close(), 500);
    } else {
      showFeedback('⏭ Next Video');
      // TODO: Load next video here
    }
  }
};

const registerTap = (x) => {
  const now = new Date().getTime();
  const tapInterval = now - lastTapTime;
  tapCount++;

  clearTimeout(tapTimeout);

  tapTimeout = setTimeout(() => {
    handleGesture(x);
    tapCount = 0;
  }, 300);

  lastTapTime = now;
};

const getX = (e) => {
  return e.touches ? e.touches[0].clientX : e.clientX;
};

overlay.addEventListener('click', (e) => registerTap(getX(e)));
overlay.addEventListener('touchstart', (e) => registerTap(getX(e)));*/


const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const feedback = document.getElementById('feedback');
const commentSection = document.getElementById('commentSection');

let tapCount = 0;
let lastTapTime = 0;
let tapTimeout;

// Video playlist
const videos = [
  "/KUNG FU PANDA 4 _ Official Trailer.mp4",
  "/vecteezy_day-to-night-cartoon-animation-effect-cartoon-sky-view_13005622.mp4",
  "your-video-3.mp4"
];
let currentVideoIndex = 0;

const loadNextVideo = () => {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  video.src = videos[currentVideoIndex];
  video.play();
  showFeedback("⏭ Next Video");
};

const showFeedback = (text) => {
  feedback.textContent = text;
  feedback.classList.add('show');
  setTimeout(() => feedback.classList.remove('show'), 600);
};

const handleGesture = (x) => {
  const width = overlay.clientWidth;
  const third = width / 3;

  if (tapCount === 1) {
    if (x > third && x < 2 * third) {
      video.paused ? video.play() : video.pause();
      showFeedback(video.paused ? '⏸ Paused' : '▶️ Play');
    }
  } else if (tapCount === 2) {
    if (x < third) {
      video.currentTime = Math.max(0, video.currentTime - 10);
      showFeedback('⏪ 10s Back');
    } else if (x > 2 * third) {
      video.currentTime += 10;
      showFeedback('⏩ 10s Forward');
    }
  } else if (tapCount === 3) {
    if (x < third) {
      commentSection.classList.toggle('visible');
    } else if (x > 2 * third) {
      showFeedback('🚪 Closing...');
      setTimeout(() => window.close(), 500);
    } else {
      loadNextVideo();
    }
  }
};

const registerTap = (x) => {
  const now = new Date().getTime();
  const tapInterval = now - lastTapTime;
  tapCount++;

  clearTimeout(tapTimeout);

  tapTimeout = setTimeout(() => {
    handleGesture(x);
    tapCount = 0;
  }, 300);

  lastTapTime = now;
};

const getX = (e) => {
  return e.touches ? e.touches[0].clientX : e.clientX;
};

overlay.addEventListener('click', (e) => registerTap(getX(e)));
overlay.addEventListener('touchstart', (e) => registerTap(getX(e)));