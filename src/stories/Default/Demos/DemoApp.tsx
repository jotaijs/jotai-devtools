import * as React from 'react';
import {
  Grid,
  MantineProvider,
  Select,
  Text,
  Title,
  useComputedColorScheme,
} from '@mantine/core';
import { DevTools, DevToolsProps } from '../../../';
import { Async } from './Async';
import { Counter } from './Counter';
import { DemoJotaiStoreContext, demoStore } from './demo-store';
import { Random } from './Random';
import { ThemeToggle } from './ThemeToggle';
import { Todos } from './Todos';

const DevToolsWithColorScheme = (props: DevToolsProps) => {
  const colorScheme = useComputedColorScheme();
  return <DevTools store={demoStore} theme={colorScheme} {...props} />;
};

export const DemoApp = (props: DevToolsProps) => {
  return (
    <DemoJotaiStoreContext.Provider value={demoStore}>
      <MantineProvider
        theme={{
          primaryColor: 'cyan',
          cursorType: 'pointer',
        }}
      >
        <DevToolsWithColorScheme {...props} />
        <div className="App">
          <ThemeToggle />
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
