const setFlakeBottom = () => christmas.getClientRects()[0]["height"] + 10;

const christmas = document.getElementById("christmas");
snowStorm.autoStart = true
snowStorm.targetElement = christmas;
snowStorm.snowStick = false;
snowStorm.followMouse = false;
snowStorm.flakeBottom = setFlakeBottom();
snowStorm.excludeMobile = false;
// snowStorm.useTwinkleEffect = true;
// snowStorm.flakesMaxActive = 24;
snowStorm.freezeOnBlur = true;
snowStorm.vMaxX = 0.1;
snowStorm.vMaxY = 0.5;

window.addEventListener("resize", setFlakeBottom)
window.addEventListener("scroll", e => {
  if (christmas.getClientRects()[0]["bottom"] <= 0)
    snowStorm.freeze();
  else
    snowStorm.resume();
});