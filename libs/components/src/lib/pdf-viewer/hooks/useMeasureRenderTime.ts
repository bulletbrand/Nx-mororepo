import { useState } from 'react';

export const useMeasureRenderTime = () => {
  const [renderTime, setRenderTime] = useState<number | null>(null);
  const initialTime = performance.now();

  const updateRenderTime = () => setRenderTime(performance.now() - initialTime);

  return { renderTime, updateRenderTime };
};
