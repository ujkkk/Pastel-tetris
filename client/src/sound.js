/** sound.js */
const lineClearrSound = new Audio('./sounds/bubble.mp3')

export function playLineClear() {
  playSound(lineClearrSound)
}

function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}
function stopSound(sound) {
  sound.pause()
}