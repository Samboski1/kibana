/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { isEmpty } from 'lodash';
import { tabs } from './tabs';
import type { EventPanelPaths } from '../panel-model';
import { useExpandableFlyoutContext } from '../../../context';
import { EVENT_DETAILS } from './translations';
import { useEventDetailsPanelContext } from './context';
import { useBasicDataFromDetailsData } from '../../utils/helpers';

export const EventHeader = React.memo(
  ({
    selectedTabId,
    setSelectedTabId,
    handleOnEventClosed,
  }: {
    selectedTabId: EventPanelPaths;
    setSelectedTabId: (selected: EventPanelPaths) => void;
    handleOnEventClosed?: () => void;
  }) => {
    const { openPanels } = useExpandableFlyoutContext();
    const openAlertDetails = () => {
      openPanels({
        left: {
          key: '',
          params: {
            id: '',
            indexName: '',
          },
        },
      });
    };
    const expandButton = (
      <EuiButtonEmpty iconSide="left" onClick={openAlertDetails} iconType="arrowStart">
        EXPAND_DETAILS_BUTTON
      </EuiButtonEmpty>
    );

    const { dataFormattedForFieldBrowser } = useEventDetailsPanelContext();
    const { isAlert, ruleName } = useBasicDataFromDetailsData(dataFormattedForFieldBrowser);
    const titleSection = (
      <>
        <EuiTitle size="s">
          <h4>{isAlert && !isEmpty(ruleName) ? ruleName : EVENT_DETAILS}</h4>
        </EuiTitle>
        <EuiSpacer size="m" />
      </>
    );

    const onSelectedTabChanged = (id: EventPanelPaths) => setSelectedTabId(id);
    const renderTabs = tabs.map((tab, index) => (
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));

    return (
      <EuiFlyoutHeader>
        <EuiFlexGroup>
          <EuiFlexItem>{expandButton}</EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule margin="none" />
        <EuiFlexGroup>
          <EuiFlexItem>{titleSection}</EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule margin="none" />
        <EuiTabs size="l" expand>
          {renderTabs}
        </EuiTabs>
      </EuiFlyoutHeader>
    );
  }
);

EventHeader.displayName = 'EventHeader';
