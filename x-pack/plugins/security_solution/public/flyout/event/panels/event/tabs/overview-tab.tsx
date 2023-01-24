/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiHorizontalRule, EuiSpacer } from '@elastic/eui';
import { MitreDetails } from './mitre-details';
import { RuleDetails } from './rule-details';
import { ReasonDetails } from './reason-details';
import { HighlightedFields } from './highlighted-fields';

export const EventOverviewTab: React.FC = React.memo(() => {
  return (
    <>
      <MitreDetails />
      <RuleDetails />
      <EuiHorizontalRule margin="l" />
      <p>{'Session Viewer Preview Placeholder'}</p>
      <EuiSpacer />
      <ReasonDetails />
      <EuiSpacer />
      <HighlightedFields />
    </>
  );
});

EventOverviewTab.displayName = 'EventOverviewTab';
