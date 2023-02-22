import { css } from '@emotion/react';
import inter700 from './files/Inter-Bold.woff2';
import inter500 from './files/Inter-Medium.woff2';
import inter400 from './files/Inter-Regular.woff2';
import inter600 from './files/Inter-SemiBold.woff2';
import jetbrainsMono700 from './files/JetBrainsMono-Bold.woff2';
import jetbrainsMono400 from './files/JetBrainsMono-Regular.woff2';
import jetbrainsMono600 from './files/JetBrainsMono-SemiBold.woff2';

export const fontCss = css`
  @font-face {
    /* inter-latin-400-normal*/
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('${inter400}') format('woff2');
  }

  @font-face {
    /* inter-latin-500-normal*/
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url('${inter500}') format('woff2');
  }

  @font-face {
    /* inter-latin-600-normal*/
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('${inter600}') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('${inter700}') format('woff2');
  }

  @font-face {
    /* jetbrains-mono-latin-400-normal*/
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('${jetbrainsMono400}') format('woff2');
  }

  @font-face {
    /* jetbrains-mono-latin-600-normal*/
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('${jetbrainsMono600}') format('woff2');
  }

  @font-face {
    /* jetbrains-mono-latin-700-normal*/
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('${jetbrainsMono700}') format('woff2');
  }
`;
