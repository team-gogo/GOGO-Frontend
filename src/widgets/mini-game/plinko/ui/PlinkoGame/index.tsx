import Matter, {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
} from 'matter-js';
import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { PlinkoFormType, PlinkoResponse } from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';

interface PlinkoGameProps {
  watch: UseFormWatch<PlinkoFormType>;
  plinkoData: PlinkoResponse | null;
}

const PlinkoGame = ({ watch, plinkoData }: PlinkoGameProps) => {
  const [gameInitialized, setGameInitialized] = useState<boolean>(false);
  const [engine, setEngine] = useState<Matter.Engine | null>(null);
  const [btnClickIdxs, setBtnClickIdxs] = useState<number[]>([]);
  const [fallingOrder, setFallingOrder] = useState<
    { id: number; index: number; passed550: boolean }[]
  >([]);
  const [passed550Indexes, setPassed550Indexes] = useState<number[]>([]);

  const risk = watch('risk');

  const getButtonValues = () => {
    if (risk === 'MEDIUM') {
      return [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 1, 1.5, 3, 5, 10, 41, 110];
    }
    if (risk === 'HIGH') {
      return [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 2, 2, 4, 9, 26, 130, 1000];
    }
    return [16, 9, 2, 1.4, 1.2, 1.1, 1, 0.5, 0.5, 1, 1.1, 1.2, 1.4, 2, 9, 16];
  };

  const buttonValues = getButtonValues();

  useEffect(() => {
    setPassed550Indexes(
      fallingOrder.filter((item) => item.passed550).map((item) => item.index),
    );

    setFallingOrder((prev) => {
      const updatedFallingOrder = prev.filter((item) => !item.passed550);

      const updatedWithPassed550 = [
        ...updatedFallingOrder,
        ...fallingOrder.filter((item) => item.passed550),
      ];

      if (JSON.stringify(prev) !== JSON.stringify(updatedWithPassed550)) {
        return updatedWithPassed550;
      }

      return prev;
    });
  }, [fallingOrder]);

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

  useEffect(() => {
    if (!engine) return;

    const updateBallState = () => {
      const bodies = Composite.allBodies(engine.world);

      bodies.forEach((body) => {
        if (body.position.y > 700) {
          Composite.remove(engine.world, body);
        } else if (body.position.y > 530) {
          Body.set(body, {
            friction: 0.01,
            frictionAir: 0.01,
            restitution: 0.1,
          });

          Body.setVelocity(body, { x: 0, y: 10 });
        }

        if (body.position.y >= 550) {
          const index = btnClickIdxs.findIndex((idx) => idx === body.id);
          if (index !== undefined) {
            setFallingOrder((prev) => {
              const updatedFallingOrder = prev.map((item) => {
                if (item.id === body.id && !item.passed550) {
                  return { ...item, passed550: true };
                }
                return item;
              });

              return updatedFallingOrder;
            });
          }
        }
      });
    };

    Matter.Events.on(engine, 'afterUpdate', updateBallState);

    return () => {
      Matter.Events.off(engine, 'afterUpdate', updateBallState);
    };
  }, [engine, btnClickIdxs]); // fallingOrder는 의존성 배열에 포함하지 않아도 됨, 내부 상태 업데이트에서 관리됨 // fallingOrder를 의존성 배열에 추가

  const initializePlinkoGame = () => {
    const worldWidth = 840;
    const pinLines = 15;
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
        height: 565,
        width: 805,
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

  const spawnBall = (targetX: number, index: number) => {
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

    setFallingOrder((prev) => [
      ...prev,
      { id: newBall.id, index, passed550: false },
    ]);
  };

  useEffect(() => {
    if (plinkoData?.multi !== undefined) {
      const targetXValues = [
        12.617, 12.621, 15.9, 11.1, 15.8, 18.7, 18.756, 18.8, 19.05, 19, 31.3,
        20.1, 26.7, 27, 38.4, 42.76,
      ];

      if (plinkoData.multi >= 0 && plinkoData.multi < targetXValues.length) {
        const targetX = targetXValues[plinkoData.multi];
        setBtnClickIdxs((prev) => [...prev, plinkoData.multi]);
        spawnBall(targetX, plinkoData.multi);
      }
    }
  }, [plinkoData]);

  const buttonValuesForPassed550 = passed550Indexes.map((index) => {
    return buttonValues[index];
  });

  const lastPassedIndex = passed550Indexes[0];

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'bg-[#303030]',
        'max-w-[52.8125rem]',
        'p-[1rem]',
        'rounded-xl',
        'relative',
      )}
    >
      <div id="plinko-game" />
      <div
        className={cn(
          'flex',
          'items-center',
          'justify-around',
          'gap-[0.5rem]',
          'flex-col',
          'gap-[10rem]',
        )}
      >
        <div className={cn('flex', 'items-center', 'gap-[0.3rem]')}>
          {buttonValues.map((value, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'flex',
                  'w-full',
                  'px-[0.5rem]',
                  'py-[0.1rem]',
                  'justify-center',
                  'items-center',
                  'rounded-lg',
                  'bg-main-100',
                  'w-[1.9rem]',
                  'transition-all',
                  'duration-100',
                  index === lastPassedIndex && 'animate-bounce', // indexOf로 포함 여부만 확인
                )}
              >
                <p className={cn('text-caption3s', 'text-main-600')}>{value}</p>

                <style>
                  {`
                  @keyframes bounce {
                    0% {
                      transform: translateY(0);
                      }
                      50% {
                        transform: translateY(30%);
                        }
                        100% {
                          transform: translateY(0);
                          }
                          }
                          
                          .animate-bounce {
                            animation: bounce 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
                            }
                            `}
                </style>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={cn(
          'absolute',
          'top-[50%]',
          'right-[2.5%]',
          'transform',
          'translate-y-[-50%]',
        )}
      >
        <div className={cn('flex', 'flex-col', 'gap-[0.25rem]')}>
          {buttonValuesForPassed550.slice(0, 4).map((value, idx) => (
            <div
              key={`${value}-${idx}`}
              className={cn(
                'flex',
                'flex-col',
                'bg-gray-400',
                'rounded-md',
                'px-[1rem]',
                'py-[0.5rem]',
                'items-center',
                'justify-center',
                'w-[4.25rem]',
              )}
            >
              <p>{value}X</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlinkoGame;
