import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle, AlertCircle, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSiteConfig } from "@/content/siteConfig";
import { useLanguage } from "@/i18n/LanguageProvider";

type FormStatus = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const { language } = useLanguage();
  const siteConfig = getSiteConfig(language);
  const [status, setStatus] = useState<FormStatus>("idle");
  const web3FormsKey = (import.meta.env.VITE_WEB3FORMS_KEY ?? "").trim();
  const isContactFormConfigured =
    web3FormsKey.length > 0 &&
    web3FormsKey !== "YOUR_ACCESS_KEY_HERE" &&
    web3FormsKey !== "your_web3forms_access_key_here";

  const text = {
    sectionTitle: language === "ru" ? "Связаться со мной" : "Get In Touch",
    sectionDescription:
      language === "ru"
        ? "Есть идея проекта или предложение о сотрудничестве? Напишите мне."
        : "Have a project in mind or want to collaborate? Feel free to reach out!",
    infoTitle: language === "ru" ? "Контактная информация" : "Contact Information",
    connectLabel: language === "ru" ? "Также можно написать:" : "Connect with me",
    formTitle: language === "ru" ? "Отправить сообщение" : "Send a Message",
    formDisabledTitle: language === "ru" ? "// форма временно отключена" : "// form temporarily disabled",
    formDisabledDescription:
      language === "ru"
        ? "В этой сборке пока не настроен API-ключ формы. Вы можете написать мне напрямую на email."
        : "The contact API key is not configured yet in this build. You can still reach me directly by email.",
    name: language === "ru" ? "Имя" : "Name",
    email: "Email",
    subject: language === "ru" ? "Тема" : "Subject",
    message: language === "ru" ? "Сообщение" : "Message",
    namePlaceholder: language === "ru" ? "Ваше имя" : "Your name",
    emailPlaceholder: "your@email.com",
    subjectPlaceholder: language === "ru" ? "О чем хотите поговорить?" : "What's this about?",
    messagePlaceholder: language === "ru" ? "Ваше сообщение..." : "Your message...",
    submitDirect: language === "ru" ? "Написать на email" : "Email me directly",
    submitSending: language === "ru" ? "Отправка..." : "Sending...",
    submitSent: language === "ru" ? "Отправлено!" : "Sent!",
    submitError: language === "ru" ? "Ошибка" : "Error",
    submitDefault: language === "ru" ? "Отправить сообщение" : "Send Message",
    locationLabel: language === "ru" ? "Локация" : "Location",
  };

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, language === "ru" ? "Имя должно быть не короче 2 символов" : "Name must be at least 2 characters"),
        email: z
          .string()
          .email(language === "ru" ? "Введите корректный email" : "Please enter a valid email address"),
        subject: z
          .string()
          .min(5, language === "ru" ? "Тема должна быть не короче 5 символов" : "Subject must be at least 5 characters"),
        message: z
          .string()
          .min(20, language === "ru" ? "Сообщение должно быть не короче 20 символов" : "Message must be at least 20 characters"),
      }),
    [language],
  );

  type ContactFormData = z.infer<typeof contactSchema>;

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
      toast.info(
        language === "ru"
          ? "Форма обратной связи не настроена в этой сборке"
          : "Contact form is not configured in this build",
        {
          description:
            language === "ru"
              ? `Пожалуйста, напишите мне напрямую: ${siteConfig.email}`
              : `Please email me directly at ${siteConfig.email}`,
        },
      );
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("access_key", web3FormsKey);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);
      formData.append("from_name", "Portfolio Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        reset();
        toast.success(language === "ru" ? "Сообщение успешно отправлено!" : "Message sent successfully!", {
          description:
            language === "ru"
              ? "Я отвечу вам в ближайшее время."
              : "I'll get back to you as soon as possible.",
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      toast.error(language === "ru" ? "Не удалось отправить сообщение" : "Failed to send message", {
        description:
          language === "ru"
            ? "Попробуйте снова или напишите мне на email."
            : "Please try again or email me directly.",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />

      <div className="container relative">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="font-mono text-sm text-primary">05.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">{text.sectionTitle}</h2>
          </div>
          <p className="mx-auto max-w-lg text-muted-foreground">{text.sectionDescription}</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-6 font-mono text-lg font-semibold">{text.infoTitle}</h3>

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
                    <p className="text-xs text-muted-foreground">{text.locationLabel}</p>
                    <p className="text-sm font-medium">{siteConfig.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <p className="mb-3 text-sm text-muted-foreground">{text.connectLabel}</p>
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

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-6 font-mono text-lg font-semibold">{text.formTitle}</h3>

            {!isContactFormConfigured && (
              <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="mb-2 font-mono text-xs text-primary">{text.formDisabledTitle}</p>
                <p className="mb-3 text-sm text-muted-foreground">{text.formDisabledDescription}</p>
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
                <Label htmlFor="name">{text.name}</Label>
                <Input
                  id="name"
                  placeholder={text.namePlaceholder}
                  {...register("name")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{text.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={text.emailPlaceholder}
                  {...register("email")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{text.subject}</Label>
                <Input
                  id="subject"
                  placeholder={text.subjectPlaceholder}
                  {...register("subject")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{text.message}</Label>
                <Textarea
                  id="message"
                  placeholder={text.messagePlaceholder}
                  rows={4}
                  {...register("message")}
                  disabled={!isContactFormConfigured || status === "submitting"}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={status === "submitting" || !isContactFormConfigured}
              >
                {!isContactFormConfigured ? (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {text.submitDirect}
                  </>
                ) : status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {text.submitSending}
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {text.submitSent}
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    {text.submitError}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {text.submitDefault}
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
