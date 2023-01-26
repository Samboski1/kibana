/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import type { Process, ProcessEvent } from '@kbn/session-view-plugin/common/types/process_tree';
import { useKibana } from '../../../../common/lib/kibana';
import type { AlertPanel } from '../panel-model';

export const AlertDetailsPanelKey: AlertPanel['key'] = 'alert';

export const AlertDetailsPanel: React.FC<AlertPanel> = React.memo(
  ({
    alerts,
    alertsCount,
    isFetchingAlerts,
    hasNextPageAlerts,
    fetchNextPageAlerts,
    investigatedAlertId,
    onJumpToEvent,
    onShowAlertDetails,
    selectedProcess,
  }: {
    alerts: ProcessEvent[];
    alertsCount: number;
    isFetchingAlerts: boolean;
    hasNextPageAlerts: boolean;
    fetchNextPageAlerts: () => void;
    investigatedAlertId: string;
    onJumpToEvent: (event: ProcessEvent) => void;
    onShowAlertDetails: (alertId: string) => void;
    selectedProcess: Process | null;
  }) => {
    const { sessionView } = useKibana().services;

    return (
      <>
        {sessionView.getSessionViewDetailPanel({
          alerts,
          alertsCount,
          isFetchingAlerts,
          hasNextPageAlerts,
          fetchNextPageAlerts,
          investigatedAlertId,
          selectedProcess,
          onJumpToEvent,
          onShowAlertDetails,
        })}
      </>
    );
  }
);

AlertDetailsPanel.displayName = 'AlertDetailsPanel';
