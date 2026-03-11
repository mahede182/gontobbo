# Plan: Move Wish List to Profile Menu

This plan outlines the steps to move the "Wish List" entry from the `QuickActions` component to the main `MenuSection` in the `ProfileScreen`.

## Proposed Changes

### 1. Modify `QuickActions.tsx`

- Remove the `TouchableOpacity` block that currently renders the "Wish List" item.
- Remove the `borderBottomWidth: 0` override from the remaining items if necessary to maintain consistent spacing.

### 2. Update `ProfileScreen.tsx`

- Add a new `MenuItem` for "Wish List" within the `MenuSection` (likely under "General" or as its own section).
- Use the `images.wishlist` icon (or `images.savedIcon` if more appropriate for the profile menu style).
- Ensure the `onPress` correctly calls `handleNavigate("WISH_LIST")`.

### 3. Verification

- Confirm that the "Wish List" no longer appears in the `QuickActions` box.
- Confirm that the "Wish List" appears as a standard menu item with an icon and arrow in the `ProfileScreen` menu.
