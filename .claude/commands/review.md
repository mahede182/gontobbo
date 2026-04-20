# /review Command

Review code changes and provide feedback.

## Usage

```
/review [files|working-changes|pr]
```

## Modes

1. **files** - Review specific files

   ```
   /review files src/screens/Profile.tsx src/api/users.ts
   ```

2. **working-changes** - Review current git changes

   ```
   /review working-changes
   ```

3. **pr** - Review a pull request (if PR number provided)
   ```
   /review pr 123
   ```

## Review Checklist

### Code Quality

- [ ] TypeScript types are correct
- [ ] No `any` types without justification
- [ ] Proper error handling
- [ ] Consistent naming conventions

### Mobile Specific

- [ ] Uses theme colors, not hardcoded values
- [ ] Images imported from theme/images.ts
- [ ] Proper navigation handling
- [ ] Accessibility labels where needed
- [ ] i18n strings used for user-facing text

### Backend Specific

- [ ] Input validation with Zod
- [ ] Proper async/await usage
- [ ] Error handling with AppError
- [ ] Database queries are efficient
- [ ] No sensitive data in logs

### Architecture

- [ ] Follows project structure
- [ ] No circular dependencies
- [ ] Proper separation of concerns

## Output Format

```markdown
## Review Summary

**Status**: ✅ Approved / ⚠️ Needs Changes / ❌ Blocked

### Critical Issues

1. [Description with file:line reference]

### Suggestions

1. [Improvement suggestion]

### Praise

- [What was done well]
```

## Action

When invoked, analyze the specified code and provide structured feedback following the checklist above.
