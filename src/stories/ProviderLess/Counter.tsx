import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
countAtom.debugLabel = 'countAtom';

export const Counter = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      {count}&nbsp;
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};
