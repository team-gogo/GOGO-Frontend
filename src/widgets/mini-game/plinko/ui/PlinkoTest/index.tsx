import Matter, {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
  Events,
} from 'matter-js';
import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

const PlinkoGame = () => {
  const [gameInitialized, setGameInitialized] = useState<boolean>(false);
  const [engine, setEngine] = useState<Matter.Engine | null>(null);
  const [balls, setBalls] = useState<Matter.Body[]>([]);

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

    const yellowLine = Bodies.rectangle(315, 325, 2, 650, {
      isStatic: true,
      render: { fillStyle: 'yellow' },
      collisionFilter: {
        category: 0x0004,
        mask: 0x0000,
      },
    });
    const redLine = Bodies.rectangle(280, 325, 2, 650, {
      isStatic: true,
      render: { fillStyle: 'red' },
      collisionFilter: {
        category: 0x0003,
        mask: 0x0000,
      },
    });
    const yellowLine1 = Bodies.rectangle(525, 325, 2, 650, {
      isStatic: true,
      render: { fillStyle: 'yellow' },
      collisionFilter: {
        category: 0x0004,
        mask: 0x0000,
      },
    });
    const redLine1 = Bodies.rectangle(490, 325, 2, 650, {
      isStatic: true,
      render: { fillStyle: 'red' },
      collisionFilter: {
        category: 0x0003,
        mask: 0x0000,
      },
    });
    Composite.add(newEngine.world, [
      yellowLine,
      redLine,
      yellowLine1,
      redLine1,
    ]);
    Composite.add(newEngine.world, pins);

    const runner = Runner.create();
    Runner.run(runner, newEngine);
    Render.run(render);

    setEngine(newEngine);
  };

  // targetX를 인자로 받는 부분 추가
  const spawnBall = (targetX: number) => {
    if (!engine) return;

    const ballSize = 9;
    const startX = 400;
    const newBall = Bodies.circle(startX, 0, ballSize, {
      restitution: 0.4,
      friction: 0.01,
      frictionAir: 0.03,
      render: { fillStyle: 'red' },
      collisionFilter: {
        category: 0x0002,
        mask: 0x001,
      },
    });

    Composite.add(engine.world, newBall);
    setBalls((prevBalls) => [...prevBalls, newBall]);

    // targetX를 넘겨준다
    moveBallTowardsTarget(newBall, targetX);
  };

  // targetX를 매개변수로 받도록 수정
  const moveBallTowardsTarget = (ball: Matter.Body, targetX: number) => {
    if (!engine) return;

    let ballMoving = false;
    let reachedTarget = false;

    // beforeUpdate 이벤트
    Events.on(engine, 'beforeUpdate', () => {
      if (ball.position.y > 100 && !ballMoving) {
        ballMoving = true;
      }

      if (ballMoving && !reachedTarget) {
        const dx = targetX - ball.position.x;
        const distance = Math.abs(dx);

        if (distance > 5) {
          const forceX = (dx / distance) * 0.0002;
          const forceY = 0.0001; // 지속적인 아래쪽 힘 추가
          Body.applyForce(ball, ball.position, { x: forceX, y: forceY });
        } else {
          reachedTarget = true; // 목표에 도달
        }
      }
    });

    // 핀과의 충돌 처리
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA === ball || pair.bodyB === ball) {
          const collisionBody = pair.bodyA === ball ? pair.bodyB : pair.bodyA;
          const pinX = collisionBody.position.x;
          const pinY = collisionBody.position.y;

          const dx = pinX - ball.position.x;
          const dy = pinY - ball.position.y;
          const angle = Math.atan2(dy, dx);

          // 핀의 방향을 따라 튕기도록
          const randomDirection = Math.random() > 0.5 ? 1 : -1;
          const randomForceX =
            randomDirection * (Math.random() * 0.005 + 0.002);
          const randomForceY = -0.002;

          Body.applyForce(ball, ball.position, {
            x: randomForceX,
            y: randomForceY,
          });
        }
      });
    });
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
        {/* <button onClick={() => spawnBall(0)}>0 위치로 공 떨어뜨리기</button> */}
        <button onClick={() => spawnBall(305)}>300 위치로 공 떨어뜨리기</button>
        <button onClick={() => spawnBall(482.5)}>
          500 위치로 공 떨어뜨리기
        </button>
        <button onClick={() => spawnBall(700)}>700 위치로 공 떨어뜨리기</button>
      </div>
    </div>
  );
};

export default PlinkoGame;
