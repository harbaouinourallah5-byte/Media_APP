'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "e03d8637-d0e4-4891-ba24-3a4422796719");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!", {
          description: "We've received your message and will get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Form Error", data);
        toast.error("Failed to send message.", {
          description: data.message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Form Exception", error);
      toast.error("An error occurred.", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We would love to hear from you. Whether you have a question about our products, an order, or just want to say hello, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Contact Information */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Visit Us</h4>
                      <p className="text-muted-foreground mt-1">Ariana , SiditThabet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Call Us</h4>
                      <p className="text-muted-foreground mt-1">+216 52612052</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email Us</h4>
                      <p className="text-muted-foreground mt-1">medinabeauty133@gmail.com</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-card p-8 md:p-10 rounded-3xl border border-border/50 shadow-sm">
                <h3 className="text-2xl font-heading font-bold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Web3Forms required subject field for cleaner emails */}
                  <input type="hidden" name="subject" value="New Contact Form Submission from Medina Beauty" />
                  <input type="hidden" name="from_name" value="Medina Beauty Website" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="First Name" placeholder="Jane" required className="h-12 bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="Last Name" placeholder="Doe" required className="h-12 bg-background" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@example.com" required className="h-12 bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userSubject">Subject</Label>
                    <Input id="userSubject" name="User Subject" placeholder="How can we help?" required className="h-12 bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Write your message here..."
                    />
                  </div>
                  <Button disabled={isSubmitting} type="submit" className="w-full md:w-auto h-12 px-8 rounded-xl text-lg">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
