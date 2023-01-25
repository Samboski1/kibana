/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlyoutHeader, EuiSpacer, EuiTab, EuiTabs } from '@elastic/eui';
import React from 'react';
import { css } from '@emotion/react';
import { HeaderTitle } from './components/header-title';
import { ExpandDetailButton } from './components/expand-detail-button';
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
      <EuiFlyoutHeader
        hasBorder
        css={css`
          margin-bottom: -24px;
        `}
      >
        <div
          css={css`
            margin-top: -24px;
            margin-left: -8px;
          `}
        >
          <ExpandDetailButton />
        </div>
        <EuiSpacer size="m" />
        <HeaderTitle />
        <EuiSpacer size="m" />
        <EuiTabs
          size="l"
          expand
          css={css`
            margin-bottom: -25px;
          `}
        >
          {renderTabs}
        </EuiTabs>
      </EuiFlyoutHeader>
    );
  }
);

EventHeader.displayName = 'EventHeader';
