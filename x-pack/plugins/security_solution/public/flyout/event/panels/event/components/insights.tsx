/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';
import { EuiFlexGroup, EuiSpacer } from '@elastic/eui';
import { HeaderSection } from '../../../../../common/components/header_section';
import { INSIGHTS_TITLE } from '../translations';

export const Insights = () => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  return (
    <EuiFlexGroup gutterSize="none" direction="column">
      <HeaderSection
        alignHeader="center"
        hideSubtitle
        outerDirection="row"
        title={INSIGHTS_TITLE}
        titleSize="xs"
        toggleQuery={setIsPanelExpanded}
        toggleStatus={isPanelExpanded}
      />
      {isPanelExpanded && (
        <>
          <div>{'beginning insights placeholder'}</div>
          <EuiSpacer size="xxl" />
          <div>{'middle insights placeholder'}</div>
          <EuiSpacer size="xxl" />
          <div>{'end insights placeholder'}</div>
        </>
      )}
    </EuiFlexGroup>
  );
};
