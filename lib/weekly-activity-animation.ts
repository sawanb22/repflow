export type WeeklyActivityBarInput = {
  height: string;
  hasFill: boolean;
};

export type WeeklyActivityAnimationConfig = {
  animate: boolean;
  initialHeight: string;
  targetHeight: string;
  delay: number;
};

export function getWeeklyActivityAnimationConfig(
  day: WeeklyActivityBarInput,
  index: number,
  reduceMotion: boolean,
): WeeklyActivityAnimationConfig {
  if (!day.hasFill || reduceMotion) {
    return {
      animate: false,
      initialHeight: day.height,
      targetHeight: day.height,
      delay: 0,
    };
  }

  return {
    animate: true,
    initialHeight: "0%",
    targetHeight: day.height,
    delay: index * 0.045,
  };
}
