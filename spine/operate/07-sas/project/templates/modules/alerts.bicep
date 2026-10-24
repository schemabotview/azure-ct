// The 07:00 objective, watched: page the on-call engineer when the night has
// not succeeded by 04:00 UTC (05:00 in London in summer), early enough to
// rerun it before the report is due.
param location string = resourceGroup().location
param env string
param workspaceId string

resource oncall 'Microsoft.Insights/actionGroups@2023-01-01' = {
  name: 'ag-wg-risk-oncall'
  location: 'global'
  properties: {
    groupShortName: 'riskoncall'
    enabled: true
    emailReceivers: [
      { name: 'on-call', emailAddress: 'risk-oncall@woodgrovebank.example' }
    ]
    smsReceivers: [
      { name: 'on-call phone', countryCode: '44', phoneNumber: '7700900123' }
    ]
  }
}

// Every 15 minutes: is it past 04:00 UTC with no successful nightly run?
resource nightLate 'Microsoft.Insights/scheduledQueryRules@2023-12-01' = {
  name: 'nightly-not-done-by-0400-${env}'
  location: location
  properties: {
    displayName: 'Nightly not done by 04:00 UTC'
    severity: 1
    enabled: true
    scopes: [workspaceId]
    evaluationFrequency: 'PT15M'
    windowSize: 'PT6H'
    criteria: {
      allOf: [{
        query: loadTextContent('../../kql/nightly_late.kql')
        timeAggregation: 'Count'
        operator: 'GreaterThan'
        threshold: 0
        failingPeriods: {
          numberOfEvaluationPeriods: 1
          minFailingPeriodsToAlert: 1
        }
      }]
    }
    description: 'Runbook: risk-runbooks.woodgrovebank.example/nightly-late'
    actions: {
      actionGroups: [oncall.id]
      customProperties: { owner: 'risk platform on-call' }
    }
  }
}
