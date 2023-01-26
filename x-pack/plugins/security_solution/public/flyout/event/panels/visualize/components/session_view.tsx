/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import type { ProcessEvent } from '@kbn/session-view-plugin/common/types/process_tree';
import type { Process } from '@kbn/session-view-plugin/common/types/process_tree';
import { useExpandableFlyoutContext } from '../../../../context';
import { useVisualizeDetailsPanelContext } from '../context';
import { useKibana } from '../../../../../common/lib/kibana';

export const SESSION_VIEW_ID = 'session_view';

export const SessionView = () => {
  const { openPanels } = useExpandableFlyoutContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const { sessionView } = useKibana().services;
  const { searchHit, getFieldsData } = useVisualizeDetailsPanelContext();
  const databaseDocumentID = searchHit?._id as string; // Is the eventID - We won't render without this
  const processEntityId = getFieldsData('process.entity_id') as string;
  const sessionEntityId = getFieldsData('process.entry_leader.entity_id') as string;
  const timestamp = (getFieldsData('kibana.alert.original_time') ??
    getFieldsData('@timestamp')) as string;

  const hasResized = useRef(false);

  const resizeFn = useCallback(() => {
    if (!hasResized.current) {
      if (containerRef.current?.scrollHeight) {
        setHeight(containerRef.current.scrollHeight);
        hasResized.current = true;
      }
    }
  }, []);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('resize', resizeFn);
    }
    return () => {
      containerRef.current?.removeEventListener('resize', resizeFn);
    };
  });

  const showAlertDetails = (
    alerts: ProcessEvent[],
    alertsCount: number,
    isFetchingAlerts: boolean,
    hasNextPageAlerts: boolean,
    fetchNextPageAlerts: () => void,
    investigatedAlertId: string,
    onJumpToEvent: (event: ProcessEvent) => void,
    onShowAlertDetails: (alertId: string) => void,
    selectedProcess: Process | null
  ) => {
    debugger;
    openPanels({
      preview: {
        key: 'alert',
        params: {
          alerts,
          alertsCount,
          isFetchingAlerts,
          hasNextPageAlerts,
          fetchNextPageAlerts,
          investigatedAlertId,
          onJumpToEvent,
          onShowAlertDetails,
          selectedProcess,
        },
      },
    });
  };

  if (sessionEntityId === undefined) return null;
  return (
    <div
      css={css`
        height: 100%;
        min-height: 100%;
      `}
      ref={containerRef}
    >
      {sessionView.getSessionView({
        sessionEntityId,
        height,
        jumpToEntityId: processEntityId,
        jumpToCursor: timestamp,
        investigatedAlertId: databaseDocumentID,
        isFullScreen: false,
        canAccessEndpointManagement: false,
        showAlertDetails,
      })}
    </div>
  );
};
