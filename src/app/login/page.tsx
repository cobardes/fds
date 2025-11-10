"use client";

import { useState } from "react";

import { login } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setLoading(true);
    try {
      await login(formData);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col w-md mx-auto mt-10 px-8 py-6 gap-10 text-sm"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="p-2 rounded-md bg-neutral-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="p-2 rounded-md bg-neutral-100"
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-neutral-800 text-background p-2 rounded-md cursor-pointer disabled:opacity-50"
        disabled={loading}
      >
        Log in
      </button>
    </form>
  );
}
