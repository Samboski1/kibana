/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { createContext, useContext } from 'react';
import type { EventPanel } from '../panel-model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EventDetailsPanelContext {}

export const EventDetailsFlyoutContext = createContext<EventDetailsPanelContext>({});

export type EventDetailsPanelProviderProps = {
  children: React.ReactNode;
} & Partial<EventPanel['params']>;

export const EventDetailsPanelProvider = ({
  id,
  indexName,
  children,
}: EventDetailsPanelProviderProps) => {
  const contextValue = {};

  return (
    <EventDetailsFlyoutContext.Provider value={contextValue}>
      {children}
    </EventDetailsFlyoutContext.Provider>
  );
};

export const useEventDetailsPanelContext = () =>
  useContext<NonNullable<EventDetailsPanelContext>>(EventDetailsFlyoutContext);
