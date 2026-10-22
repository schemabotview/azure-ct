import type { Section } from '../types'

export const theExposureApi: Section = {
  id: 'the-exposure-api',
  title: 'The exposure API',
  scene: 'exposure-api',
  narration:
    "The dealers' screens ask one service for headroom and reservations: the exposure A P I. The editor shows app slash server dot p y, the part that matters, the reserve function. It opens a connection to the mart, sets the transaction to serializable, reads the group's headroom, and refuses with four oh nine if the amount is more than what is left. Otherwise it inserts the reservation with on conflict do nothing, so a retried request holds nothing twice, and returns two oh one with the headroom that remains. If PostgreSQL reports a serialization failure, it tries again, up to three times. That is everything Course eleven taught, in one function. The terminal runs the A P I locally, against the mart on PostgreSQL sixteen, and calls it with curl. The health check answers ok. Wide World's headroom is one point six. A reservation of one million, with idempotency key req seven f three a, is accepted, and nought point six remains. A second, with a different key, is refused: over the limit, nought point six left. The log shows one line per request, with its status. The table on the right lists the routes: get health, which asks whether the mart can be reached; get headroom; and post reservations. The list underneath is what the code deliberately does not do. It does not check who is calling: App Service and the gateway in front do that. It does not store a password: it signs in as its own identity. It does not decide what is over the limit: the mart refuses. And it does not write log files: it prints one line per request to its output, which App Service collects. Next, running it on App Service.",
}
