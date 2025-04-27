import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const GradientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (meshRef.current) {
        const rect = meshRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={meshRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-full h-full"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255,106,0,0.2) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(255,106,0,0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,106,0,0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 30%, rgba(255,106,0,0.2) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          filter: 'blur(30px)',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,106,0,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,106,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.7,
        }}
      />
    </div>
  );
};

interface FormData {
  linkedinUrl: string;
  fullName: string;
  email: string;
  phone: string;
  personality: string;
}

const CtaSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    linkedinUrl: '',
    fullName: '',
    email: '',
    phone: '',
    personality: ''
  });

  const validateForm = (data: FormData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // LinkedIn URL validation
    if (!data.linkedinUrl.includes('linkedin.com/')) {
      errors.push('Please enter a valid LinkedIn URL');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
    }

    // Name validation
    if (data.fullName.trim().length < 2) {
      errors.push('Please enter your full name');
    }

    // Phone validation (optional)
    if (data.phone && !/^[+\d\s-()]{10,}$/.test(data.phone)) {
      errors.push('Please enter a valid phone number or leave it empty');
    }

    // Personality validation
    if (data.personality.trim().length < 50) {
      errors.push('Please provide more details about your personality and story (minimum 50 characters)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = 'https://hook.eu2.make.com/y6uglcn5efu6tp29yts8jgcson5gkiee';
      
      // Enhanced data validation
      if (!formData.email || !formData.fullName || !formData.linkedinUrl) {
        throw new Error('Please fill in all required fields');
      }

      // Format the data for the webhook with enhanced structure
      const payload = {
        submission: {
          contact: {
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone ? formData.phone.trim() : undefined,
            linkedinUrl: formData.linkedinUrl.trim(),
          },
          details: {
            personality: formData.personality.trim(),
            submissionDate: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            source: 'features_cta_form',
            browserInfo: {
              userAgent: navigator.userAgent,
              language: navigator.language,
              platform: navigator.platform
            }
          }
        },
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0',
          platform: 'web',
          environment: import.meta.env.MODE
        }
      };

      console.log('Sending form data to webhook:', {
        url: webhookUrl,
        payload: JSON.stringify(payload, null, 2)
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'AlantoAI-Website/1.0',
          'X-Request-ID': crypto.randomUUID()
        },
        body: JSON.stringify(payload),
        mode: 'cors',
      });

      console.log('Webhook response status:', response.status);
      console.log('Webhook response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error response:', errorText);
        
        // Enhanced error handling
        switch (response.status) {
          case 400:
            throw new Error('Invalid data format. Please check your input and try again.');
          case 401:
            throw new Error('Authentication failed. Please try again later.');
          case 403:
            throw new Error('Access denied. Please contact support.');
          case 429:
            throw new Error('Too many requests. Please wait a moment and try again.');
          case 500:
            throw new Error('Server error. Please try again later or contact support.');
          case 503:
            throw new Error('Service temporarily unavailable. Please try again later.');
          default:
            throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
        }
      }

      // Try to get JSON response if available
      let responseData;
      try {
        responseData = await response.json();
        console.log('Webhook response data:', responseData);
      } catch (e) {
        console.log('No JSON response from webhook');
      }

      // Reset form on success
      setFormData({
        linkedinUrl: '',
        fullName: '',
        email: '',
        phone: '',
        personality: ''
      });

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully. We will contact you soon.",
        variant: "default",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'There was a problem submitting your form. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-20 relative overflow-hidden" id="cta">
      <GradientBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ 
              color: '#FF6A00',
              textShadow: '0 0 30px rgba(255,106,0,0.6)',
              WebkitTextStroke: '1px rgba(255,106,0,0.3)',
              position: 'relative',
              zIndex: 10
            }}
          >
            Two clicks → Your AI Twin in 20 hrs
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto font-medium"
            style={{ 
              color: '#000',
              textShadow: '0 0 15px rgba(255,106,0,0.3)',
              position: 'relative',
              zIndex: 10
            }}
          >
            Submit your information and get started with your AI twin today.
          </p>
        </div>
        
        <motion.div 
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium mb-2">LinkedIn URL</label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full"
                required
                pattern=".*linkedin\.com.*"
                title="Please enter a valid LinkedIn URL"
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full name</label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full"
                required
                minLength={2}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full"
                required
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                title="Please enter a valid email address"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone (Optional)</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full"
                pattern="[+\d\s-()]{10,}"
                title="Please enter a valid phone number"
              />
            </div>

            <div>
              <label htmlFor="personality" className="block text-sm font-medium mb-2">Your personality and story (important)</label>
              <Textarea
                id="personality"
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                placeholder="Tell us about your personality and story..."
                className="w-full min-h-[150px]"
                required
                minLength={50}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.personality.length}/50 characters minimum
              </p>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-alanto-orange hover:bg-orange-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Launch Your Alter Ego'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesAndCTA = () => {
  return (
    <>
      <CtaSection />
    </>
  );
};

export default FeaturesAndCTA;
