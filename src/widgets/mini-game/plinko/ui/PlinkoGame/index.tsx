'use client';

import Matter, {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
} from 'matter-js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { PlinkoBottomDiv, PlinkoHistory } from '@/entities/mini-game';
import { usePointTicketStore } from '@/shared/stores';
import { PlinkoFormType, PlinkoResponse } from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';
import { getButtonValues } from '../../model/getButtonValues';

interface PlinkoGameProps {
  watch: UseFormWatch<PlinkoFormType>;
  plinkoData: PlinkoResponse | null;
  setGameRunningCount: Dispatch<SetStateAction<number>>;
}

const PlinkoGame = ({
  watch,
  plinkoData,
  setGameRunningCount,
}: PlinkoGameProps) => {
  const { point, setPoint } = usePointTicketStore();

  const [gameInitialized, setGameInitialized] = useState<boolean>(false);
  const [engine, setEngine] = useState<Matter.Engine | null>(null);
  const [btnClickIdxs, setBtnClickIdxs] = useState<number[]>([]);
  const [fallingOrder, setFallingOrder] = useState<
    { id: number; index: number; passed550: boolean }[]
  >([]);
  const [passed550Indexes, setPassed550Indexes] = useState<number[]>([]);
  const [opacity, setOpacity] = useState(1);
  const [buttonValuesForPassed550, setButtonValuesForPassed550] = useState<
    number[]
  >([]);

  const risk = watch('risk');

  const buttonValues = getButtonValues(risk);

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
    if (!engine) return;

    const updateBallState = () => {
      const bodies = Composite.allBodies(engine.world);

      bodies.forEach((body) => {
        if (body.position.y > 700) {
          if (plinkoData?.amount) {
            setPoint(point + Number(plinkoData?.amount));
          }
          Composite.remove(engine.world, body);
          setGameRunningCount((prev) => prev - 1);
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
  }, [engine, btnClickIdxs]);

  const initializePlinkoGame = () => {
    const worldWidth = 840;
    const pinLines = 15;
    const pinSize = 5;
    const pinGap = 35;

    const newEngine = Engine.create();
    newEngine.world.gravity.y = 1.3;

    const plinkoGameElement = document.getElementById('plinko-game');
    if (!plinkoGameElement || plinkoGameElement.querySelector('canvas')) return;

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

  const useCanvasStyleFix = () => {
    useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        #plinko-game canvas {
          width: 100% !important;
          height: 100% !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }, []);
  };

  useCanvasStyleFix();

  const spawnBall = (targetX: number, index: number, amount: number) => {
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

    setGameRunningCount((prev) => prev + 1);

    setFallingOrder((prev) => [
      ...prev,
      { id: newBall.id, index, passed550: false, amount },
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

        setTimeout(() => {
          spawnBall(targetX, plinkoData.multi, Number(plinkoData.amount));
        }, 0);
      }
    }
  }, [plinkoData]);

  useEffect(() => {
    if (passed550Indexes.length > 0) {
      setOpacity(1);

      const timer = setTimeout(() => {
        setOpacity(0);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [passed550Indexes]);

  useEffect(() => {
    setButtonValuesForPassed550(
      passed550Indexes.map((index) => buttonValues[index]),
    );
  }, [passed550Indexes]);

  const lastPassedIndex = passed550Indexes[0];

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'bg-[#303030]',
        'w-full',
        'max-w-[52.8125rem]',
        'p-[1rem]',
        'rounded-xl',
        'relative',
      )}
    >
      <div className={cn('w-full', 'relative')}>
        <div id="plinko-game" />
      </div>

      <PlinkoBottomDiv
        buttonValues={buttonValues}
        lastPassedIndex={lastPassedIndex}
      />

      <PlinkoHistory
        opacity={opacity}
        buttonValuesForPassed550={buttonValuesForPassed550}
      />
    </div>
  );
};

export default PlinkoGame;
