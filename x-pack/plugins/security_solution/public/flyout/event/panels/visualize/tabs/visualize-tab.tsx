/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';
import { css } from '@emotion/css';
import { EuiButtonGroup, EuiPanel } from '@elastic/eui';
import { ANALYZE_GRAPH_ID, AnalyzeGraph } from './analyze_graph';
import { ANALYZER_GRAPH, SESSION_VIEW, VISUALIZE_OPTIONS } from '../translations';
import { SESSION_VIEW_ID, SessionView } from './session_view';

const visualizeButtons = [
  {
    id: SESSION_VIEW_ID,
    label: SESSION_VIEW,
  },
  {
    id: ANALYZE_GRAPH_ID,
    label: ANALYZER_GRAPH,
  },
];

export const VisualizeTab: React.FC = React.memo(() => {
  const [activeVisualizationId, setActiveVisualizationId] = useState(SESSION_VIEW_ID);
  const onChangeCompressed = (optionId: string) => {
    setActiveVisualizationId(optionId);
  };

  return (
    <>
      <EuiPanel
        hasShadow={false}
        css={css`
          width: 100%;
          min-height: 0;
        `}
        paddingSize="s"
        grow={false}
      >
        <EuiButtonGroup
          name="coarsness"
          legend={VISUALIZE_OPTIONS}
          options={visualizeButtons}
          idSelected={activeVisualizationId}
          onChange={(id) => onChangeCompressed(id)}
          buttonSize="compressed"
          isFullWidth
        />
      </EuiPanel>
      {activeVisualizationId === SESSION_VIEW_ID && <SessionView />}
      {activeVisualizationId === ANALYZE_GRAPH_ID && <AnalyzeGraph />}
    </>
  );
});

VisualizeTab.displayName = 'VisualizeTab';
