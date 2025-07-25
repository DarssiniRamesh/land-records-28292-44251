import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Dictionary for English and Hindi
const resources = {
  en: {
    translation: {
      "Login": "Login",
      "Register": "Register",
      "Dashboard": "Dashboard",
      "Apply": "Apply for change",
      "Map": "Land Map",
      "Upload": "Upload Document",
      "Payments": "Payments",
      "Logout": "Logout",
      "Email": "Email",
      "Password": "Password",
      "Name": "Name",
      "Role": "Role",
      "Submit": "Submit",
      "Officer": "Officer",
      "Citizen": "Citizen",
      "Admin": "Admin",
      "Mutation Request": "Mutation Request",
      "Record Correction": "Record Correction",
      "Land Type Conversion": "Land Type Conversion",
      "Applications": "Applications",
      "Change Language": "Change Language",
      "Welcome": "Welcome",
      "Not Found": "Page Not Found",
      "Notifications": "Notifications",
      "English": "English",
      "Hindi": "Hindi",
      "Search Land Records": "Search Land Records",
      "Your Applications": "Your Applications",
      "Status": "Status",
      "Upload Documents": "Upload Documents",
      "Document Type": "Document Type",
      "Select file": "Select file",
      "Make Payment": "Make Payment",
      "Amount": "Amount",
      "Pay": "Pay",
      "Pending": "Pending",
      "Approved": "Approved",
      "Rejected": "Rejected",
      "Success": "Success",
    },
  },
  hi: {
    translation: {
      "Login": "लॉगिन",
      "Register": "पंजीकरण",
      "Dashboard": "डैशबोर्ड",
      "Apply": "परिवर्तन के लिए आवेदन करें",
      "Map": "भूमि मानचित्र",
      "Upload": "दस्तावेज़ अपलोड करें",
      "Payments": "भुगतान",
      "Logout": "लॉगआउट",
      "Email": "ईमेल",
      "Password": "पासवर्ड",
      "Name": "नाम",
      "Role": "भूमिका",
      "Submit": "सबमिट करें",
      "Officer": "अधिकारी",
      "Citizen": "नागरिक",
      "Admin": "प्रशासक",
      "Mutation Request": "म्युटेशन अनुरोध",
      "Record Correction": "रिकॉर्ड में सुधार",
      "Land Type Conversion": "भूमि प्रकार परिवर्तन",
      "Applications": "आवेदन",
      "Change Language": "भाषा बदलें",
      "Welcome": "स्वागत है",
      "Not Found": "पृष्ठ नहीं मिला",
      "Notifications": "सूचनाएं",
      "English": "अंग्रेज़ी",
      "Hindi": "हिन्दी",
      "Search Land Records": "भूमि रिकॉर्ड खोजें",
      "Your Applications": "आपके आवेदन",
      "Status": "स्थिति",
      "Upload Documents": "दस्तावेज़ अपलोड करें",
      "Document Type": "दस्तावेज़ प्रकार",
      "Select file": "फ़ाइल चुनें",
      "Make Payment": "भुगतान करें",
      "Amount": "राशि",
      "Pay": "भुगतान करें",
      "Pending": "विचाराधीन",
      "Approved": "स्वीकृत",
      "Rejected": "अस्वीकृत",
      "Success": "सफलता",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
