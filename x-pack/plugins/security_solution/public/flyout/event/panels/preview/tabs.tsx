/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { HostsTab } from './tabs/hosts-tab';
import { ProcessTab } from './tabs/process-tab';
import { ALERTS_TAB, HOSTS_TAB, PROCESS_TAB } from './translations';
import { AlertsTab } from './tabs/alerts-tab';
import type { PreviewPanelPaths } from '../panel-model';

export type EventTabsType = Array<{
  id: PreviewPanelPaths;
  'data-test-subj': string;
  name: string;
  content: React.ReactElement;
}>;

export const tabs: EventTabsType = [
  {
    id: 'process',
    'data-test-subj': 'processTab',
    name: PROCESS_TAB,
    content: <ProcessTab />,
  },
  {
    id: 'hosts',
    'data-test-subj': 'hostsTab',
    name: HOSTS_TAB,
    content: <HostsTab />,
  },
  {
    id: 'alerts',
    'data-test-subj': 'alertsTab',
    name: ALERTS_TAB,
    content: <AlertsTab />,
  },
];
