import type { Section } from '../types'

// Ch2 §1. Reference: Microsoft Entra authentication, MFA, federation and Conditional Access docs.
// Not verified against live Microsoft Learn at authoring time (docs host unreachable from the
// authoring environment) — re-check the claims below before publishing.
// Licensing: Conditional Access needs Entra ID P1 or higher; confirm current licence names.
export const signInAndMfa: Section = {
  id: 'sign-in-and-mfa',
  title: 'Entra sign-in, federation and MFA',
  scene: 'ch02-sign-in',
  focus: 'token',
  slide: `## Proving who you are

### Authentication
- **Authentication**: who are you? **Authorisation**: what may you do?
- Entra checks your credentials, then issues a **token**
- Azure and apps accept the token instead of your password

### Ways to sign in
- A password, a **passkey** or an authenticator prompt
- **MFA** adds a second factor

### Federation
- Entra can **trust another identity provider** for sign-in

### Rules around sign-in
- **Conditional Access** can require MFA or block risky attempts
- It is **licence-dependent**
- A valid token still grants **no access** until a role says so`,
  narration:
    "Everything in Azure begins with a question: who is asking? Proving that is authentication, and it is a separate job from authorisation, which decides what that person may do. In our retail company, Priya works on the support team. She signs in to a Microsoft Entra tenant, the directory we met in the last chapter. Entra checks her credential, which might be a password, a passkey, or a prompt from an authenticator app. Multi-factor authentication asks for a second proof, so a stolen password on its own is not enough. Some organisations prefer that people keep using their corporate account, and that works through federation: Entra trusts another identity provider, and once that provider confirms who Priya is, Entra still issues the token. Conditional Access adds rules, such as requiring multi-factor authentication from an unfamiliar location, but it depends on licensing, so check your plan. Now the key point. The result of all this is a token, a signed proof of identity. A valid token says who Priya is. It grants her nothing yet. What applications get from tokens comes next.",
}
