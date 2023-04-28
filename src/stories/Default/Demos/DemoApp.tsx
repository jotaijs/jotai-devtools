import * as React from 'react';
import { Grid, MantineProvider, Text, Title } from '@mantine/core';
import { DevTools, DevToolsProps } from '../../../';
import { Async } from './Async';
import { Counter } from './Counter';
import { DemoJotaiStoreContext, demoStore } from './demo-store';
import { Random } from './Random';
import { Todos } from './Todos';

export const DemoApp = (props: DevToolsProps) => {
  return (
    <DemoJotaiStoreContext.Provider value={demoStore}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          primaryColor: 'dark',
          cursorType: 'pointer',
        }}
      >
        <DevTools store={demoStore} {...props} />
        <div className="App">
          <React.Suspense
            fallback={
              <Text className="loading-suspense">
                Your suspense loading component...
              </Text>
            }
          >
            <Title size="h3">Demos</Title>
            <Text mb={10} color="dark.2">
              Jotai DevTools — Early Preview
            </Text>

            <Grid gutter="xl">
              <Grid.Col span={6}>
                <Random />
              </Grid.Col>
              <Grid.Col span={6}>
                <Counter />
              </Grid.Col>
              <Grid.Col span={6}>
                <Todos />
              </Grid.Col>{' '}
              <Grid.Col span={6}>
                <Async />
              </Grid.Col>
            </Grid>
          </React.Suspense>
        </div>
      </MantineProvider>
    </DemoJotaiStoreContext.Provider>
  );
};
