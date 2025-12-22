# Implementation notes for 'Molecules and Light'

'Molecules and Light' is a single screen sim. The Java version of this simulation shared a significant amount of code
with the sim 'The Greenhouse Effect', so the directory structure of 'Molecules and Light' is set up to support
sharing.

During the JS port, most of the simulation code was moved into the greenhouse-effect repository (see
`greenhouse-effect/js/micro/*`) because we expected to add a "micro" screen to greenhouse-effect that mirrored this
simulation. That screen never landed, but the shared photon-absorption implementation remains in greenhouse-effect and
this sim pulls it directly. Keeping it there keeps the shared code together should we ever build that screen in the
future.

See the `greenhouse-effect/doc/implementation-notes.md` file for more details on the shared implementation.