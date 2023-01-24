/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { BrowserFields, TimelineEventsDetailsItem } from '@kbn/timelines-plugin/common';
import React, { createContext, useContext, useMemo } from 'react';
import type { SearchHit } from '@kbn/es-types';
import type { Ecs } from '@kbn/ecs';
import { noop } from 'lodash';
import { useSpaceId } from '../../../../common/hooks/use_space_id';
import { getAlertIndexAlias } from '../../utils/helpers';
import { SecurityPageName } from '../../../../../common/constants';
import { SourcererScopeName } from '../../../../common/store/sourcerer/model';
import { useRouteSpy } from '../../../../common/utils/route/use_route_spy';
import { useSourcererDataView } from '../../../../common/containers/sourcerer';
import { useTimelineEventsDetails } from '../../../../timelines/containers/details';
import type { EventPanel } from '../panel-model';
import { useGetFieldsData } from '../../../../common/hooks/use_get_fields_data';

export interface EventDetailsPanelContext {
  browserFields: BrowserFields | null;
  dataAsNestedObject: Ecs | null;
  dataFormattedForFieldBrowser: TimelineEventsDetailsItem[] | null;
  getFieldsData: (field: string) => unknown | unknown[];
  searchHit: SearchHit<object> | undefined;
}

export const EventDetailsFlyoutContext = createContext<EventDetailsPanelContext>({
  browserFields: null,
  dataAsNestedObject: null,
  dataFormattedForFieldBrowser: null,
  getFieldsData: noop,
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
  const [loading, dataFormattedForFieldBrowser, searchHit, dataAsNestedObject] =
    useTimelineEventsDetails({
      indexName: eventIndex,
      eventId: id ?? '',
      runtimeMappings: sourcererDataView.runtimeMappings,
      skip: !id,
    });

  const getFieldsData = useGetFieldsData(searchHit?.fields);

  const contextValue = useMemo(
    () => ({
      browserFields: sourcererDataView.browserFields,
      dataAsNestedObject,
      dataFormattedForFieldBrowser,
      getFieldsData,
      searchHit,
    }),
    [dataFormattedForFieldBrowser, dataAsNestedObject, getFieldsData, searchHit, sourcererDataView]
  );

  return (
    <EventDetailsFlyoutContext.Provider value={contextValue}>
      {loading ? <>{'loading...'}</> : children}
    </EventDetailsFlyoutContext.Provider>
  );
};

export const useEventDetailsPanelContext = () =>
  useContext<NonNullable<EventDetailsPanelContext>>(EventDetailsFlyoutContext);
