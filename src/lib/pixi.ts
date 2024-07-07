import { Application } from 'pixi.js';

const init = async (): Promise<HTMLCanvasElement> => {
  const app = new Application();
  await app.init();

  return app.canvas;
};

export { init };
