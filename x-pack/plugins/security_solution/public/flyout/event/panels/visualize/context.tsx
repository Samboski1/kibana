/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { createContext, useContext } from 'react';
import type { VisualizePanel } from '../panel-model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VisualizeDetailsPanelContext {}

export const VisualizeDetailsFlyoutContext = createContext<VisualizeDetailsPanelContext>({});

export type VisualizeDetailsPanelProviderProps = {
  children: React.ReactNode;
} & Partial<VisualizePanel['params']>;

export const VisualizeDetailsPanelProvider = ({
  id,
  indexName,
  children,
}: VisualizeDetailsPanelProviderProps) => {
  const contextValue = {};

  return (
    <VisualizeDetailsFlyoutContext.Provider value={contextValue}>
      {children}
    </VisualizeDetailsFlyoutContext.Provider>
  );
};

export const useVisualizeDetailsPanelContext = () =>
  useContext<NonNullable<VisualizeDetailsPanelContext>>(VisualizeDetailsFlyoutContext);
