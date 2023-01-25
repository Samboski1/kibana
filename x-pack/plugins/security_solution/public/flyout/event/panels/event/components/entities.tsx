/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';
import { EuiFlexGroup, EuiSpacer } from '@elastic/eui';
import { HeaderSection } from '../../../../../common/components/header_section';
import { ENTITIES } from '../translations';

export const Entities = () => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  return (
    <EuiFlexGroup gutterSize="none" direction="column">
      <HeaderSection
        alignHeader="center"
        hideSubtitle
        outerDirection="row"
        title={ENTITIES}
        titleSize="xs"
        toggleQuery={setIsPanelExpanded}
        toggleStatus={isPanelExpanded}
      />
      {isPanelExpanded && (
        <>
          <div>{'beginning entities placeholder'}</div>
          <EuiSpacer size="xxl" />
          <div>{'middle entities placeholder'}</div>
          <EuiSpacer size="xxl" />
          <div>{'end entities placeholder'}</div>
        </>
      )}
    </EuiFlexGroup>
  );
};
