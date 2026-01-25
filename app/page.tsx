import { Center, Loader, Stack, Text } from "@mantine/core";

const Home = () => {
  return (
    <Center className="h-screen bg-slate-50">
      <Stack align="center">
        <Loader size="xl" variant="bars" color="blue" />
        <Text fw={700}>Redirecting to your dashboard...</Text>
      </Stack>
    </Center>
  );
};

export default Home;
