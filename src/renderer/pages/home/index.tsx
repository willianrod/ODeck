import { Grid, GridItem } from '@chakra-ui/react';
import Editor from 'renderer/components/editor';
import Header from 'renderer/components/header';
import KeyPad from 'renderer/components/keypad';
import Sidebar from 'renderer/components/sidebar';

const Home = () => {
  return (
    <Grid
      h="100vh"
      w="100vw"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem
        colSpan={9}
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.800"
        borderBottomWidth="1px"
        borderBottomColor="gray.800"
      >
        <Header />
        <KeyPad />
      </GridItem>
      <GridItem
        rowSpan={2}
        colSpan={3}
        backgroundColor="gray.900"
        overflow="auto"
        borderLeftWidth="1px"
        borderLeftColor="gray.800"
      >
        <Sidebar />
      </GridItem>
      <GridItem
        colSpan={9}
        overflow="auto"
        backgroundColor="gray.900"
        padding={4}
      >
        <Editor />
      </GridItem>
    </Grid>
  );
};

export default Home;
