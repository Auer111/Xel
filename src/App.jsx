import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import * as React from 'react';
import Button from '@mui/material/Button';
import { useReactPWAInstall } from './PWA/ReactPWAInstallContext'

//https://supabase.com/dashboard/project/
const supabase = createClient('Project URL', 'API Key')

export default function App() {
  const [session, setSession] = useState(null)
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handlePwaClick = () => {
    pwaInstall({
      title: "Install Web App",
      features: (
        <ul>
          <li>Cool feature 1</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "This is how the install dialog looks like. Here you can describe your app briefly.",
    })
      .then(() => console.log("App installed successfully or instructions for install shown"))
      .catch(() => console.log("User opted out from installing"));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error logging out:', error.message)
    setSession(null) // Clear the session
  }

  const PWA = ()=><>{supported() && !isInstalled() && (
    <Button type="button" onClick={handlePwaClick} variant="outlined" style={{ width: "100%" }}>
      Install app
    </Button>
  )}</>

  if (!session) {
    return (<><Auth supabaseClient={supabase} providers={['google']} appearance={{ theme: ThemeSupa }} onlyThirdPartyProviders showLinks={false} localization={{
      variables: {
        sign_up: {
          social_provider_text: 'Sign up with Google',
        },
      },
    }}  /><PWA/></>)
  }
  else {
    return (<><Button variant='contained' onClick={handleLogout} style={{ width: "100%", marginBottom:"1em" }}>Log Out</Button><PWA/></>)
  }

  
}