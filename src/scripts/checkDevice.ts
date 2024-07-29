const ua = navigator.userAgent.toLowerCase();

export const getIsIos = () => {
  return ua.includes('iphone') || ua.includes('ipod') || ua.includes('ipad');
};
export const getIsAndroid = () => {
  return ua.includes('android');
};
export const getIsMac = () => {
  return ua.includes('macintosh');
};
export const getIsWindows = () => {
  return ua.includes('windows');
};

export const getIsChrome = () => {
  return ua.includes('chrome');
};
export const getIsSafari = () => {
  return ua.includes('safari');
};
export const getIsFirefox = () => {
  return ua.includes('firefox');
};
export const getIsEdge = () => {
  return ua.includes('edge');
};

export const getIsTouchDevice = () => {
  return window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints;
};
