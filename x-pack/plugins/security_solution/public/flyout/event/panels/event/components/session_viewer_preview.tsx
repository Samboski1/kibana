/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiPanel, useEuiBackgroundColor } from '@elastic/eui';
import { css } from '@emotion/react';

export const SessionViewerPreview = () => {
  return (
    <EuiPanel
      hasBorder
      hasShadow={false}
      css={css`
        background: ${useEuiBackgroundColor('subdued')};
      `}
    >
      <p>{'Session Viewer Preview Placeholder'}</p>
    </EuiPanel>
  );
};
