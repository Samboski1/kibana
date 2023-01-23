/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useMemo } from 'react';
import type { EventPanel } from '../panel-model';
import { useExpandableFlyoutContext } from '../../../context';
import { EventHeader } from './header';
import { EventContent } from './content';
import type { EventTabsType } from './tabs';
import { tabs } from './tabs';

export const EventDetailsPanelKey: EventPanel['key'] = 'event';

export const EventDetailsPanel: React.FC<EventPanel> = React.memo(({ path }) => {
  const { openPanels } = useExpandableFlyoutContext();

  const selectedTabId = useMemo(() => {
    const defaultTab = tabs[0].id;
    if (!path) return defaultTab;
    return tabs.map((tab) => tab.id).find((tabId) => tabId === path[0]) ?? defaultTab;
  }, [path]);

  const setSelectedTabId = (tabId: EventTabsType[number]['id']) => {
    openPanels({
      right: { path: [tabId] },
    });
  };

  return (
    <>
      <EventHeader selectedTabId={selectedTabId} setSelectedTabId={setSelectedTabId} />
      <EventContent selectedTabId={selectedTabId} />
    </>
  );
});

EventDetailsPanel.displayName = 'EventDetailsPanel';
