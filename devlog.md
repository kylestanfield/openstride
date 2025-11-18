11/15/2025

Made some progress on the layout design . Following the expo tutorial but adapting it to my own purpose.

TODO:

1. Make the recording button have React state, change the component based on a recording toggle.

2. Get some work in tracking gps started

3. Investigate adding gesture support , perhaps adding a swipe gesture to move between pages, and some animation for changing pages via swipe. Use the libraries described at https://docs.expo.dev/tutorial/gestures/

4. Continue working on colors / theming etc

11/16/2025

Implemented GPS tracking. While active, write Locations to an array in memory.

When user stops, save the array to the database.

useRecording hook abstracts out stateful logic from Recording component

useGpsTracking handles GPS/Location interactions with Expo

useRouteRepository is the repository to translate between JS / SQL representations
of the Routes/Points

StorageService handles database initialization (top level of the app is in app/\_layout.tsx)

TODO:

1. improve layout/UI spacing

2. Improve theming

3. Light mode / dark mode

4. View past runs in the Activities tab (different from Stats tab?)

5. Use geolib instead of custom Haversine distance in the utils/RouteUtils.jsx file

11/17/2025

Extracted almost all logic out of the recording/runinfo/liverunstats components.
Only formatting function is called from LiveRunStats. RunInfo and LiveRunStats
can probably be combined.

All the logic is now in useRecording hook, which computes all the information to
be displayed by the UI and passes that to the components.

Runs are now saved to the database, but there is no way to see what is in the database.

Want to work on Activities list next.

Significant UI work still remains. Might be worth looking into some component
libraries.

TODO:

1. Add Activities tab, where previous runs are fetched from the database and
   one card per activity is displayed.

2. Improve UI

3. Light Mode/ Dark Mode
