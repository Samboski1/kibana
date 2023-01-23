/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { BrowserFields, TimelineEventsDetailsItem } from '@kbn/timelines-plugin/common';
import React, { createContext, useContext, useMemo } from 'react';
import type { SearchHit } from '@kbn/es-types';
import { useSpaceId } from '../../../../common/hooks/use_space_id';
import { getAlertIndexAlias } from '../../utils/helpers';
import { SecurityPageName } from '../../../../../common/constants';
import { SourcererScopeName } from '../../../../common/store/sourcerer/model';
import { useRouteSpy } from '../../../../common/utils/route/use_route_spy';
import { useSourcererDataView } from '../../../../common/containers/sourcerer';
import { useTimelineEventsDetails } from '../../../../timelines/containers/details';
import type { EventPanel } from '../panel-model';

export interface EventDetailsPanelContext {
  browserFields: BrowserFields | null;
  dataFormattedForFieldBrowser: TimelineEventsDetailsItem[] | null;
  searchHit: SearchHit<object> | undefined;
}

export const EventDetailsFlyoutContext = createContext<EventDetailsPanelContext>({
  browserFields: null,
  dataFormattedForFieldBrowser: null,
  searchHit: undefined,
});

export type EventDetailsPanelProviderProps = {
  children: React.ReactNode;
} & Partial<EventPanel['params']>;

export const EventDetailsPanelProvider = ({
  id,
  indexName,
  children,
}: EventDetailsPanelProviderProps) => {
  const currentSpaceId = useSpaceId();
  const [{ pageName }] = useRouteSpy();
  const sourcererScope =
    pageName === SecurityPageName.detections
      ? SourcererScopeName.detections
      : SourcererScopeName.default;
  const sourcererDataView = useSourcererDataView(sourcererScope);
  const eventIndex = indexName ? getAlertIndexAlias(indexName, currentSpaceId) ?? indexName : '';
  const [dataFormattedForFieldBrowser, searchHit] = useTimelineEventsDetails({
    indexName: eventIndex,
    eventId: id ?? '',
    runtimeMappings: sourcererDataView.runtimeMappings,
    skip: !id,
  });

  const contextValue = useMemo(
    () => ({
      browserFields: sourcererDataView.browserFields,
      dataFormattedForFieldBrowser,
      searchHit,
    }),
    [dataFormattedForFieldBrowser, searchHit, sourcererDataView]
  );

  return (
    <EventDetailsFlyoutContext.Provider value={contextValue}>
      {children}
    </EventDetailsFlyoutContext.Provider>
  );
};

export const useEventDetailsPanelContext = () =>
  useContext<NonNullable<EventDetailsPanelContext>>(EventDetailsFlyoutContext);
