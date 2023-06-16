import * as React from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  List,
  Radio,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useAtom, useSetAtom } from 'jotai/react';
import { PrimitiveAtom, atom } from 'jotai/vanilla';
import { demoStoreOptions } from './demo-store';

type Todo = {
  title: string;
  completed: boolean;
};

const filterAtom = atom('all');
// filterAtom.debugLabel = "filterAtom";

const initialAtom = atom<Todo>({ title: 'test', completed: false });
const todosAtom = atom<PrimitiveAtom<Todo>[]>([initialAtom]);
todosAtom.debugLabel = 'todosAtom';

const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
  const filter = get(filterAtom);
  const todos = get(todosAtom);
  if (filter === 'all') {
    return todos;
  } else if (filter === 'completed') {
    return todos.filter((atom) => get(atom).completed);
  } else {
    return todos.filter((atom) => !get(atom).completed);
  }
});

filteredAtom.debugLabel = 'filteredAtom';

type RemoveFn = (item: PrimitiveAtom<Todo>) => void;
type TodoItemProps = {
  atom: PrimitiveAtom<Todo>;
  remove: RemoveFn;
};

const TodoItem = ({ atom, remove }: TodoItemProps) => {
  const [item, setItem] = useAtom(atom, demoStoreOptions);
  React.useEffect(() => {
    // atom.debugLabel = 'Todo Item - ' + item.title;
  }, [atom]);
  const toggleCompleted = () =>
    setItem((props) => ({ ...props, completed: !props.completed }));
  return (
    <Flex justify="space-between" align="center" my={10}>
      <Flex align="center">
        <Checkbox
          size="xs"
          onChange={toggleCompleted}
          checked={item.completed}
          display="block"
          mr={10}
          mb={-6}
        />
        <Text
          sx={() => ({
            textDecoration: item.completed ? 'line-through' : '',
          })}
          fz="md"
        >
          {item.title}
        </Text>
      </Flex>

      <ActionIcon
        onClick={() => remove(atom)}
        variant="outline"
        color="dark"
        size="sm"
      >
        <IconX />
      </ActionIcon>
    </Flex>
  );
};

const Filter = () => {
  const [filter, set] = useAtom(filterAtom, demoStoreOptions);

  return (
    <Radio.Group onChange={(value) => set(value)} value={filter}>
      <Radio value="all" label="All" />
      <Radio value="completed" label="Completed" />
      <Radio value="incompleted" label="Incompleted" />
    </Radio.Group>
  );
};

type FilteredType = {
  remove: RemoveFn;
};

const Filtered = (props: FilteredType) => {
  const [todos] = useAtom(filteredAtom, demoStoreOptions);
  const components = todos.map((atom, i) => (
    <TodoItem
      atom={atom}
      key={`todo-item${i}` + atom.toString()}
      remove={props.remove}
    />
  ));

  return <>{components}</>;
};

const TodoList = () => {
  const setTodos = useSetAtom(todosAtom, demoStoreOptions);
  const remove: RemoveFn = (todo) =>
    setTodos((prev) => prev.filter((item) => item !== todo));
  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value;
    e.currentTarget.inputTitle.value = '';
    if (title.trim()) {
      setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })]);
    }
  };

  const handleOnSortClick = () => {
    setTodos((prev) => [...prev].reverse());
  };
  return (
    <form onSubmit={add}>
      <Group
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Filter />
        <Button onClick={handleOnSortClick}>Reverse</Button>
      </Group>
      <TextInput placeholder="Type your todo" name="inputTitle" mt="sm" />
      <List listStyleType="none">
        <Filtered remove={remove} />
      </List>
    </form>
  );
};

export const Todos = () => {
  return (
    <Box maw="500px">
      <Title size="h5">Todo list</Title>
      <TodoList />
    </Box>
  );
};
