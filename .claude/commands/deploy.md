# /deploy Command

Deploy the application to various environments.

## Usage

```
/deploy [backend|mobile|admin] [environment]
```

## Environments

- **development** - Local/dev environment
- **staging** - Preview/QA environment
- **production** - Live production environment

## Backend Deploy

```
/deploy backend staging
```

Steps:

1. Run tests
2. Build application
3. Push Docker image (if using Docker)
4. Deploy to platform (Vercel/Railway/AWS/etc.)
5. Run database migrations
6. Verify deployment

## Mobile Deploy

```
/deploy mobile staging
```

Steps:

1. Run EAS build
2. Submit to TestFlight/Play Console (if production)
3. Notify team

## Admin Deploy

```
/deploy admin production
```

## Pre-Deploy Checklist

- [ ] All tests passing
- [ ] Environment variables set
- [ ] Database migrations ready
- [ ] Backward compatibility checked
- [ ] Rollback plan prepared

## Safety Rules

- Always deploy to staging first
- Database migrations must be backward compatible
- Never deploy during peak hours
- Have rollback plan ready

## Output Format

```markdown
## Deployment Status

**App**: [backend|mobile|admin]
**Environment**: [staging|production]
**Status**: ✅ Success / ❌ Failed

### Steps Completed

1. [Step description]

### URL

[Deployment URL]

### Verification

[How to verify the deployment]
```

## Action

When invoked, execute the deployment process for the specified app and environment.
