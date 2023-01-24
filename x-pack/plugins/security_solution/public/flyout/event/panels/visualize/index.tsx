/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useMemo, useState } from 'react';
import { EuiTab, EuiTabs } from '@elastic/eui';
import type { VisualizePanel, VisualizePanelPaths } from '../panel-model';
import { tabs } from './tabs';

export const EventVisualizePanelKey: VisualizePanel['key'] = 'visualize';

export const EventVisualizePanel: React.FC<VisualizePanel> = React.memo(({ path }) => {
  const [selectedTabId, setSelectedTabId] = useState(() => {
    const defaultTab = tabs[0].id;
    if (!path) return defaultTab;
    return tabs.map((tab) => tab.id).find((tabId) => tabId === path[0]) ?? defaultTab;
  });

  const onSelectedTabChanged = (id: VisualizePanelPaths) => setSelectedTabId(id);

  const selectedTabContent = useMemo(() => {
    return tabs.find((tab) => tab.id === selectedTabId)?.content;
  }, [selectedTabId]);

  const renderTabs = tabs.map((tab, index) => (
    <EuiTab
      onClick={() => onSelectedTabChanged(tab.id)}
      isSelected={tab.id === selectedTabId}
      key={index}
    >
      {tab.name}
    </EuiTab>
  ));
  return (
    <>
      <EuiTabs size="l" expand>
        {renderTabs}
      </EuiTabs>
      {selectedTabContent}
    </>
  );
});

EventVisualizePanel.displayName = 'EventDetailsPanel';
