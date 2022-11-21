# Server Side

## Requirements

- Node v10+
- Configured .env file

## How to run

1. Confirm `.env` configuration

Ensure the API keys are configured in `.env` in this directory. It should include the following keys:

```yaml
# Stripe API keys - see https://stripe.com/docs/development/quickstart#api-keys
STRIPE_PUBLISHABLE_KEY=pk_test...
STRIPE_SECRET_KEY=sk_test...

```

2. Enter the path with cd and the path to the api folder

```
node server
```


1. The react frontend will be running on `localhost:3000`. Follow the instructions in the README there start the frontend server.