# Bible Study App - Menu for Sign Out Task

## Steps to Complete:

1. **Edit app/home.jsx**:
   - Update imports to include `useState` from React and `Modal` from react-native.
   - Add state for menu visibility in HomeContent component.
   - Remove the standalone Sign Out button.
   - Add a menu trigger button (e.g., "Account") at the bottom of the menu container.
   - Wrap the ScrollView in a View (flex: 1) and add the Modal component after it for the dropdown menu.
   - Implement the menu with "Sign Out" option that calls handleSignOut and closes the menu.
   - Update styles: Remove old sign out styles, add new styles for menu trigger, modal, content, and items.

2. **Test the Changes**:
   - Run the app using `npx expo start`.
   - Verify the menu trigger button appears and opens the modal on press.
   - Confirm the "Sign Out" menu item works: closes menu, signs out, and navigates to login.
   - Check for no crashes, proper closing on outside tap, and responsiveness on different screens.
   - Test existing buttons (Daily Verse, Read Bible) remain functional.

3. **Verify and Complete**:
   - Ensure no regressions in the home screen layout.
   - Update TODO.md to mark steps as completed.
   - Present final result to user.

## Progress:
- [x] Step 1: Edit app/home.jsx (including menu icon in upper right corner at highest position, adjusted menu position/height to avoid blocking text, shortened purpose text, added Close button in menu, centered menu with darker background overlay, separate button backgrounds for Sign Out (maroon #8B0000) and Close (purple #4B0069) with white/bolder text, wider menu box (200px), full-screen linear gradient background matching index (blue #2D8CFF to pink/red #FF2D55), and purpose text color to black (#000) for readability)
- [x] Step 2: Test the Changes (skipped as per user preference for direct completion after refinements)
- [x] Step 3: Verify and Complete
