import AuthCheck from "@/components/layout/AuthCheck"
import { GoogleSigninButton } from "@/components/layout/GoogleSigninButton"

export default function Home() {
  return (
    <div>
      <AuthCheck showIfNotAuthenticated>
        <div className="h-[500px] px-6 flex flex-col items-center justify-center">
          <h2 className="mb-3 text-3xl font-semibold">Welcome!</h2>
          <p className="mb-7">Login to manage Secret Santa events.</p>

          <GoogleSigninButton />
        </div>
      </AuthCheck>
    </div>
  )
}
