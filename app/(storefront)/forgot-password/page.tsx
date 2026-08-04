'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(data.message || 'Code sent to your email!');
        setStep(2);
      } else {
        toast.error(data.message || 'Failed to send code');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success('Password reset successfully! Please sign in.');
        router.push('/login');
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-3xl shadow-sm border border-border/50">
        <div>
          <h2 className="text-center text-3xl font-heading font-bold text-foreground">
            {step === 1 ? 'Reset Password' : 'Enter Reset Code'}
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {step === 1 
              ? "Enter your email and we'll send you a 6-digit code." 
              : `We sent a code to ${email}`}
          </p>
        </div>

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleRequestCode}>
            <div className="space-y-2">
              <Label htmlFor="email-address">Email address</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                placeholder="you@example.com"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg rounded-xl" disabled={loading}>
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Remembered your password?{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">6-Digit Code</Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-12 tracking-widest text-center text-xl font-bold"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg rounded-xl" disabled={loading}>
              {loading ? 'Resetting...' : 'Update Password'}
            </Button>
            
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-center text-sm text-primary hover:text-primary/80 mt-4"
            >
              Didn't get a code? Try again.
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
