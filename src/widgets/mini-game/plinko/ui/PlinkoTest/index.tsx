import Matter, {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
  Events,
  Pair,
} from 'matter-js';
import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

const PlinkoGame = () => {
  const [gameInitialized, setGameInitialized] = useState<boolean>(false);
  const [engine, setEngine] = useState<Matter.Engine | null>(null);
  const [balls, setBalls] = useState<Matter.Body[]>([]);
  const [directionSequence, setDirectionSequence] = useState<string[]>([]);

  useEffect(() => {
    setDirectionSequence([
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
      'L',
    ]);

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
    const startPins = 3;
    const pinLines = 16;
    const pinSize = 5;
    const pinGap = 35;

    const newEngine = Engine.create();
    newEngine.world.gravity.y = 0.4;

    const plinkoGameElement = document.getElementById('plinko-game');
    if (!plinkoGameElement) return;

    if (plinkoGameElement.querySelector('canvas')) {
      console.log('Canvas already exists, skipping initialization');
      return;
    }

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
    const pinPositions: { x: number; y: number }[] = [];

    for (let l = 0; l < pinLines; l++) {
      const linePins = startPins + l;
      const lineWidth = linePins * pinGap;

      for (let i = 0; i < linePins; i++) {
        const pinX = worldWidth / 2 - lineWidth / 2 + i * pinGap;
        const pinY = 40 + l * pinGap;

        pinPositions.push({ x: pinX, y: pinY });

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

  const spawnBall = () => {
    if (!engine || directionSequence.length === 0) return;

    const ballSize = 7;
    const ballElastity = 0.3;
    const ballFriction = 0.05;
    const ballAirFriction = 0.01;
    const pinGap = 25;

    // 첫 번째 핀과 두 번째 핀 사이의 중앙에서 공 생성
    const startX = (395 + 405) / 2;

    const newBall = Bodies.circle(startX, 0, ballSize, {
      restitution: ballElastity,
      friction: ballFriction,
      frictionAir: ballAirFriction,
      render: { fillStyle: 'red' },
      collisionFilter: {
        category: 0x0002,
        mask: 0x0001,
      },
    });

    Composite.add(engine.world, newBall);

    setBalls((prevBalls) => [...prevBalls, newBall]);
    moveBallTowardsTarget(newBall, [...directionSequence]);
    applyBounceEffect(newBall);
  };

  const moveBallTowardsTarget = (
    ball: Matter.Body,
    ballDirectionSequence: string[],
  ) => {
    let ballReached = false;
    let ballMoving = false;

    const intervalId = setInterval(() => {
      if (ball.position.y > 200 && !ballMoving) {
        ballMoving = true;
      }

      if (ballMoving && !ballReached) {
        const direction = ballDirectionSequence.shift();
        if (!direction) {
          clearInterval(intervalId);
          return;
        }

        const targetX =
          direction === 'L' ? ball.position.x - 15 : ball.position.x + 15;

        const dx = targetX - ball.position.x;
        const dy = ball.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.min(0.1 * distance, 2);
        const angle = Math.atan2(dy, dx);
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;

        if (distance < 5) {
          ballReached = true;
          Body.setPosition(ball, { x: targetX, y: ball.position.y });
          Body.setVelocity(ball, { x: 0, y: 0 });
          clearInterval(intervalId);
        }

        Body.setVelocity(ball, { x: velocityX, y: velocityY });
      }
    }, 30);
  };

  const applyBounceEffect = (ball: Matter.Body) => {
    if (!engine) return;

    Events.on(engine, 'collisionStart', (event: { pairs: Pair[] }) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        if (bodyA === ball || bodyB === ball) {
          const bounceForce = 0.7;
          Body.applyForce(ball, ball.position, {
            x: bounceForce * (Math.random() - 0.5),
            y: -bounceForce,
          });

          if (directionSequence.length > 0) {
            const currentDirection = directionSequence[0];
            const ballPosition = ball.position.x;
            const pinX = bodyA.position.x || bodyB.position.x;

            if (ballPosition < pinX) {
              directionSequence[0] = 'L';
            } else {
              directionSequence[0] = 'R';
            }

            setDirectionSequence([...directionSequence]);
          }
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
        <button onClick={spawnBall}>공 떨어뜨리기</button>
      </div>
    </div>
  );
};

export default PlinkoGame;
