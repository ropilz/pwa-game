export function preloadImages(images: string[]) {
  return Promise.all(images.map(src => {
    const image = new Image();
    image.src = src;
    return new Promise(resolve => image.onload = resolve);
  }))
}
