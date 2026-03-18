'use client';

import { useState } from 'react';
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from 'next/navigation';   // ✅ Import router

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();                  // ✅ Initialize router
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      // 🔹 Redirect after success
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        {isSignup ? 'Create Account' : 'Login'}
      </button>
      <p className="mt-4 text-center text-sm">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          className="text-blue-500 underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </form>
  );
}