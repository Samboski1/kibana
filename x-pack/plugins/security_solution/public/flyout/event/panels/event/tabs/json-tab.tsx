/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { css } from '@emotion/react';
import React from 'react';
import { JsonView } from '../../../../../common/components/event_details/json_view';
import { useEventDetailsPanelContext } from '../context';

export const EventJsonTab: React.FC = React.memo(() => {
  const { searchHit } = useEventDetailsPanelContext();
  return (
    <div
      css={css`
        height: 100%;
        position: relative;
      `}
      data-test-subj="jsonViewWrapper"
    >
      <JsonView rawEventData={searchHit} />
    </div>
  );
});

EventJsonTab.displayName = 'EventJsonTab';
