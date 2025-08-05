
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  onClose: () => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let recognition: any = null;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Set to Indian English by default

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptValue = result[0].transcript;
        setTranscript(transcriptValue);
        
        if (result.isFinal) {
          onResult(transcriptValue);
        }
      };

      recognition.onerror = (event: any) => {
        setError(`Error occurred in recognition: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      // Start recognition
      recognition.start();
    } else {
      setError("Speech recognition not supported in this browser.");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onResult]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Voice Search</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close voice search"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center py-8">
          {isListening ? (
            <div className="pulse-animation mb-4" aria-live="polite">
              <div className="w-20 h-20 bg-brand-purple rounded-full mx-auto flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-brand-purple rounded-full"></div>
                </div>
              </div>
              <p className="mt-4 text-lg">Listening...</p>
            </div>
          ) : (
            <p>Voice recognition {error ? "error" : "ended"}</p>
          )}

          {transcript && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-lg">{transcript}</p>
            </div>
          )}

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          {transcript && (
            <Button onClick={() => onResult(transcript)}>
              Use This Text
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;
