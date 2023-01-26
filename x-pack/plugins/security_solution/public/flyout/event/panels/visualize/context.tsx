/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { createContext, useContext } from 'react';
import type { SearchHit } from '@kbn/es-types';
import { noop } from 'lodash';
import { useGetFieldsData } from '../../../../common/hooks/use_get_fields_data';
import { useSpaceId } from '../../../../common/hooks/use_space_id';
import { SecurityPageName } from '../../../../../common/constants';
import { SourcererScopeName } from '../../../../common/store/sourcerer/model';
import { useSourcererDataView } from '../../../../common/containers/sourcerer';
import { useRouteSpy } from '../../../../common/utils/route/use_route_spy';
import type { VisualizePanel } from '../panel-model';
import { useTimelineEventsDetails } from '../../../../timelines/containers/details';
import { getAlertIndexAlias } from '../../utils/helpers';

export interface VisualizeDetailsPanelContext {
  getFieldsData: (field: string) => unknown | unknown[];
  searchHit: SearchHit<object> | undefined;
}

export const VisualizeDetailsFlyoutContext = createContext<VisualizeDetailsPanelContext>({
  getFieldsData: noop,
  searchHit: undefined,
});

export type VisualizeDetailsPanelProviderProps = {
  children: React.ReactNode;
} & Partial<VisualizePanel['params']>;

export const VisualizeDetailsPanelProvider = ({
  id,
  indexName,
  children,
}: VisualizeDetailsPanelProviderProps) => {
  const currentSpaceId = useSpaceId();
  const [{ pageName }] = useRouteSpy();
  const sourcererScope =
    pageName === SecurityPageName.detections
      ? SourcererScopeName.detections
      : SourcererScopeName.default;
  const sourcererDataView = useSourcererDataView(sourcererScope);
  const eventIndex = indexName ? getAlertIndexAlias(indexName, currentSpaceId) ?? indexName : '';
  const [_, __, searchHit] = useTimelineEventsDetails({
    indexName: eventIndex,
    eventId: id ?? '',
    runtimeMappings: sourcererDataView.runtimeMappings,
    skip: !id,
  });

  const getFieldsData = useGetFieldsData(searchHit?.fields);

  const contextValue = {
    getFieldsData,
    searchHit,
  };

  return (
    <VisualizeDetailsFlyoutContext.Provider value={contextValue}>
      {children}
    </VisualizeDetailsFlyoutContext.Provider>
  );
};

export const useVisualizeDetailsPanelContext = () =>
  useContext<NonNullable<VisualizeDetailsPanelContext>>(VisualizeDetailsFlyoutContext);
