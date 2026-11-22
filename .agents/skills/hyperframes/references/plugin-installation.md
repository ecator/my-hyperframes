# Running the HyperFrames CLI

Run HyperFrames CLI commands directly in the project directory with `npx hyperframes`:

```bash
npx hyperframes <command> <args...>
```

## Plugin installs

When skills are installed via a plugin manager (for example under a plugin directory containing `plugin.json`, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, `.cursor-plugin/plugin.json`, or `gemini-extension.json`), these rules apply:

- Do not run `hyperframes skills update`, `skills check`, or `npx skills add`. The agent's plugin manager owns installation and updates. Read bundled skills from the plugin directory and report a missing bundled skill instead of downloading a different release.
- Treat the plugin directory as read-only. Put outputs and temporary work in the project or a temporary directory.
- Newer skills come through the client's plugin update flow and a session reload, which the person runs. Do not update an installed plugin yourself.
