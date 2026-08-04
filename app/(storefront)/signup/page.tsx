'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  
  // Math Challenge State
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [mathAnswer, setMathAnswer] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  // Generate random math challenge on load
  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side Bot Checks
    if (honeypot.trim() !== '') {
      toast.error('Bot detected.');
      return;
    }
    
    if (parseInt(mathAnswer) !== (num1 + num2)) {
      toast.error('Incorrect security check answer.');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, honeypot }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success('Account created successfully! You earned 1 Point 💎');
        login(data.user);
        router.push('/');
      } else {
        if (data.message === 'Email already exists') {
          toast.error(
            <div className="flex flex-col gap-2">
              <span className="font-bold text-base">This email is already registered!</span>
              <Link href="/login">
                <Button variant="default" size="sm" className="w-fit mt-1">
                  Go to Sign In
                </Button>
              </Link>
            </div>,
            { duration: 6000 }
          );
        } else {
          toast.error(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-3xl shadow-sm border border-border/50">
          <div>
            <h2 className="mt-6 text-center text-3xl font-heading font-bold text-foreground">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Or{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                sign in to your existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-address">Email address</Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  placeholder="••••••••"
                />
              </div>
              
              {/* Security Verification */}
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="math-answer">Security Check: What is {num1} + {num2}?</Label>
                <Input
                  id="math-answer"
                  type="number"
                  required
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  className="h-12"
                  placeholder="Enter the sum"
                />
              </div>

              {/* Honeypot Field (Hidden from real users) */}
              <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1]">
                <Label htmlFor="website_url_99">Leave this field empty</Label>
                <Input
                  id="website_url_99"
                  name="website_url_99"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full h-12 text-lg rounded-xl" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </div>
          </form>
        </div>
    </div>
  );
}
