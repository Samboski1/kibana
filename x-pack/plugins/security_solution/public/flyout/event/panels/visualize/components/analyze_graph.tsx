/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { useVisualizeDetailsPanelContext } from '../context';
import { useGlobalOrTimelineFilters } from '../../../../../common/hooks/use_global_or_timeline_filters';
import { Resolver } from '../../../../../resolver/view';

export const ANALYZE_GRAPH_ID = 'analyze_graph';

export const AnalyzeGraph = () => {
  const { selectedPatterns, from, to, shouldUpdate } = useGlobalOrTimelineFilters(false);
  const { searchHit } = useVisualizeDetailsPanelContext();
  const databaseDocumentID = searchHit?._id as string; // Is the eventID - We won't render without this
  return (
    <Resolver
      databaseDocumentID={databaseDocumentID}
      resolverComponentInstanceID="event-flyout" // TODO: Set explicit instanceId
      indices={selectedPatterns}
      shouldUpdate={shouldUpdate}
      filters={{ from, to }}
    />
  );
};
