/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlyoutHeader, EuiTab, EuiTabs } from '@elastic/eui';
import React from 'react';
import { tabs } from './tabs';
import type { EventPanelPaths } from '../panel-model';

export const EventHeader = React.memo(
  ({
    selectedTabId,
    setSelectedTabId,
    handleOnEventClosed,
  }: {
    selectedTabId: EventPanelPaths;
    setSelectedTabId: (selected: EventPanelPaths) => void;
    handleOnEventClosed?: () => void;
  }) => {
    const onSelectedTabChanged = (id: EventPanelPaths) => setSelectedTabId(id);

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
      <EuiFlyoutHeader>
        <EuiTabs size="l" expand>
          {renderTabs}
        </EuiTabs>
      </EuiFlyoutHeader>
    );
  }
);

EventHeader.displayName = 'EventHeader';
