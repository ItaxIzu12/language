const brands = [
  { id: "google", label: "Google" },
  { id: "apple", label: "Apple" },
] as const;

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M43.61 24.46c0-1.36-.12-2.66-.35-3.92H24v7.42h11.03a9.4 9.4 0 0 1-4.09 6.17v5.13h6.62c3.87-3.56 6.05-8.81 6.05-14.8Z"/>
    <path fill="#34A853" d="M24 44c5.51 0 10.13-1.83 13.56-4.74l-6.62-5.13c-1.83 1.23-4.17 1.97-6.94 1.97-5.32 0-9.84-3.59-11.45-8.43H5.72v5.29A20.47 20.47 0 0 0 24 44Z"/>
    <path fill="#FBBC05" d="M12.55 27.67a12.2 12.2 0 0 1 0-7.34v-5.29H5.72a20.1 20.1 0 0 0 0 17.92Z"/>
    <path fill="#EA4335" d="M24 11.9c3.01 0 5.71 1.04 7.83 3.09l5.87-5.87C34.13 5.81 29.51 4 24 4a20.47 20.47 0 0 0-18.28 11.04l6.83 5.29C14.16 15.49 18.68 11.9 24 11.9Z"/>
  </svg>;
}

function AppleMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 12.54c.02 3.25 2.85 4.33 2.88 4.34-.02.08-.45 1.54-1.49 3.05-.9 1.31-1.84 2.61-3.31 2.64-1.45.03-1.92-.85-3.58-.85-1.65 0-2.17.82-3.54.88-1.42.05-2.51-1.42-3.41-2.72-1.85-2.67-3.26-7.55-1.36-10.85.94-1.64 2.63-2.67 4.46-2.7 1.39-.03 2.71.94 3.57.94.85 0 2.45-1.16 4.13-.99.7.03 2.67.28 3.93 2.13-.1.07-2.3 1.35-2.28 4.13ZM14.34 4.49c.75-.91 1.25-2.18 1.11-3.44-1.08.04-2.39.72-3.17 1.63-.69.8-1.3 2.09-1.14 3.32 1.2.1 2.44-.61 3.2-1.51Z"/>
  </svg>;
}

export default function SocialSignIn({ providers, csrf, busy, next }: { next: string; providers: string[]; csrf: string; busy: boolean }) {
  return <div className="auth-providers">
    <span className="auth-divider">oder</span>
    {brands.map(({id, label}) => {
      const available = Boolean(csrf) && providers.includes(id);
      return <form method="post" action={`/api/oauth/${id}/login/`} key={id}>
        <input type="hidden" name="next" value={next}/>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrf}/>
        <button className={`auth-provider auth-${id}`} type="submit" disabled={!available || busy}>
          {id === "google" ? <GoogleMark/> : <AppleMark/>}
          <span>Mit {label} fortfahren</span>
          {!available && <small>Inaktiv</small>}
        </button>
      </form>;
    })}
  </div>;
}
