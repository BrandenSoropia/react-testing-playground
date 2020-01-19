# Notes:

Built a small note taking app that currently supports showing and adding notes.

It has routing for 2 pages:

- `/`: home, displays all notes
- `/edit`: Form for notes, used to add a note only at the moment. Idea was to add edit a note as well.

## Tests:

Example of different tests w/ different testing tools:

`react-testing-library`

1. Unit test example -> `BackButton.rtl.spec.js`
2. Component "Integration" test -> `EditNotes.rtl.spec.js`

`enzyme`

1. Component "Integration" test -> `EditNotes.enzyme.spec.js`

Snapshots

> Using Storybook's storyshots

1. `EditNotes.stories.js`
