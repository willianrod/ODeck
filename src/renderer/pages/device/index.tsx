import { Flex } from '@chakra-ui/react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Editor from 'renderer/components/editor';
import Header from 'renderer/components/header';
import KeyPad from 'renderer/components/keypad';
import Sidebar from 'renderer/components/sidebar';

const Device = () => {
  return (
    <>
      <Flex h="100vh" w="100vw" flexDir="column">
        <Header />
        <Allotment minSize={100}>
          <Allotment.Pane>
            <Allotment vertical>
              <Allotment.Pane minSize={100}>
                <KeyPad />
              </Allotment.Pane>
              <Allotment.Pane minSize={100}>
                <Editor />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
          <Allotment.Pane maxSize={300} minSize={200}>
            <Sidebar />
          </Allotment.Pane>
        </Allotment>
      </Flex>
    </>
  );
};

export default Device;
