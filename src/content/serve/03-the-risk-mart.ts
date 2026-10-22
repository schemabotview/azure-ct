import type { Section } from '../types'

export const theRiskMart: Section = {
  id: 'the-risk-mart',
  title: 'The risk mart',
  scene: 'risk-mart',
  narration:
    "The map now has the risk mart. The code at the top is templates slash modules slash mart dot bicep: a PostgreSQL sixteen flexible server called p s q l w g riskmart prod. Its tier is General Purpose with two virtual cores, a Standard D two d s version five. It runs in zone one, with zone redundant high availability: a standby in zone three, kept in step with every commit, which takes over automatically if zone one is lost. It keeps fourteen days of backups, copied to U K West. Sign in is Entra I D only, with password authentication disabled, so there is no password to leak. Public network access is off, and a private endpoint in snet p e is the only way in, which Course five's security group already allows from the A P I's subnet on port five four three two. The terminal builds the mart's schema on a real PostgreSQL sixteen, running locally, from s q l slash mart dot s q l: groups with their limits, the exposure loaded from gold, reservations, and a headroom view. Wide World Group has a limit of ten, net exposure of eight point four, nothing reserved, and headroom of one point six. Tailspin Traders has the least, nought point seven. The table at the bottom is what happens when something breaks. If zone one is lost, the standby in zone three takes over. If a bad load runs at ten past six, the mart is restored to six o'clock, and restoring always creates a new server, which the A P I is then pointed at. And if U K South is lost entirely, a server is restored from the backup copy in U K West. Next, what happens when two dealers reserve the same headroom at once.",
}
