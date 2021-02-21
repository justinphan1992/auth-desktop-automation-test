import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Typography from '@material-ui/core/Typography';
import TestCaseItem from '../components/TestCaseItem';
import { SCENARIOS, ISCENARIO } from '../constants';
import STATUS from '../types';

const { ipcRenderer } = window.require('electron');

interface TestCaseState {
  key: string;
  status: STATUS;
  title: string;
}

interface Response {
  [message: string]: string;
}

const getInitState = (scenarios: Array<ISCENARIO>): TestCaseState[] => {
  return scenarios.map((scenario) => ({
    ...scenario,
    status: 'idle',
  }));
};

const TestCases: React.FC = () => {
  const initState = getInitState(SCENARIOS);

  const [scenarios, setScenarios] = React.useState<TestCaseState[]>(initState);

  const [runAllTest, setRunAllTest] = React.useState<boolean>(false);

  const [totalTestRunning, setTotalTestRunning] = React.useState<number>(0);

  React.useEffect(() => {
    const handleResponse = (_event: unknown, response: Response) => {
      const { result, key } = response;
      const status = result ? 'valid' : 'invalid';
      const updatedScenarios = scenarios.map((scenario) => {
        if (scenario.key === key) {
          scenario.status = status;
        }
        return scenario;
      });
      setScenarios(updatedScenarios);

      if (totalTestRunning > 0) {
        setTotalTestRunning((currentNumber) => currentNumber - 1);
      }
    };

    ipcRenderer.on('receive-test-result', handleResponse);

    return () => ipcRenderer.off('receive-test-result', handleResponse);
  }, [setScenarios, scenarios, totalTestRunning, setTotalTestRunning]);

  React.useEffect(() => {
    const haveAnyTestRunning = scenarios.some(
      (scenario) => scenario.status === 'processing'
    );

    if (totalTestRunning === 0 && runAllTest) {
      setRunAllTest(false);
    }

    if (runAllTest && !haveAnyTestRunning && totalTestRunning > 0) {
      const scenarioIndex = scenarios.findIndex(
        (scenario) => scenario.status === 'idle'
      );
      if (scenarios[scenarioIndex]) {
        scenarios[scenarioIndex].status = 'processing';
        setScenarios(scenarios);
        ipcRenderer.send('begin-test', scenarios[scenarioIndex].key);
      }
    }
  }, [runAllTest, scenarios, setRunAllTest, setScenarios, totalTestRunning]);

  const runTest = (key: string) => {
    ipcRenderer.send('begin-test', key);
  };

  const runAllTests = () => {
    setRunAllTest(true);
    // Reset All Scenarios;
    const updatedScenarios = scenarios.map((scenario) => {
      scenario.status = 'idle';
      return scenario;
    });
    setScenarios(updatedScenarios);
    setTotalTestRunning(scenarios.length);
  };

  return (
    <Container component="main">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography component="h1" variant="h4">
          Test Cases
        </Typography>
        <Button
          startIcon={<PlayCircleOutlineIcon />}
          onClick={runAllTests}
          color="primary"
          variant="contained"
          size="small"
        >
          Run All Tests
        </Button>
      </Box>
      <List>
        {scenarios.map((scenario) => (
          <TestCaseItem
            onClick={() => {
              runTest(scenario.key);
            }}
            key={scenario.key}
            status={scenario.status}
            title={scenario.title}
          />
        ))}
      </List>
    </Container>
  );
};

export default TestCases;
