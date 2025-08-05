export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [languageCode: string]: Translation;
}

export const translations: Translations = {
  en: {
    // Common
    "search": "Search",
    "copy": "Copy",
    "copied": "Copied",
    "subscribe": "Subscribe",
    "subscribe_now": "Subscribe Now",
    "name": "Name",
    "email": "Email",
    "mobile_number": "Mobile Number",
    "optional": "Optional",
    "interests": "Interests",
    "submit": "Submit",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    
    // Navigation
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "privacy": "Privacy Policy",
    "search_examples": "Search Examples",
    
    // Hero Section
    "hero_title": "Find the Best Products with Honest Reviews",
    "hero_subtitle": "Get unbiased product insights from real users across Flipkart and Amazon.in",
    "search_placeholder": "Describe what you're looking for...",
    "voice_search": "Voice Search",
    
    // Search Examples
    "search_examples_title": "Not Sure What to Search? Try These Examples!",
    "search_examples_subtitle": "Finding the perfect product can be challenging. Here are some example search phrases to help you get started with specific queries across different categories.",
    "keyboard_navigation": "Keyboard Navigation Guide",
    "tab_navigate": "Tab: Navigate between interactive elements",
    "enter_activate": "Enter/Space: Activate buttons or links",
    "shift_tab_backward": "Shift+Tab: Navigate backward",
    "esc_close": "Esc: Close dialogs or dropdowns",
    "alt_home": "Alt+Home: Return to homepage",
    
    // Subscription
    "subscription_title": "Get Early Access & Smart Deal Alerts",
    "subscription_benefits": "Benefits of Subscribing",
    "price_drop_alerts": "Get price drop alerts for products you're interested in",
    "smart_buying_tips": "Get smart buying tips for top categories",
    "testing_team": "Be part of our testing team and help shape the future of Labelogic",
    "sms_alerts": "We'll send SMS alerts for price drops if provided",
    "subscribing": "Subscribing...",
    "subscription_success": "Subscription successful!",
    "subscription_success_desc": "Thank you for subscribing to our service.",
    "subscription_failed": "Subscription failed",
    "subscription_failed_desc": "There was a problem with your subscription. Please try again.",
    
    // Categories
    "electronics": "Electronics",
    "kitchen": "Kitchen",
    "clothing": "Clothing",
    "home_appliances": "Home Appliances",
    "audio": "Audio",
    "health": "Health",
    "mobiles": "Mobiles",
    "laptops": "Laptops",
    "appliances": "Appliances",
    "groceries": "Groceries",
    
    // Product Search Examples
    "phone_battery_example": "Phone with best battery under ₹25K",
    "phone_battery_desc": "Find smartphones with excellent battery life in the budget range",
    "mixer_grinder_example": "Mixer grinder below ₹3K with best reviews",
    "mixer_grinder_desc": "Discover top-rated affordable mixer grinders",
    "womens_kurtas_example": "Women's kurtas under ₹800 on sale",
    "womens_kurtas_desc": "Browse discounted women's ethnic wear options",
    "inverter_ac_example": "Best inverter AC under ₹35K",
    "inverter_ac_desc": "Energy-efficient air conditioners at competitive prices",
    "noise_cancelling_example": "Noise cancelling earbuds below ₹5K",
    "noise_cancelling_desc": "Affordable earbuds with active noise cancellation",
    "bp_monitor_example": "Blood pressure monitor with good accuracy",
    "bp_monitor_desc": "Reliable health monitoring devices with precise readings"
  },
  
  hi: {
    // Common
    "search": "खोजें",
    "copy": "कॉपी करें",
    "copied": "कॉपी किया गया",
    "subscribe": "सदस्यता लें",
    "subscribe_now": "अभी सदस्यता लें",
    "name": "नाम",
    "email": "ईमेल",
    "mobile_number": "मोबाइल नंबर",
    "optional": "वैकल्पिक",
    "interests": "रुचियां",
    "submit": "जमा करें",
    "loading": "लोड हो रहा है...",
    "error": "त्रुटि",
    "success": "सफलता",
    
    // Navigation
    "home": "होम",
    "about": "हमारे बारे में",
    "contact": "संपर्क",
    "privacy": "गोपनीयता नीति",
    "search_examples": "खोज उदाहरण",
    
    // Hero Section
    "hero_title": "ईमानदार समीक्षाओं के साथ सर्वश्रेष्ठ उत्पाद खोजें",
    "hero_subtitle": "Flipkart और Amazon.in के वास्तविक उपयोगकर्ताओं से निष्पक्ष उत्पाद अंतर्दृष्टि प्राप्त करें",
    "search_placeholder": "बताएं कि आप क्या खोज रहे हैं...",
    "voice_search": "वॉइस खोज",
    
    // Search Examples
    "search_examples_title": "नहीं पता क्या खोजना है? इन उदाहरणों को आज़माएं!",
    "search_examples_subtitle": "सही उत्पाद खोजना चुनौतीपूर्ण हो सकता है। यहां कुछ उदाहरण खोज वाक्यांश हैं जो विभिन्न श्रेणियों में विशिष्ट प्रश्नों के साथ शुरू करने में आपकी मदद करेंगे।",
    "keyboard_navigation": "कीबोर्ड नेविगेशन गाइड",
    "tab_navigate": "Tab: इंटरैक्टिव तत्वों के बीच नेविगेट करें",
    "enter_activate": "Enter/Space: बटन या लिंक सक्रिय करें",
    "shift_tab_backward": "Shift+Tab: पीछे की ओर नेविगेट करें",
    "esc_close": "Esc: डायलॉग या ड्रॉपडाउन बंद करें",
    "alt_home": "Alt+Home: होमपेज पर वापस जाएं",
    
    // Subscription
    "subscription_title": "प्रारंभिक पहुंच और स्मार्ट डील अलर्ट प्राप्त करें",
    "subscription_benefits": "सदस्यता लेने के लाभ",
    "price_drop_alerts": "आपकी रुचि के उत्पादों के लिए मूल्य गिरावट अलर्ट प्राप्त करें",
    "smart_buying_tips": "शीर्ष श्रेणियों के लिए स्मार्ट खरीदारी टिप्स प्राप्त करें",
    "testing_team": "हमारी टेस्टिंग टीम का हिस्सा बनें और Labelogic के भविष्य को आकार देने में मदद करें",
    "sms_alerts": "यदि प्रदान किया गया है तो हम मूल्य गिरावट के लिए SMS अलर्ट भेजेंगे",
    "subscribing": "सदस्यता ले रहे हैं...",
    "subscription_success": "सदस्यता सफल!",
    "subscription_success_desc": "हमारी सेवा की सदस्यता लेने के लिए धन्यवाद।",
    "subscription_failed": "सदस्यता विफल",
    "subscription_failed_desc": "आपकी सदस्यता में कोई समस्या थी। कृपया पुनः प्रयास करें।",
    
    // Categories
    "electronics": "इलेक्ट्रॉनिक्स",
    "kitchen": "रसोई",
    "clothing": "कपड़े",
    "home_appliances": "घरेलू उपकरण",
    "audio": "ऑडियो",
    "health": "स्वास्थ्य",
    "mobiles": "मोबाइल",
    "laptops": "लैपटॉप",
    "appliances": "उपकरण",
    "groceries": "किराना",
    
    // Product Search Examples
    "phone_battery_example": "₹25K के तहत सर्वश्रेष्ठ बैटरी वाला फोन",
    "phone_battery_desc": "बजट रेंज में उत्कृष्ट बैटरी लाइफ वाले स्मार्टफोन खोजें",
    "mixer_grinder_example": "₹3K के तहत सर्वश्रेष्ठ समीक्षाओं वाला मिक्सर ग्राइंडर",
    "mixer_grinder_desc": "शीर्ष-रेटेड किफायती मिक्सर ग्राइंडर खोजें",
    "womens_kurtas_example": "सेल में ₹800 के तहत महिलाओं के कुर्ते",
    "womens_kurtas_desc": "छूट वाले महिलाओं के एथनिक वियर विकल्प ब्राउज़ करें",
    "inverter_ac_example": "₹35K के तहत सर्वश्रेष्ठ इन्वर्टर AC",
    "inverter_ac_desc": "प्रतिस्पर्धी मूल्यों पर ऊर्जा-कुशल एयर कंडीशनर",
    "noise_cancelling_example": "₹5K के तहत नॉइज कैंसलिंग इयरबड्स",
    "noise_cancelling_desc": "सक्रिय नॉइज कैंसलेशन के साथ किफायती इयरबड्स",
    "bp_monitor_example": "अच्छी सटीकता वाला ब्लड प्रेशर मॉनिटर",
    "bp_monitor_desc": "सटीक रीडिंग के साथ विश्वसनीय स्वास्थ्य मॉनिटरिंग डिवाइस"
  },
  
  ta: {
    // Common
    "search": "தேடு",
    "copy": "நகலெடு",
    "copied": "நகலெடுக்கப்பட்டது",
    "subscribe": "சந்தா",
    "subscribe_now": "இப்போது சந்தா",
    "name": "பெயர்",
    "email": "மின்னஞ்சல்",
    "mobile_number": "மொபைல் எண்",
    "optional": "விருப்ப",
    "interests": "ஆர்வங்கள்",
    "submit": "சமர்ப்பி",
    "loading": "ஏற்றுகிறது...",
    "error": "பிழை",
    "success": "வெற்றி",
    
    // Navigation
    "home": "முகப்பு",
    "about": "எங்களைப் பற்றி",
    "contact": "தொடர்பு",
    "privacy": "தனியுரிமைக் கொள்கை",
    "search_examples": "தேடல் எடுத்துக்காட்டுகள்",
    
    // Hero Section
    "hero_title": "நேர்மையான மதிப்பாய்வுகளுடன் சிறந்த பொருட்களைக் கண்டறியுங்கள்",
    "hero_subtitle": "Flipkart மற்றும் Amazon.in இல் உள்ள உண்மையான பயனர்களிடமிருந்து நடுநிலை பொருள் நுண்ணறிவுகளைப் பெறுங்கள்",
    "search_placeholder": "நீங்கள் எதைத் தேடுகிறீர்கள் என்பதை விவரிக்கவும்...",
    "voice_search": "குரல் தேடல்",
    
    // Search Examples
    "search_examples_title": "என்ன தேடுவது என்று தெரியவில்லையா? இந்த எடுத்துக்காட்டுகளை முயற்சிக்கவும்!",
    "search_examples_subtitle": "சரியான பொருளைக் கண்டறிவது சவாலாக இருக்கலாம். பல்வேறு வகைகளில் குறிப்பிட்ட கேள்விகளுடன் தொடங்க உதவும் சில எடுத்துக்காட்டு தேடல் சொற்றொடர்கள் இங்கே உள்ளன.",
    "keyboard_navigation": "விசைப்பலகை வழிசெலுத்தல் வழிகாட்டி",
    "tab_navigate": "Tab: செயல்பாட்டு உறுப்புகளுக்கு இடையே செல்லவும்",
    "enter_activate": "Enter/Space: பொத்தான்கள் அல்லது இணைப்புகளை செயல்படுத்தவும்",
    "shift_tab_backward": "Shift+Tab: பின்னோக்கி செல்லவும்",
    "esc_close": "Esc: உரையாடல்கள் அல்லது கீழ்தோன்றல்களை மூடவும்",
    "alt_home": "Alt+Home: முகப்பு பக்கத்திற்குத் திரும்பவும்",
    
    // Subscription
    "subscription_title": "முன்கூட்டிய அணுகல் மற்றும் ஸ்மார்ட் டீல் எச்சரிக்கைகளைப் பெறுங்கள்",
    "subscription_benefits": "சந்தா பெறுவதன் நன்மைகள்",
    "price_drop_alerts": "நீங்கள் ஆர்வமுள்ள பொருட்களுக்கான விலை வீழ்ச்சி எச்சரிக்கைகளைப் பெறுங்கள்",
    "smart_buying_tips": "முன்னணி வகைகளுக்கான ஸ்மார்ட் வாங்கும் குறிப்புகளைப் பெறுங்கள்",
    "testing_team": "எங்கள் சோதனை குழுவின் ஒரு பகுதியாக இருந்து Labelogic இன் எதிர்காலத்தை வடிவமைக்க உதவுங்கள்",
    "sms_alerts": "விலை வீழ்ச்சிக்கான SMS எச்சரிக்கைகளை நாங்கள் அனுப்புவோம்",
    "subscribing": "சந்தா பெறுகிறது...",
    "subscription_success": "சந்தா வெற்றி!",
    "subscription_success_desc": "எங்கள் சேவையில் சந்தா பெற்றதற்கு நன்றி.",
    "subscription_failed": "சந்தா தோல்வி",
    "subscription_failed_desc": "உங்கள் சந்தாவில் சிக்கல் இருந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    
    // Categories
    "electronics": "மின்னணுவியல்",
    "kitchen": "சமையலறை",
    "clothing": "ஆடை",
    "home_appliances": "வீட்டு சாதனங்கள்",
    "audio": "ஒலி",
    "health": "சுகாதாரம்",
    "mobiles": "மொபைல்கள்",
    "laptops": "லேப்டாப்கள்",
    "appliances": "சாதனங்கள்",
    "groceries": "கடைப்பொருட்கள்",
    
    // Product Search Examples
    "phone_battery_example": "₹25K கீழ் சிறந்த பேட்டரி கொண்ட தொலைபேசி",
    "phone_battery_desc": "பட்ஜெட் வரம்பில் சிறந்த பேட்டரி வாழ்க்கையுடன் கூடிய ஸ்மார்ட்போன்களைக் கண்டறியுங்கள்",
    "mixer_grinder_example": "₹3K கீழ் சிறந்த மதிப்பாய்வுகளுடன் கூடிய கலப்பான் அரைப்பான்",
    "mixer_grinder_desc": "முன்னணி மதிப்பிடப்பட்ட மலிவான கலப்பான் அரைப்பான்களைக் கண்டறியுங்கள்",
    "womens_kurtas_example": "₹800 கீழ் விற்பனையில் பெண்களின் குர்தாக்கள்",
    "womens_kurtas_desc": "தள்ளுபடி பெண்களின் இனக்கோடு ஆடைகளை உலாவுங்கள்",
    "inverter_ac_example": "₹35K கீழ் சிறந்த இன்வர்டர் AC",
    "inverter_ac_desc": "போட்டி விலைகளில் ஆற்றல்-திறன் குளிர்சாதனங்கள்",
    "noise_cancelling_example": "₹5K கீழ் இரைச்சல் நீக்கும் காதணிகள்",
    "noise_cancelling_desc": "செயலில் இரைச்சல் நீக்கத்துடன் மலிவான காதணிகள்",
    "bp_monitor_example": "நல்ல துல்லியத்துடன் இரத்த அழுத்த மானி",
    "bp_monitor_desc": "துல்லியமான அளவீடுகளுடன் நம்பகமான சுகாதார கண்காணிப்பு சாதனங்கள்"
  }
};

export const getTranslation = (languageCode: string, key: string): string => {
  const language = translations[languageCode] || translations.en;
  return language[key] || key;
}; 