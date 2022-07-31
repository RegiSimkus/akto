import React from 'react';

import Workflow from './Workflow.jsx';

import useStore from './store'

import { createTheme } from '@mui/material/styles';

// use default theme
// const theme = createTheme();

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    secondary: {
      main: '#47466A'
    },
    primary: {
      main: '#6200EA'
    },
    warning: {
      main: "rgba(243, 107, 107)"
    }
  }
});

const WorkflowBuilder = ({endpointsList, originalStateFromDb, fetchSampleDataFunc, createWorkflowTest, editWorkflowTest, editWorkflowNodeDetails}) => {  
  const setOriginalState = useStore((state) => state.setOriginalState);
  const setEndpointsList = useStore((state) => state.setEndpointsList);
  const setUtilityFuncs = useStore((state) => state.setUtilityFuncs);

  setOriginalState(originalStateFromDb);
  setUtilityFuncs(createWorkflowTest, editWorkflowTest, editWorkflowNodeDetails);

  endpointsList.forEach(x => {
    x.method = x.method.toUpperCase()
  })
  setEndpointsList(endpointsList, fetchSampleDataFunc);
  
  return (
    <Workflow theme={theme}/>
  )
}
export default WorkflowBuilder