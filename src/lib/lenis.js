export const NAV_OFFSET = -84;

let instance = null;

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
