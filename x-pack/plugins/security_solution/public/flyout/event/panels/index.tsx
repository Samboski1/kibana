/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EventDetailsPanel, EventDetailsPanelKey } from './event';
import type { ExpandableFlyoutProps } from '../../../common/components/expandable_flyout';
import { EventDetailsPanelProvider } from './event/context';
import type { EventPanel } from './panel-model';

export const expandableFlyoutPanels: ExpandableFlyoutProps['panels'] = [
  {
    key: EventDetailsPanelKey,
    width: 500,
    component: (props) => (
      <EventDetailsPanelProvider {...(props as EventPanel).params}>
        <EventDetailsPanel path={props.path as EventPanel['path']} />
      </EventDetailsPanelProvider>
    ),
  },
];
