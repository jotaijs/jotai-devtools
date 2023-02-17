import { EmotionCache } from '@emotion/react';
import { createEmotionCache } from '@mantine/core';

type EmotionCacheOptions = Parameters<typeof createEmotionCache>[0];

// Creating a cache is an expensive operation, so we only do it once if the style nonce is present.
let emotionCache: EmotionCache | undefined;

export const createMemoizedEmotionCache = (styleNonce?: string) => {
  return () => {
    if (emotionCache) {
      return emotionCache;
    }

    const createEmotionCacheOptions: EmotionCacheOptions = {
      key: 'jotai-devtools',
    };

    if (styleNonce) {
      createEmotionCacheOptions.nonce = styleNonce;
    }

    emotionCache = createEmotionCache(createEmotionCacheOptions);
    return emotionCache;
  };
};
