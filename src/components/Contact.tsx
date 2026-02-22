import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle, AlertCircle, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/content/siteConfig";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const web3FormsKey = (import.meta.env.VITE_WEB3FORMS_KEY ?? "").trim();
  const isContactFormConfigured =
    web3FormsKey.length > 0 && web3FormsKey !== "YOUR_ACCESS_KEY_HERE";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!isContactFormConfigured) {
      toast.info("Contact form is not configured in this build", {
        description: `Please email me directly at ${siteConfig.email}`,
      });
      return;
    }

    setStatus("submitting");

    try {
      // Using Web3Forms - free email API (get your key at https://web3forms.com)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        reset();
        toast.success("Message sent successfully!", {
          description: "I'll get back to you as soon as possible.",
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      toast.error("Failed to send message", {
        description: "Please try again or email me directly.",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-24">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />

      <div className="container relative">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="font-mono text-sm text-primary">05.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">Get In Touch</h2>
          </div>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-6 font-mono text-lg font-semibold">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-primary/5"
                >
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium transition-colors group-hover:text-primary">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{siteConfig.location}</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-6 border-t border-border pt-6">
                <p className="mb-3 text-sm text-muted-foreground">Connect with me</p>
                <div className="flex gap-3">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border px-4 py-2 font-mono text-sm transition-all hover:border-primary/50 hover:text-primary"
                  >
                    GitHub
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border px-4 py-2 font-mono text-sm transition-all hover:border-primary/50 hover:text-primary"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border px-4 py-2 font-mono text-sm transition-all hover:border-primary/50 hover:text-primary"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-6 font-mono text-lg font-semibold">Send a Message</h3>

            {!isContactFormConfigured && (
              <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="mb-2 font-mono text-xs text-primary">// form temporarily disabled</p>
                <p className="mb-3 text-sm text-muted-foreground">
                  The contact API key is not configured yet in this build. You can still reach me
                  directly by email.
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-background px-3 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary/5"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  {...register("subject")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  placeholder="Your message..."
                  rows={4}
                  {...register("message")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={`flex min-h-[120px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.message ? "border-destructive" : ""}`}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={status === "submitting" || !isContactFormConfigured}
              >
                {!isContactFormConfigured ? (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Email me directly
                  </>
                ) : status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Error
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
