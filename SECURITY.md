# Security

## Public-by-design baseline

The initial deployment requires no account, authentication token or committed API key.

Never commit:

- API keys;
- OAuth tokens;
- passwords;
- private keys;
- `.env` files;
- personal datasets;
- private user exports.

If a future adapter requires credentials, use an execution secret mechanism and keep the public code functional in a degraded mode without the credential.

## Reporting

For security issues that would be unsafe to disclose publicly, use GitHub's private vulnerability reporting feature when enabled. Ordinary bugs and design questions may use public issues.
