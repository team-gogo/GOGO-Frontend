import Matter, {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
} from 'matter-js';
import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

const PlinkoGame = () => {
  const [gameInitialized, setGameInitialized] = useState<boolean>(false);
  const [engine, setEngine] = useState<Matter.Engine | null>(null);

  useEffect(() => {
    return () => {
      setGameInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (!gameInitialized) {
      initializePlinkoGame();
      setGameInitialized(true);
    }
  }, [gameInitialized]);

  const initializePlinkoGame = () => {
    const worldWidth = 840;
    const pinLines = 16;
    const pinSize = 5;
    const pinGap = 35;

    const newEngine = Engine.create();
    newEngine.world.gravity.y = 1.3;

    const plinkoGameElement = document.getElementById('plinko-game');
    if (!plinkoGameElement) return;
    if (plinkoGameElement.querySelector('canvas')) return;

    const render = Render.create({
      element: plinkoGameElement,
      engine: newEngine,
      options: {
        wireframes: false,
        background: '#303030',
        height: 650,
      },
    });

    const pins: Matter.Body[] = [];
    for (let l = 0; l < pinLines; l++) {
      const linePins = 3 + l;
      const lineWidth = linePins * pinGap;

      for (let i = 0; i < linePins; i++) {
        const pinX = worldWidth / 2 - lineWidth / 2 + i * pinGap;
        const pinY = 40 + l * pinGap;

        const pin = Bodies.circle(pinX, pinY, pinSize, {
          isStatic: true,
          render: { fillStyle: '#97A9FF' },
        });
        pins.push(pin);
      }
    }

    Composite.add(newEngine.world, pins);

    const runner = Runner.create();
    Runner.run(runner, newEngine);
    Render.run(render);

    setEngine(newEngine);
  };

  const spawnBall = (targetX: number) => {
    if (!engine) return;

    const ballSize = 9;
    const startX = targetX < 19 ? 400 : 423;
    const startY = 0;

    const dx = targetX - startX;
    const dy = 600 - startY;
    const ratio = 0.005;
    const velocityX = dx * ratio;
    const velocityY = dy * ratio;

    const newBall = Bodies.circle(startX, startY, ballSize, {
      restitution: 0.4,
      friction: 0.01,
      frictionAir: 0.03,
      render: { fillStyle: 'red' },
      collisionFilter: {
        category: 0x0002,
        mask: 0x001,
      },
    });

    Body.setVelocity(newBall, { x: velocityX, y: velocityY });

    Composite.add(engine.world, newBall);
  };

  return (
    <div className={cn('flex', 'flex-col')}>
      <div id="plinko-game" />
      <div
        className={cn(
          'flex',
          'w-[52.8125rem]',
          'items-center',
          'justify-around',
          'gap-[0.5rem]',
          'bg-[#303030]',
        )}
      >
        <button onClick={() => spawnBall(9.8)}>1</button>
        <button onClick={() => spawnBall(12.617)}>2</button>
        <button onClick={() => spawnBall(12.621)}>3</button>
        <button onClick={() => spawnBall(18.5)}>4</button>
        <button onClick={() => spawnBall(18.64)}>5</button>
        <button onClick={() => spawnBall(18.7)}>6</button>
        <button onClick={() => spawnBall(18.756)}>7</button>
        <button onClick={() => spawnBall(18.8)}>8</button>
        <button onClick={() => spawnBall(18.9)}>9</button>
        <button onClick={() => spawnBall(18.755)}>10</button>
        <button onClick={() => spawnBall(20.9)}>11</button>
        <button onClick={() => spawnBall(22)}>12</button>
        <button onClick={() => spawnBall(21.2)}>13</button>
        <button onClick={() => spawnBall(26.7)}>14</button>
        <button onClick={() => spawnBall(27)}>15</button>
        <button onClick={() => spawnBall(38.4)}>16</button>
        <button onClick={() => spawnBall(59.2)}>17</button>
      </div>
    </div>
  );
};

export default PlinkoGame;
