/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import type { EventPanelPaths } from '../panel-model';
import { EventOverviewTab } from '../overview';
import { JSON_TAB, OVERVIEW_TAB, TABLE_TAB } from './translations';
import { EventTableTab } from '../table';
import { EventJsonTab } from '../json';

export type EventTabsType = Array<{
  id: EventPanelPaths;
  'data-test-subj': string;
  name: string;
  content: React.ReactElement;
}>;

export const tabs: EventTabsType = [
  {
    id: 'overview',
    'data-test-subj': 'overviewTab',
    name: OVERVIEW_TAB,
    content: <EventOverviewTab />,
  },
  {
    id: 'table',
    'data-test-subj': 'tableTab',
    name: TABLE_TAB,
    content: <EventTableTab />,
  },
  {
    id: 'json',
    'data-test-subj': 'jsonTab',
    name: JSON_TAB,
    content: <EventJsonTab />,
  },
];
