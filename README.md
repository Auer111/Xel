# Supabase + PWA + React + Vite

Connecting to your new project
Interact with your database through the Supabase client libraries with your API keys.
Be sure to update `Project URL` and `API Key` in App.jsx with values from your supabase dashboard.
```
const supabase = createClient('Project URL', 'API Key')
```

#PWA Directory
Uses code from [react-pwa-install](https://www.npmjs.com/package/react-pwa-install) directly to resolve package versioning issues