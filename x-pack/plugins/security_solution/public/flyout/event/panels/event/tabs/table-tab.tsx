/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { TimelineTabs } from '../../../../../../common/types';
import { EventFieldsBrowser } from '../../../../../common/components/event_details/event_fields_browser';
import { useEventDetailsPanelContext } from '../context';

export const EventTableTab: React.FC = React.memo(() => {
  const { browserFields, searchHit, dataFormattedForFieldBrowser } = useEventDetailsPanelContext();
  const eventId = searchHit?._id as string;

  return (
    browserFields &&
    dataFormattedForFieldBrowser && (
      <EventFieldsBrowser
        browserFields={browserFields}
        data={dataFormattedForFieldBrowser}
        eventId={eventId}
        isDraggable={false}
        timelineTabType={TimelineTabs.query}
        scopeId={'event-flyout'}
        isReadOnly={false}
      />
    )
  );
});

EventTableTab.displayName = 'EventTableTab';
