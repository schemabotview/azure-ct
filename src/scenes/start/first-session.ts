import type { Scene } from '@graphlearning/flow'
import { BUILT_BY, mapFrame } from '../map'
import session from '../../../spine/start/03-first-session/session.txt?raw'

// `az login` signs in through Microsoft Entra ID (a browser, or --use-device-code without one), stores
// the account and its subscriptions in ~/.azure/azureProfile.json and the tokens in an MSAL cache
// beside it. An access token lasts 60–90 minutes by default and is refreshed silently while the
// refresh token is valid. The replay STAGES the profile file az login writes, with no token behind it
// (there is no tenant): every command shown reads only that local file, which is the point.
// source: https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively
// source: https://learn.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli
// source: https://learn.microsoft.com/en-us/entra/identity-platform/configurable-token-lifetimes
export const firstSession: Scene = mapFrame('first-session', BUILT_BY[1], {
  id: 'session-side',
  label: 'side',
  bare: true,
  children: [
    { id: 'session-run', kind: 'terminal', filename: 'Terminal — a staged sign-in, no token behind it', label: session.replace(/\n+$/, '') },
    {
      id: 'login-steps',
      kind: 'table',
      label: 'What az login does',
      headers: ['step', 'where'],
      values: [
        ['opens a browser, or prints a device code', 'your machine'],
        ['you sign in with MFA', 'Microsoft Entra ID'],
        ['Entra issues tokens for Azure', 'Microsoft Entra ID'],
        ['the subscriptions you can see are listed', '~/.azure/azureProfile.json'],
        ['the tokens are cached, refreshed silently', 'the MSAL cache in ~/.azure'],
      ],
    },
    {
      id: 'session-means',
      kind: 'list',
      icon: 'key',
      label: 'What the session is, and is not',
      pattern: 'user',
      items: [
        'The default subscription decides where commands land: set it first',
        'An access token lasts 60–90 minutes; the CLI refreshes it',
        'az account show reads a local file: Azure checks the token on every call',
        'Being signed in grants nothing by itself: roles do — Course 4',
      ],
    },
  ],
})
