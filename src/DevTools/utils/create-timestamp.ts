const formatTimeToTimeStamp = (time: number) =>
  new Date(time).toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3,
  });

export const createTimestamp = () => {
  // Monotonic clock
  const time = performance.timeOrigin + performance.now();
  return formatTimeToTimeStamp(time);
};
