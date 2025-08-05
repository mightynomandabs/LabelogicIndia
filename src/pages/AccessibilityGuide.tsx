
import React, { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LanguageSelector from "@/components/home/LanguageSelector";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const AccessibilityGuide = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Layout>
      {/* Skip to content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:outline focus:outline-2">
        Skip to content
      </a>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 id="main-content" className="text-3xl font-bold text-brand-black">
            How Label Logic Supports All Users
          </h1>
          <div className="mt-4 md:mt-0">
            <LanguageSelector />
          </div>
        </div>

        <Separator className="my-6" />

        <section className="mb-10 bg-secondary p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Voice Search and Output</h2>
          <p className="mb-4">
            Label Logic is designed to be used hands-free through comprehensive voice interaction. 
            Our voice search feature allows you to describe products in natural language, just as you would speak to a friend.
          </p>
          <p className="mb-4">
            Say something like "Show me Samsung phones under ₹30,000 with good battery life" and our system will process your query and return relevant results.
          </p>
          <p>
            All search results and product reviews can be listened to through our text-to-speech feature, making information accessible even when reading isn't convenient or possible.
          </p>

          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Sample Audio Summary</h3>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={toggleAudio}
                aria-label="Play sample audio"
                className="flex items-center space-x-2 bg-brand-purple text-white hover:bg-brand-purple-dark"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Hear a Sample Summary</span>
                  </>
                )}
              </Button>

              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src="https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              <div className="text-sm text-muted-foreground">
                {isPlaying ? "Playing sample..." : "Click to hear how our summaries sound"}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Screen Reader Support</h2>
          <p className="mb-4">
            Label Logic is built to work seamlessly with all popular screen readers including JAWS, NVDA, and VoiceOver. 
            Our commitment to WCAG 2.1 AA compliance ensures that all users can navigate and use our site effectively.
          </p>
          
          <Collapsible className="border rounded-md p-2">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-2 font-medium">
              <span>Key Screen Reader Features</span>
              <span className="text-xs bg-brand-yellow px-2 py-1 rounded">Click to expand</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-gray-50">
              <ul className="list-disc pl-5 space-y-2">
                <li>Proper heading structure and hierarchy</li>
                <li>ARIA landmarks for easy navigation</li>
                <li>Descriptive alt text for all images</li>
                <li>Accessible form inputs with proper labels</li>
                <li>Focus management for dynamic content</li>
                <li>Announcements for state changes</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
            <h3 className="font-medium mb-2">Example ARIA Implementation:</h3>
            <pre className="bg-black text-white p-3 rounded overflow-x-auto">
              &lt;button 
  aria-label="Activate voice search"
  aria-pressed="false"
  role="button"&gt;
  Voice Search
&lt;/button&gt;
            </pre>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Braille Compatibility</h2>
          <p className="mb-4">
            Label Logic is designed to be fully compatible with refreshable Braille displays. Our focus on providing clean, 
            semantic HTML ensures that all content can be properly rendered as Braille output.
          </p>
          <p className="mb-4">
            Users with Braille displays can navigate through our product comparisons, reviews, and summaries efficiently with:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2 text-brand-purple">Consistent Layout</h3>
              <p className="text-sm">
                Predictable page structures make navigation more intuitive when using Braille displays
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2 text-brand-purple">Text Alternatives</h3>
              <p className="text-sm">
                All non-text content has appropriate text alternatives for Braille translation
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2 text-brand-purple">Keyboard Shortcuts</h3>
              <p className="text-sm">
                Enhanced keyboard navigation for Braille display users
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2 text-brand-purple">Simplified Tables</h3>
              <p className="text-sm">
                Product comparison tables are designed for easy linear navigation
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-brand-yellow/20 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
          <p className="mb-4">
            Label Logic can be fully operated using only a keyboard. We've implemented logical tab order and visual focus indicators to help keyboard users navigate efficiently.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">Keyboard Navigation Shortcuts</caption>
              <thead>
                <tr className="bg-brand-yellow">
                  <th className="border p-2 text-left">Key</th>
                  <th className="border p-2 text-left">Function</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2"><kbd className="px-2 py-1 bg-gray-100 rounded">Tab</kbd></td>
                  <td className="border p-2">Move to the next interactive element</td>
                </tr>
                <tr>
                  <td className="border p-2"><kbd className="px-2 py-1 bg-gray-100 rounded">Shift + Tab</kbd></td>
                  <td className="border p-2">Move to the previous interactive element</td>
                </tr>
                <tr>
                  <td className="border p-2"><kbd className="px-2 py-1 bg-gray-100 rounded">Enter</kbd></td>
                  <td className="border p-2">Activate buttons, links, or select items</td>
                </tr>
                <tr>
                  <td className="border p-2"><kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd></td>
                  <td className="border p-2">Activate buttons or toggle options</td>
                </tr>
                <tr>
                  <td className="border p-2"><kbd className="px-2 py-1 bg-gray-100 rounded">Alt + /</kbd></td>
                  <td className="border p-2">Open voice search</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white">
            Contact Us for Accessibility Support
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AccessibilityGuide;
