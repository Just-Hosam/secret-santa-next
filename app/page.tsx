import AuthCheck from "@/components/layout/AuthCheck"
import { GoogleSigninButton } from "@/components/layout/GoogleSigninButton"

export default function Home() {
  return (
    <div>
      <AuthCheck>
        <h2>LOGGED IN</h2>
      </AuthCheck>
      <AuthCheck showIfNotAuthenticated>
        <GoogleSigninButton></GoogleSigninButton>
      </AuthCheck>
      <p>Hello I am the main page</p>
    </div>
  )
}
