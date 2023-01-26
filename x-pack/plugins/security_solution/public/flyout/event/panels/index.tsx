/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { VisualizeDetailsPanelProvider } from './visualize/context';
import { PreviewDetailsPanel, PreviewDetailsPanelKey } from './preview';
import { PreviewDetailsPanelProvider } from './preview/context';
import { EventVisualizePanel, EventVisualizePanelKey } from './visualize';
import { EventDetailsPanel, EventDetailsPanelKey } from './event';
import type { ExpandableFlyoutProps } from '../../../common/components/expandable_flyout';
import { EventDetailsPanelProvider } from './event/context';
import type { AlertPanel, EventPanel, PreviewPanel, VisualizePanel } from './panel-model';
import { AlertDetailsPanel, AlertDetailsPanelKey } from './alert-details';

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
  {
    key: EventVisualizePanelKey,
    width: 1000,
    component: (props) => (
      <VisualizeDetailsPanelProvider {...(props as VisualizePanel).params}>
        <EventVisualizePanel />
      </VisualizeDetailsPanelProvider>
    ),
  },
  {
    key: PreviewDetailsPanelKey,
    width: 500,
    component: (props) => (
      <PreviewDetailsPanelProvider {...(props as PreviewPanel).params}>
        <PreviewDetailsPanel />
      </PreviewDetailsPanelProvider>
    ),
  },
  {
    key: AlertDetailsPanelKey,
    width: 500,
    component: (props) => <AlertDetailsPanel {...(props as AlertPanel).params} />,
  },
];
