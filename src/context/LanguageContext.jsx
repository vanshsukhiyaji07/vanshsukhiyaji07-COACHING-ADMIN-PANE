import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation strings
const translations = {
    en: {
        // Dashboard
        dashboard: 'Dashboard',
        goodMorning: 'Good Morning!',
        welcomeMessage: "Here's what's happening with your institute today.",
        totalStudents: 'Total Students',
        revenue: 'Revenue',
        activeCourses: 'Active Courses',
        pendingEnquiries: 'Pending Enquiries',
        fromLastMonth: 'from last month',
        needsAttention: 'needs attention',
        newAdded: 'new added',

        // Charts
        enrollmentOverview: 'Enrollment Overview',
        revenueAnalytics: 'Revenue Analytics',
        courseDistribution: 'Course Distribution',

        // Recent Activity
        recentEnquiries: 'Recent Enquiries',
        upcomingClasses: 'Upcoming Classes',
        viewAll: 'View All',

        // Navigation
        students: 'Students',
        courses: 'Courses',
        enquiries: 'Enquiries',
        settings: 'Settings',
        logout: 'Logout',

        // Status
        new: 'New',
        contacted: 'Contacted',
        converted: 'Converted',

        // Common
        search: 'Search...',
        notifications: 'Notifications',
        profile: 'Profile',
        
        // Settings Page
        profileSettings: 'Profile Settings',
        updatePersonalInfo: 'Update your personal information',
        instituteSettings: 'Institute Settings',
        manageInstituteInfo: 'Manage your institute information',
        notificationSettings: 'Notification Settings',
        manageNotifications: 'Manage how you receive notifications',
        securitySettings: 'Security Settings',
        managePassword: 'Manage your password and security',
        appearanceSettings: 'Appearance Settings',
        customizeLook: 'Customize the look and feel',
        appearance: 'Appearance',
        institute: 'Institute',
        security: 'Security',
        
        // Theme
        theme: 'Theme',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        defaultTheme: 'Default theme',
        easyOnEyes: 'Easy on the eyes',
        
        // Language
        language: 'Language',
        selectLanguage: 'Choose your preferred language for the interface',
        
        // Actions
        save: 'Save',
        saveChanges: 'Save Changes',
        savePreferences: 'Save Preferences',
        savedSuccessfully: 'Saved successfully',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        add: 'Add',
        
        // Form Fields
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        website: 'Website',
        description: 'Description',
        role: 'Role',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm New Password',
        updatePassword: 'Update Password',
        
        // Notifications
        emailNotifications: 'Email Notifications',
        pushNotifications: 'Push Notifications',
        smsNotifications: 'SMS Notifications',
        newEnquiries: 'New Enquiries',
        paymentAlerts: 'Payment Alerts',
        studentUpdates: 'Student Updates',
        reminders: 'Reminders',
        
        // Sessions
        loginSessions: 'Login Sessions',
        currentSession: 'Current Session',
        activeNow: 'Active now',
    },
    hi: {
        // Dashboard
        dashboard: 'डैशबोर्ड',
        goodMorning: 'सुप्रभात!',
        welcomeMessage: 'आज आपके संस्थान में क्या हो रहा है।',
        totalStudents: 'कुल छात्र',
        revenue: 'राजस्व',
        activeCourses: 'सक्रिय पाठ्यक्रम',
        pendingEnquiries: 'लंबित पूछताछ',
        fromLastMonth: 'पिछले महीने से',
        needsAttention: 'ध्यान देने की जरूरत',
        newAdded: 'नया जोड़ा गया',

        // Charts
        enrollmentOverview: 'नामांकन अवलोकन',
        revenueAnalytics: 'राजस्व विश्लेषण',
        courseDistribution: 'पाठ्यक्रम वितरण',

        // Recent Activity
        recentEnquiries: 'हाल की पूछताछ',
        upcomingClasses: 'आगामी कक्षाएं',
        viewAll: 'सभी देखें',

        // Navigation
        students: 'छात्र',
        courses: 'पाठ्यक्रम',
        enquiries: 'पूछताछ',
        settings: 'सेटिंग्स',
        logout: 'लॉग आउट',

        // Status
        new: 'नया',
        contacted: 'संपर्क किया',
        converted: 'परिवर्तित',

        // Common
        search: 'खोजें...',
        notifications: 'सूचनाएं',
        profile: 'प्रोफ़ाइल',
        
        // Settings Page
        profileSettings: 'प्रोफ़ाइल सेटिंग्स',
        updatePersonalInfo: 'अपनी व्यक्तिगत जानकारी अपडेट करें',
        instituteSettings: 'संस्थान सेटिंग्स',
        manageInstituteInfo: 'अपनी संस्थान की जानकारी प्रबंधित करें',
        notificationSettings: 'सूचना सेटिंग्स',
        manageNotifications: 'सूचनाएं कैसे प्राप्त करें प्रबंधित करें',
        securitySettings: 'सुरक्षा सेटिंग्स',
        managePassword: 'अपना पासवर्ड और सुरक्षा प्रबंधित करें',
        appearanceSettings: 'दिखावट सेटिंग्स',
        customizeLook: 'लुक और फील को कस्टमाइज़ करें',
        appearance: 'दिखावट',
        institute: 'संस्थान',
        security: 'सुरक्षा',
        
        // Theme
        theme: 'थीम',
        lightMode: 'लाइट मोड',
        darkMode: 'डार्क मोड',
        defaultTheme: 'डिफ़ॉल्ट थीम',
        easyOnEyes: 'आंखों के लिए आरामदायक',
        
        // Language
        language: 'भाषा',
        selectLanguage: 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें',
        
        // Actions
        save: 'सेव',
        saveChanges: 'परिवर्तन सहेजें',
        savePreferences: 'प्राथमिकताएं सहेजें',
        savedSuccessfully: 'सफलतापूर्वक सहेजा गया',
        cancel: 'रद्द करें',
        edit: 'संपादित करें',
        delete: 'हटाएं',
        add: 'जोड़ें',
        
        // Form Fields
        name: 'नाम',
        email: 'ईमेल',
        phone: 'फोन',
        address: 'पता',
        website: 'वेबसाइट',
        description: 'विवरण',
        role: 'भूमिका',
        currentPassword: 'वर्तमान पासवर्ड',
        newPassword: 'नया पासवर्ड',
        confirmPassword: 'नया पासवर्ड पुष्टि करें',
        updatePassword: 'पासवर्ड अपडेट करें',
        
        // Notifications
        emailNotifications: 'ईमेल सूचनाएं',
        pushNotifications: 'पुश सूचनाएं',
        smsNotifications: 'एसएमएस सूचनाएं',
        newEnquiries: 'नई पूछताछ',
        paymentAlerts: 'भुगतान अलर्ट',
        studentUpdates: 'छात्र अपडेट',
        reminders: 'रिमाइंडर',
        
        // Sessions
        loginSessions: 'लॉगिन सत्र',
        currentSession: 'वर्तमान सत्र',
        activeNow: 'अभी सक्रिय',
    },
    gu: {
        // Dashboard
        dashboard: 'ડેશબોર્ડ',
        goodMorning: 'સુપ્રભાત!',
        welcomeMessage: 'આજે તમારી સંસ્થામાં શું થઈ રહ્યું છે.',
        totalStudents: 'કુલ વિદ્યાર્થીઓ',
        revenue: 'આવક',
        activeCourses: 'સક્રિય અભ્યાસક્રમો',
        pendingEnquiries: 'બાકી પૂછપરછ',
        fromLastMonth: 'ગયા મહિનાથી',
        needsAttention: 'ધ્યાન આપવાની જરૂર',
        newAdded: 'નવું ઉમેર્યું',

        // Charts
        enrollmentOverview: 'નોંધણી ઝાંખી',
        revenueAnalytics: 'આવક વિશ્લેષણ',
        courseDistribution: 'અભ્યાસક્રમ વિતરણ',

        // Recent Activity
        recentEnquiries: 'તાજેતરની પૂછપરછ',
        upcomingClasses: 'આગામી વર્ગો',
        viewAll: 'બધા જુઓ',

        // Navigation
        students: 'વિદ્યાર્થીઓ',
        courses: 'અભ્યાસક્રમો',
        enquiries: 'પૂછપરછ',
        settings: 'સેટિંગ્સ',
        logout: 'લૉગ આઉટ',

        // Status
        new: 'નવું',
        contacted: 'સંપર્ક કર્યો',
        converted: 'રૂપાંતરિત',

        // Common
        search: 'શોધો...',
        notifications: 'સૂચનાઓ',
        profile: 'પ્રોફાઇલ',
        
        // Settings Page
        profileSettings: 'પ્રોફાઇલ સેટિંગ્સ',
        updatePersonalInfo: 'તમારી વ્યક્તિગત માહિતી અપડેટ કરો',
        instituteSettings: 'સંસ્થા સેટિંગ્સ',
        manageInstituteInfo: 'તમારી સંસ્થાની માહિતી મેનેજ કરો',
        notificationSettings: 'સૂચના સેટિંગ્સ',
        manageNotifications: 'તમે સૂચનાઓ કેવી રીતે પ્રાપ્ત કરો છો તે મેનેજ કરો',
        securitySettings: 'સુરક્ષા સેટિંગ્સ',
        managePassword: 'તમારો પાસવર્ડ અને સુરક્ષા મેનેજ કરો',
        appearanceSettings: 'દેખાવ સેટિંગ્સ',
        customizeLook: 'દેખાવ કસ્ટમાઇઝ કરો',
        appearance: 'દેખાવ',
        institute: 'સંસ્થા',
        security: 'સુરક્ષા',
        
        // Theme
        theme: 'થીમ',
        lightMode: 'લાઇટ મોડ',
        darkMode: 'ડાર્ક મોડ',
        defaultTheme: 'ડિફોલ્ટ થીમ',
        easyOnEyes: 'આંખો માટે આરામદાયક',
        
        // Language
        language: 'ભાષા',
        selectLanguage: 'ઇન્ટરફેસ માટે તમારી પસંદગીની ભાષા પસંદ કરો',
        
        // Actions
        save: 'સેવ',
        saveChanges: 'ફેરફારો સાચવો',
        savePreferences: 'પસંદગીઓ સાચવો',
        savedSuccessfully: 'સફળતાપૂર્વક સાચવ્યું',
        cancel: 'રદ કરો',
        edit: 'સંપાદિત કરો',
        delete: 'કાઢી નાખો',
        add: 'ઉમેરો',
        
        // Form Fields
        name: 'નામ',
        email: 'ઈમેલ',
        phone: 'ફોન',
        address: 'સરનામું',
        website: 'વેબસાઇટ',
        description: 'વર્ણન',
        role: 'ભૂમિકા',
        currentPassword: 'વર્તમાન પાસવર્ડ',
        newPassword: 'નવો પાસવર્ડ',
        confirmPassword: 'નવો પાસવર્ડ પુષ્ટિ કરો',
        updatePassword: 'પાસવર્ડ અપડેટ કરો',
        
        // Notifications
        emailNotifications: 'ઈમેલ સૂચનાઓ',
        pushNotifications: 'પુશ સૂચનાઓ',
        smsNotifications: 'એસએમએસ સૂચનાઓ',
        newEnquiries: 'નવી પૂછપરછ',
        paymentAlerts: 'ચુકવણી ચેતવણીઓ',
        studentUpdates: 'વિદ્યાર્થી અપડેટ્સ',
        reminders: 'રિમાઇન્ડર્સ',
        
        // Sessions
        loginSessions: 'લૉગિન સત્રો',
        currentSession: 'વર્તમાન સત્ર',
        activeNow: 'હમણાં સક્રિય',
    },
    mr: {
        // Dashboard
        dashboard: 'डॅशबोर्ड',
        goodMorning: 'सुप्रभात!',
        welcomeMessage: 'आज तुमच्या संस्थेत काय चालले आहे.',
        totalStudents: 'एकूण विद्यार्थी',
        revenue: 'महसूल',
        activeCourses: 'सक्रिय अभ्यासक्रम',
        pendingEnquiries: 'प्रलंबित चौकशी',
        fromLastMonth: 'मागील महिन्यापासून',
        needsAttention: 'लक्ष देणे आवश्यक',
        newAdded: 'नवीन जोडले',

        // Navigation
        students: 'विद्यार्थी',
        courses: 'अभ्यासक्रम',
        enquiries: 'चौकशी',
        settings: 'सेटिंग्ज',
        logout: 'लॉग आउट',

        // Common
        search: 'शोधा...',
        notifications: 'सूचना',
        profile: 'प्रोफाइल',
        
        // Settings
        profileSettings: 'प्रोफाइल सेटिंग्ज',
        appearanceSettings: 'दिसणे सेटिंग्ज',
        appearance: 'दिसणे',
        theme: 'थीम',
        lightMode: 'लाइट मोड',
        darkMode: 'डार्क मोड',
        language: 'भाषा',
        selectLanguage: 'इंटरफेससाठी तुमची पसंतीची भाषा निवडा',
        savePreferences: 'प्राधान्ये जतन करा',
        savedSuccessfully: 'यशस्वीरित्या जतन केले',
    },
    ta: {
        dashboard: 'டாஷ்போர்ட்',
        goodMorning: 'காலை வணக்கம்!',
        students: 'மாணவர்கள்',
        courses: 'பாடநெறிகள்',
        enquiries: 'விசாரணைகள்',
        settings: 'அமைப்புகள்',
        logout: 'வெளியேறு',
        search: 'தேடு...',
        notifications: 'அறிவிப்புகள்',
        profile: 'சுயவிவரம்',
        appearanceSettings: 'தோற்ற அமைப்புகள்',
        appearance: 'தோற்றம்',
        theme: 'தீம்',
        lightMode: 'லைட் மோட்',
        darkMode: 'டார்க் மோட்',
        language: 'மொழி',
        selectLanguage: 'இடைமுகத்திற்கான உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
        savePreferences: 'விருப்பங்களை சேமி',
        savedSuccessfully: 'வெற்றிகரமாக சேமிக்கப்பட்டது',
    },
    te: {
        dashboard: 'డాష్‌బోర్డ్',
        goodMorning: 'శుభోదయం!',
        students: 'విద్యార్థులు',
        courses: 'కోర్సులు',
        enquiries: 'విచారణలు',
        settings: 'సెట్టింగ్‌లు',
        logout: 'లాగ్ అవుట్',
        search: 'వెతుకు...',
        notifications: 'నోటిఫికేషన్లు',
        profile: 'ప్రొఫైల్',
        appearanceSettings: 'అపియరెన్స్ సెట్టింగ్‌లు',
        appearance: 'రూపం',
        theme: 'థీమ్',
        lightMode: 'లైట్ మోడ్',
        darkMode: 'డార్క్ మోడ్',
        language: 'భాష',
        selectLanguage: 'ఇంటర్‌ఫేస్ కోసం మీ ఇష్టమైన భాషను ఎంచుకోండి',
        savePreferences: 'ప్రాధాన్యతలు సేవ్ చేయండి',
        savedSuccessfully: 'విజయవంతంగా సేవ్ చేయబడింది',
    },
    kn: {
        dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        goodMorning: 'ಶುಭೋದಯ!',
        students: 'ವಿದ್ಯಾರ್ಥಿಗಳು',
        courses: 'ಕೋರ್ಸ್‌ಗಳು',
        enquiries: 'ವಿಚಾರಣೆಗಳು',
        settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
        logout: 'ಲಾಗ್ ಔಟ್',
        search: 'ಹುಡುಕಿ...',
        notifications: 'ಅಧಿಸೂಚನೆಗಳು',
        profile: 'ಪ್ರೊಫೈಲ್',
        appearance: 'ನೋಟ',
        theme: 'ಥೀಮ್',
        lightMode: 'ಲೈಟ್ ಮೋಡ್',
        darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
        language: 'ಭಾಷೆ',
        savePreferences: 'ಆದ್ಯತೆಗಳನ್ನು ಉಳಿಸಿ',
    },
    ml: {
        dashboard: 'ഡാഷ്‌ബോർഡ്',
        goodMorning: 'സുപ്രഭാതം!',
        students: 'വിദ്യാർത്ഥികൾ',
        courses: 'കോഴ്‌സുകൾ',
        enquiries: 'അന്വേഷണങ്ങൾ',
        settings: 'ക്രമീകരണങ്ങൾ',
        logout: 'ലോഗ് ഔട്ട്',
        search: 'തിരയുക...',
        notifications: 'അറിയിപ്പുകൾ',
        profile: 'പ്രൊഫൈൽ',
        appearance: 'രൂപം',
        theme: 'തീം',
        lightMode: 'ലൈറ്റ് മോഡ്',
        darkMode: 'ഡാർക്ക് മോഡ്',
        language: 'ഭാഷ',
        savePreferences: 'മുൻഗണനകൾ സേവ് ചെയ്യുക',
    },
    bn: {
        dashboard: 'ড্যাশবোর্ড',
        goodMorning: 'সুপ্রভাত!',
        students: 'শিক্ষার্থীরা',
        courses: 'কোর্সসমূহ',
        enquiries: 'জিজ্ঞাসা',
        settings: 'সেটিংস',
        logout: 'লগ আউট',
        search: 'খুঁজুন...',
        notifications: 'বিজ্ঞপ্তি',
        profile: 'প্রোফাইল',
        appearance: 'চেহারা',
        theme: 'থিম',
        lightMode: 'লাইট মোড',
        darkMode: 'ডার্ক মোড',
        language: 'ভাষা',
        savePreferences: 'পছন্দগুলি সংরক্ষণ করুন',
    },
    pa: {
        dashboard: 'ਡੈਸ਼ਬੋਰਡ',
        goodMorning: 'ਸ਼ੁਭ ਸਵੇਰ!',
        students: 'ਵਿਦਿਆਰਥੀ',
        courses: 'ਕੋਰਸ',
        enquiries: 'ਪੁੱਛਗਿੱਛ',
        settings: 'ਸੈਟਿੰਗਾਂ',
        logout: 'ਲੌਗ ਆਊਟ',
        search: 'ਖੋਜੋ...',
        notifications: 'ਸੂਚਨਾਵਾਂ',
        profile: 'ਪ੍ਰੋਫਾਈਲ',
        appearance: 'ਦਿੱਖ',
        theme: 'ਥੀਮ',
        lightMode: 'ਲਾਈਟ ਮੋਡ',
        darkMode: 'ਡਾਰਕ ਮੋਡ',
        language: 'ਭਾਸ਼ਾ',
        savePreferences: 'ਤਰਜੀਹਾਂ ਸੰਭਾਲੋ',
    },
    or: {
        dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
        goodMorning: 'ଶୁଭ ସକାଳ!',
        students: 'ଛାତ୍ର',
        courses: 'ପାଠ୍ୟକ୍ରମ',
        enquiries: 'ଅନୁସନ୍ଧାନ',
        settings: 'ସେଟିଂସ',
        logout: 'ଲଗ ଆଉଟ',
        search: 'ଖୋଜ...',
        notifications: 'ବିଜ୍ଞପ୍ତି',
        profile: 'ପ୍ରୋଫାଇଲ',
        appearance: 'ରୂପ',
        theme: 'ଥିମ',
        lightMode: 'ଲାଇଟ ମୋଡ',
        darkMode: 'ଡାର୍କ ମୋଡ',
        language: 'ଭାଷା',
        savePreferences: 'ପସନ୍ଦଗୁଡ଼ିକ ସଞ୍ଚୟ କରନ୍ତୁ',
    },
};

// Language display names
const languageNames = {
    en: 'English',
    hi: 'हिंदी (Hindi)',
    gu: 'ગુજરાતી (Gujarati)',
    mr: 'मराठी (Marathi)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ml: 'മലയാളം (Malayalam)',
    bn: 'বাংলা (Bengali)',
    pa: 'ਪੰਜਾਬੀ (Punjabi)',
    or: 'ଓଡ଼ିଆ (Odia)',
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const stored = localStorage.getItem('eduprime_language');
        return stored || 'en';
    });

    useEffect(() => {
        localStorage.setItem('eduprime_language', language);
    }, [language]);

    const t = (key) => {
        return translations[language]?.[key] || translations['en'][key] || key;
    };

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, t, changeLanguage, availableLanguages: Object.keys(translations), languageNames }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
