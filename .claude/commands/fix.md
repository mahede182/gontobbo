# /fix Command

Fix errors, bugs, or issues in the codebase.

## Usage

```
/fix [error-message|file|auto]
```

## Modes

1. **error-message** - Fix based on error output

   ```
   /fix "TypeError: Cannot read property 'id' of undefined"
   ```

2. **file** - Fix issues in specific file

   ```
   /fix src/screens/BookingScreen.tsx
   ```

3. **auto** - Auto-detect and fix issues
   ```
   /fix auto
   ```

## Fix Priorities

### TypeScript Errors

1. Type mismatches
2. Missing imports
3. Undefined variables
4. Incorrect generics

### Runtime Errors

1. Null/undefined checks
2. Async/await issues
3. API response handling
4. State management bugs

### Logic Errors

1. Incorrect conditions
2. Off-by-one errors
3. Race conditions
4. Memory leaks

### Style Issues

1. Lint errors
2. Formatting issues
3. Naming inconsistencies

## Fix Process

1. **Identify** - Locate the root cause
2. **Analyze** - Understand the impact
3. **Implement** - Apply minimal fix
4. **Verify** - Check related code
5. **Test** - Ensure no regressions

## Safety Rules

- Never delete code without confirmation
- Always check for usages before renaming
- Preserve existing behavior unless clearly broken
- Add tests for fixed bugs when possible

## Output Format

```markdown
## Fix Applied

**Issue**: [Brief description]
**File**: `@/path/to/file.ts:line`

### Changes

[Description of changes made]

### Verification

- [ ] Check related files
- [ ] Run type check
- [ ] Run tests
- [ ] Test manually

### Follow-up

[Any additional actions needed]
```

## Action

When invoked, identify and fix the specified issue following the process above.
