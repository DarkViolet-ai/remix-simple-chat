// useReanimate.ts or wherever your custom hook is defined
import { useState, useCallback } from "react";

function useReanimate(initialKey: number = 0): [number, () => void] {
  const [animationKey, setAnimationKey] = useState<number>(initialKey);

  const reanimate = useCallback(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  return [animationKey, reanimate];
}

export default useReanimate;
