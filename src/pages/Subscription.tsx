
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LanguageSelector from "@/components/home/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Subscription.module.css";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobileNumber: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Subscription = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      interests: [],
    },
  });

  const interestOptions = [
    { id: "mobiles", label: "Mobiles" },
    { id: "laptops", label: "Laptops" },
    { id: "appliances", label: "Appliances" },
    { id: "groceries", label: "Groceries" },
  ];

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Form submission handling
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t("subscription_success"),
        description: t("subscription_success_desc"),
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t("subscription_failed"),
        description: t("subscription_failed_desc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
        <a href="#subscription-form" className="underline">Skip to subscription form</a>
      </div>
      
      <Navbar />
      
      <main className={`flex-1 py-16 px-6 ${styles.heroSection}`}>
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-center text-brand-black mb-8">
            {t("subscription_title")}
          </h1>
          
          <div className="bg-brand-yellow/20 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4 text-brand-black">{t("subscription_benefits")}</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-brand-black">{t("price_drop_alerts")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-brand-black">{t("smart_buying_tips")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-brand-black">{t("testing_team")}</span>
              </li>
            </ul>
          </div>
          
          <div id="subscription-form" className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6 text-brand-black">{t("subscribe_now")}</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">{t("name")}</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">{t("email")}</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="mobileNumber">{t("mobile_number")} ({t("optional")})</FormLabel>
                      <FormControl>
                        <Input id="mobileNumber" placeholder="Your mobile number" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("sms_alerts")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">{t("interests")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {interestOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          onCheckedChange={(checked) => {
                            const currentInterests = form.getValues("interests") || [];
                            
                            if (checked) {
                              form.setValue("interests", [...currentInterests, option.id]);
                            } else {
                              form.setValue(
                                "interests",
                                currentInterests.filter((value) => value !== option.id)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={option.id}>{t(option.id)}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-yellow-dark hover:bg-brand-yellow text-brand-black"
                  disabled={isSubmitting}
                  aria-label="Submit subscription form"
                >
                  {isSubmitting ? t("subscribing") : t("subscribe_now")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscription;
