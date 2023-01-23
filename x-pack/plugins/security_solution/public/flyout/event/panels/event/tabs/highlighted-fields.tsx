/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlexGroup, EuiPanel } from '@elastic/eui';
import React, { useCallback, useState } from 'react';
import { AlertSummaryView } from '../../../../../common/components/event_details/alert_summary_view';
import { HIGHLIGHTED_FIELDS_TITLE } from '../translations';
import { HeaderSection } from '../../../../../common/components/header_section';
import { useExpandableFlyoutContext } from '../../../../context';
import { useEventDetailsPanelContext } from '../context';

export const HighlightedFields = () => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const { scope, openPanels } = useExpandableFlyoutContext();
  const { dataFormattedForFieldBrowser, browserFields, searchHit } = useEventDetailsPanelContext();
  const eventId = searchHit?._id as string;

  const goToTableTab = useCallback(() => {
    openPanels({ right: { path: ['table'] } });
  }, [openPanels]);

  const isVisible = dataFormattedForFieldBrowser && browserFields && eventId && scope;

  return isVisible ? (
    <EuiPanel hasBorder hasShadow={false}>
      <EuiFlexGroup gutterSize="none" direction="column">
        <HeaderSection
          alignHeader="center"
          hideSubtitle
          outerDirection="row"
          title={HIGHLIGHTED_FIELDS_TITLE}
          titleSize="xs"
          toggleQuery={setIsPanelExpanded}
          toggleStatus={isPanelExpanded}
        />
        {isPanelExpanded && (
          <AlertSummaryView
            data={dataFormattedForFieldBrowser}
            eventId={eventId}
            browserFields={browserFields}
            isDraggable={scope === 'timelineFlyout'}
            scopeId={scope}
            title={HIGHLIGHTED_FIELDS_TITLE}
            isReadOnly={false} // TODO: set properly
            goToTable={goToTableTab}
          />
        )}
      </EuiFlexGroup>
    </EuiPanel>
  ) : null;
};
