/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useMemo } from 'react';
import { useEuiBackgroundColor } from '@elastic/eui';
import { css } from '@emotion/react';
import { VisualizeContent } from './content';
import { useExpandableFlyoutContext } from '../../../context';
import { VisualizeHeader } from './header';
import type { VisualizePanel } from '../panel-model';
import type { EventTabsType } from './tabs';
import { tabs } from './tabs';

export const EventVisualizePanelKey: VisualizePanel['key'] = 'visualize';

export const EventVisualizePanel: React.FC<VisualizePanel> = React.memo(({ path }) => {
  const { openPanels } = useExpandableFlyoutContext();

  const selectedTabId = useMemo(() => {
    const defaultTab = tabs[0].id;
    if (!path) return defaultTab;
    return tabs.map((tab) => tab.id).find((tabId) => tabId === path[0]) ?? defaultTab;
  }, [path]);

  const setSelectedTabId = (tabId: EventTabsType[number]['id']) => {
    openPanels({
      left: { path: [tabId] },
    });
  };

  return (
    <div
      css={css`
        height: 100%;
        background: ${useEuiBackgroundColor('subdued')};
      `}
    >
      <VisualizeHeader selectedTabId={selectedTabId} setSelectedTabId={setSelectedTabId} />
      <VisualizeContent selectedTabId={selectedTabId} />
    </div>
  );
});

EventVisualizePanel.displayName = 'EventVisualizePanel';
