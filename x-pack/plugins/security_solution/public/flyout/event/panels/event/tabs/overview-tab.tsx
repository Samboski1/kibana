/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';
import { EuiButtonEmpty, EuiHorizontalRule, EuiPanel, EuiSpacer } from '@elastic/eui';
import { SessionViewerPreview } from '../components/session_viewer_preview';
import { Insights } from '../components/insights';
import { MitreDetails } from '../components/mitre-details';
import { RuleDetails } from '../components/rule-details';
import { ReasonDetails } from '../components/reason-details';
import { HighlightedFields } from '../components/highlighted-fields';
import { Entities } from '../components/entities';

export const EventOverviewTab: React.FC = React.memo(() => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <MitreDetails />
      <RuleDetails />
      <EuiHorizontalRule margin="l" />
      <SessionViewerPreview />
      <EuiSpacer size="m" />
      <EuiButtonEmpty
        size="xs"
        onClick={() => {
          setToggle((isOn) => !isOn);
        }}
      >
        {toggle ? 'horizontal rules' : 'panels'}
      </EuiButtonEmpty>
      <EuiSpacer size="m" />
      {toggle ? (
        <>
          <EuiPanel hasBorder hasShadow={false}>
            <ReasonDetails />
          </EuiPanel>
          <EuiSpacer size="m" />
          <EuiPanel hasBorder hasShadow={false}>
            <HighlightedFields />
          </EuiPanel>
          <EuiSpacer size="m" />
          <EuiPanel hasBorder hasShadow={false}>
            <Entities />
          </EuiPanel>
          <EuiSpacer size="m" />
          <EuiPanel hasBorder hasShadow={false}>
            <Insights />
          </EuiPanel>
        </>
      ) : (
        <>
          <ReasonDetails />
          <EuiHorizontalRule margin="l" />
          <HighlightedFields />
          <EuiHorizontalRule margin="l" />
          <Entities />
          <EuiHorizontalRule margin="l" />
          <Insights />
        </>
      )}
    </>
  );
});

EventOverviewTab.displayName = 'EventOverviewTab';
