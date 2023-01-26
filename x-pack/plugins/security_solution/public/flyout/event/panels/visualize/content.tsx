/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlyoutBody } from '@elastic/eui';
import { css } from '@emotion/react';
import React, { useMemo } from 'react';
import type { VisualizePanelPaths } from '../panel-model';
import { tabs } from './tabs';

export const VisualizeContent = ({ selectedTabId }: { selectedTabId: VisualizePanelPaths }) => {
  const selectedTabContent = useMemo(() => {
    return tabs.find((tab) => tab.id === selectedTabId)?.content;
  }, [selectedTabId]);

  return (
    <EuiFlyoutBody
      css={css`
        height: calc(100vh - 160px);
      `}
    >
      {selectedTabContent}
    </EuiFlyoutBody>
  );
};
