import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col w-md mx-auto mt-10 px-8 py-6 gap-10 text-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required className="p-2 rounded-md bg-neutral-100" />
      </div>
      <div className="flex flex-col gap-2">
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required className="p-2 rounded-md bg-neutral-100" />
      </div>
      </div>
      <button formAction={login} className="bg-neutral-800 text-white p-2 rounded-md cursor-pointer">Log in</button>
    </form>
  )
}