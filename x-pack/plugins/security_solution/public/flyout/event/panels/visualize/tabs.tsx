/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { VisualizeTab } from './tabs/visualize-tab';
import { InvestigationTab } from './tabs/investigation-tab';
import { HISTORY, INSIGHTS, INVESTIGATION, VISUALIZE } from './translations';
import { InsightsTab } from './tabs/insights-tab';
import { HistoryTab } from './tabs/history-tab';
import type { VisualizePanelPaths } from '../panel-model';

export type EventTabsType = Array<{
  id: VisualizePanelPaths;
  'data-test-subj': string;
  name: string;
  content: React.ReactElement;
}>;

export const tabs: EventTabsType = [
  {
    id: 'visualize',
    'data-test-subj': 'visualizeTab',
    name: VISUALIZE,
    content: <VisualizeTab />,
  },
  {
    id: 'insights',
    'data-test-subj': 'insightsTab',
    name: INSIGHTS,
    content: <InsightsTab />,
  },
  {
    id: 'investigation',
    'data-test-subj': 'investigationTab',
    name: INVESTIGATION,
    content: <InvestigationTab />,
  },
  {
    id: 'history',
    'data-test-subj': 'historyTab',
    name: HISTORY,
    content: <HistoryTab />,
  },
];
