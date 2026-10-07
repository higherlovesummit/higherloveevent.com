# SOP — Higher Love Website Password Gate

**Purpose:** How to change, update, turn on, or turn off the shared password that protects higherloveevent.com / higherlovebrotherhood.com.

**Last updated:** 2026-10-07

---

## How the gate works (plain English)

- The site runs a small program on Cloudflare (a "Worker") that sits in front of every page.
- When a password is set, every visitor sees the Higher Love login screen and must enter the shared password to get in.
- One shared password for everyone you invite. After a visitor enters it correctly, they stay logged in on that browser for **14 days**.
- The gate is **"fail-open":** if no password is set, the site is fully public. Setting a password turns protection ON; removing it turns protection OFF.
- The password is stored **encrypted in Cloudflare only** — never in the website code or in this file.

**The single most important rule:** the password lives in the **"Runtime variables and secrets"** section — the one at the **TOP** of the Settings page. There is a second, lower section called just "Variables and secrets" (under the Build settings) — **do NOT use that one.** Putting the password there does nothing; the Worker can't read it.

---

## PROCEDURE A — Change / update the password

1. Go to the **Cloudflare dashboard** -> **Workers & Pages** -> open the project **higherloveevent-com**.
2. Make sure you're on the **Production** environment (top of the page).
3. Click the **Settings** tab.
4. Find the **top** section titled **"Runtime variables and secrets."** Confirm the **Production** tab is selected.
5. You'll see the existing secret named **`CFP_PASSWORD`**.
   - To change it, click **Rotate** (or delete it and re-add it), enter the new password value, and save.
   - The **Type** must be **Secret**. The **Name** must be exactly **`CFP_PASSWORD`** (all caps, no spaces).
6. **Redeploy so the change takes effect** (required — a new password only binds on the next deploy):
   - Open **GitHub Desktop**, make any tiny change (or use the staged redeploy marker), then **Commit to main -> Push origin**.
   - Wait 1-2 minutes for Cloudflare to finish building.
7. Test: open the site in a private/incognito window, confirm the login screen appears, and that the **new** password works.
8. Tell everyone you've invited the new password.

---

## PROCEDURE B — Turn the gate ON (if it's currently public)

1. Settings -> **top** "Runtime variables and secrets" -> **Production** tab -> **+ Add variable**.
2. Set **Type: Secret**, **Name: `CFP_PASSWORD`**, **Value:** your chosen password.
3. Save.
4. Redeploy (GitHub Desktop -> commit -> **Push origin**), wait 1-2 minutes.
5. Visit the site to confirm the login screen appears.

---

## PROCEDURE C — Turn the gate OFF (make the site public)

1. Settings -> **top** "Runtime variables and secrets" -> **Production** tab.
2. Delete the **`CFP_PASSWORD`** secret (trash icon).
3. Redeploy (GitHub Desktop -> commit -> **Push origin**), wait 1-2 minutes.
4. Visit the site to confirm it loads with no password prompt.

---

## Troubleshooting

- **Password change / new password not taking effect:** You almost always still need to **redeploy** (Procedure A, step 6). The password only binds on a new deployment.
- **Site still loads with no password:** Make sure the secret is in the **TOP** "Runtime variables and secrets" section — NOT the lower build "Variables and secrets" section. The lower one is build-time only and the Worker can't read it.
- **You still see the site after changing the password:** Your browser may be remembering your old 14-day session, or caching. Use a **private/incognito window**, or hard-refresh with **Cmd+Shift+R** (Mac) / **Ctrl+Shift+R** (Windows).
- **Login screen looks broken:** The deploy may still be building — wait a minute and reload.

---

## Quick reference

| Item | Value |
|---|---|
| Cloudflare project | higherloveevent-com (Workers & Pages) |
| Environment | Production |
| Correct section | **Runtime variables and secrets** (top of Settings) |
| Variable type | Secret |
| Variable name | `CFP_PASSWORD` |
| Session length | 14 days per browser |
| Redeploy needed after any change? | **Yes** — commit & push in GitHub Desktop |
