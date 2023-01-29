import { FormEvent, useEffect } from 'react';
import {
  ActionIcon,
  Box,
  Checkbox,
  Flex,
  List,
  Radio,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconX } from '@tabler/icons';
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
  useEffect(() => {
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
  // Use `useSetAtom` to avoid re-render
  // const [, setTodos] = useAtom(todosAtom)
  const setTodos = useSetAtom(todosAtom, demoStoreOptions);
  const remove: RemoveFn = (todo) =>
    setTodos((prev) => prev.filter((item) => item !== todo));
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value;
    e.currentTarget.inputTitle.value = '';
    if (title.trim()) {
      setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })]);
    }
  };

  return (
    <form onSubmit={add}>
      <Filter />
      <TextInput placeholder="Type your todo" name="inputTitle" />
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
