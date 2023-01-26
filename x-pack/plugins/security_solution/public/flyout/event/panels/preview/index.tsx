/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';
import { EuiTab, EuiTabs } from '@elastic/eui';
import { tabs } from './tabs';
import type { PreviewPanel } from '../panel-model';

export const PreviewDetailsPanelKey: PreviewPanel['key'] = 'preview';

export const PreviewDetailsPanel: React.FC<PreviewPanel> = React.memo(({ path }) => {
  const [selectedTabId, setSelectedTabId] = useState(() => {
    const defaultTab = tabs[0].id;
    if (!path) return defaultTab;
    return tabs.map((tab) => tab.id).find((tabId) => tabId === path[0]) ?? defaultTab;
  });

  const renderTabs = tabs.map((tab, index) => (
    <EuiTab
      onClick={() => setSelectedTabId(tab.id)}
      isSelected={tab.id === selectedTabId}
      key={index}
    >
      {tab.name}
    </EuiTab>
  ));

  return (
    <EuiTabs size="l" expand>
      {renderTabs}
    </EuiTabs>
  );
});

PreviewDetailsPanel.displayName = 'PreviewDetailsPanel';
