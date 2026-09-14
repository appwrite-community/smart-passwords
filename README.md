# Smart Passwords

A TanStack Start app that shows how to support the [well-known URL for changing passwords](https://www.w3.org/TR/change-password-url/) with Appwrite Auth. Password managers that flag a compromised password open `/.well-known/change-password`, which redirects to the app's change-password page.

## Run it

```
npm install
cp .env.example .env   # add your Appwrite endpoint and project ID
npm run dev
```

Add `localhost` as a Web platform in your Appwrite project so the browser SDK can create sessions.
