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
  const [reached, setReached] = useState<boolean>(false);

  useEffect(() => {
    setDirectionSequence(['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L']);
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
        category: 0x0004, // 다른 그룹으로 설정
        mask: 0x0000, // 아무것도 충돌하지 않도록 설정
      },
    });
    const redLine = Bodies.rectangle(280, 325, 2, 650, {
      isStatic: true,
      render: { fillStyle: 'red' },
      collisionFilter: {
        category: 0x0003, // 다른 그룹으로 설정
        mask: 0x0000, // 아무것도 충돌하지 않도록 설정
      },
    });
    Composite.add(newEngine.world, [yellowLine, redLine]);

    Composite.add(newEngine.world, pins);
    const runner = Runner.create();
    Runner.run(runner, newEngine);
    Render.run(render);

    setEngine(newEngine);
  };

  const spawnBall = () => {
    if (!engine) return;

    const ballSize = 9;
    const startX = 400;
    const newBall = Bodies.circle(startX, 0, ballSize, {
      restitution: 0.4,
      friction: 0.01,
      frictionAir: 0.03,
      render: { fillStyle: 'red' },
      collisionFilter: {
        category: 0x0002, // 다른 그룹으로 설정
        mask: 0x001, // 아무것도 충돌하지 않도록 설정
      },
    });

    Composite.add(engine.world, newBall);
    setBalls((prevBalls) => [...prevBalls, newBall]);

    moveBallTowardsTarget(newBall);
  };

  const moveBallTowardsTarget = (ball: Matter.Body) => {
    if (!engine) return;

    let ballMoving = false;
    let targetX = 350; // 초기 목표 X 좌표
    let reachedTarget = false; // 목표에 도달했는지 여부를 추적

    // 핀에 닿았을 때 목표를 새로 계산하기 위한 변수
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
          reachedTarget = true; // 목표에 도달하면 업데이트를 중지
        }
      }
    });

    // 충돌 시작 시 핀에 닿은 후 목표 X 계산
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA === ball || pair.bodyB === ball) {
          // 충돌한 핀의 위치를 기반으로 방향을 계산
          const collisionBody = pair.bodyA === ball ? pair.bodyB : pair.bodyA;
          const pinX = collisionBody.position.x;
          const pinY = collisionBody.position.y;

          // 충돌 후 목표 지점 계산 (현재 위치에서 핀까지의 방향으로)
          const dx = pinX - ball.position.x;
          const dy = pinY - ball.position.y;
          const angle = Math.atan2(dy, dx);

          // 목표 위치를 핀 방향으로 업데이트 (좌우 랜덤으로 추가적인 오차)
          targetX = ball.position.x + Math.cos(angle) * 50;

          // 공이 튕겨나가는 힘을 증가
          const randomDirection = Math.random() > 0.5 ? 1 : -1;
          const randomForceX =
            randomDirection * (Math.random() * 0.005 + 0.002);
          const randomForceY = -0.002; // 튕기는 힘을 증가 (기존보다 강한 값)

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
        <button onClick={spawnBall}>공 떨어뜨리기</button>
      </div>
    </div>
  );
};

export default PlinkoGame;
