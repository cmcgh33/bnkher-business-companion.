# Activate the private AI preview

The existing GitHub Pages URL remains a static rule-based demo. To enable live AI, host the Node backend and its frontend together. Replit is a practical starting point for the owner’s existing workflow.

## Replit setup
1. Open https://replit.com/import, choose GitHub, and import `https://github.com/cmcgh33/bnkher-business-companion.` (the repository name includes its final period).
2. Use Node 20 or later. Run command: `npm start`. There are no runtime npm dependencies and no frontend build step.
3. In the private **Secrets** panel, set `OPENAI_API_KEY` to your own OpenAI API key. Never paste it into chat, source files, the browser access-code box or GitHub.
4. Add `AI_ACCESS_TOKEN` with a randomly generated application access code of at least 24 characters. This is a separate value, not your OpenAI key. Keep it private for the initial owner preview.
5. Optionally set `OPENAI_MODEL` to a compatible Responses/function-calling model. The default is `gpt-5.4-mini-2026-03-17`. Optionally reduce `AI_MAX_CALLS_PER_BOOT` (default 60).
6. Start the app and open its preview. Select **Ask BNKHER**, enter the application access code, and select **Use live AI interpretation**. The badge must explicitly change to live mode.
7. Try “Could I buy eight thousand dollars of furniture?” The result must display its interpreted purchase amount, $7,700 remaining and a $2,300 cushion shortfall under the default settings.
8. Before publishing, confirm the run command and private deployment secrets in Replit’s Publishing settings. Use a server deployment, not Static. Review the hosting/API charges shown by those services before activation.

Do not give Replit Agent a request to rebuild the app: import and run this implementation. If an import UI offers design/build changes, preserve the existing files and styling.

## Validate after activation
Run `npm test` first. To run eight **billed** real-model interpretation cases, set the server API key privately and run:

```bash
npm run eval:live
```

This evaluation intentionally prints pass/fail labels instead of model responses or credentials. If it fails, correct or disable live mode; a schema-valid response alone does not prove an interpretation is right.

In the interface, also test ambiguous amounts, incomplete commitments, unavailable credit scores, unsupported transfers, an incorrect application access code and switching back to demo mode. Keep the current GitHub Pages demo public while the private AI preview is being reviewed.

## Sources
- [Import from a provider](https://docs.replit.com/build/import-from-providers)
- [Secrets](https://docs.replit.com/core-concepts/project-editor/app-setup/secrets)
- [Publishing deployment types](https://docs.replit.com/features/publishing/deployment-types)
