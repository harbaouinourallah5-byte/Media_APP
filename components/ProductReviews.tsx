'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface Review {
  _id?: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function ProductReviews({ productId, initialReviews }: { productId: string, initialReviews: Review[] }) {
  const { user, updatePoints } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error('You must be logged in to review');
    if (!comment.trim()) return toast.error('Please write a comment');
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          rating,
          comment
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Review submitted!');
        // Locally update reviews
        setReviews([...reviews, {
          user: user.id,
          name: user.name,
          rating,
          comment,
          createdAt: new Date().toISOString()
        }]);
        setComment('');
      } else {
        toast.error(data.message || 'Error submitting review');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t pt-12">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-heading font-bold">Customer Reviews</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Write Review Form */}
        <div className="lg:col-span-1">
          <div className="bg-muted p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        type="button" 
                        key={star} 
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star className={`h-6 w-6 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Review</label>
                  <Textarea 
                    placeholder="What did you like about this product?" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-4">You must be signed in to write a review and earn points.</p>
                <a href="/login" className="block w-full">
                  <Button variant="outline" className="w-full">
                    Sign In to Review
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-2xl border-2 border-dashed">
              <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map((review, i) => (
              <div key={review._id || i} className="border-b pb-6 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`h-4 w-4 ${idx < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
