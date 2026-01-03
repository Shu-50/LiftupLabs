import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
    ChevronLeft,
    ChevronRight,
    Check,
    User,
    Briefcase,
    DollarSign,
    Image as ImageIcon,
    X,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface BecomeCounsellorProps {
    onNavigate?: (page: string) => void;
}

export default function BecomeCounsellor({ onNavigate }: BecomeCounsellorProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        bio: "",
        expertise: [] as string[],
        languages: [] as string[],
        experience: "",
        price_30: "",
        price_60: "",
        image: "",
        cover_image: "",
        next_available: "Available"
    });

    const [expertiseInput, setExpertiseInput] = useState("");
    const [languageInput, setLanguageInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const [registrationStatus, setRegistrationStatus] = useState<{
        isRegistered: boolean;
        counsellorData?: any;
    }>({ isRegistered: false });

    // Check if user is already registered as counsellor on component mount
    useEffect(() => {
        const checkCounsellorStatus = async () => {
            try {
                const userStr = localStorage.getItem('liftuplabs_user');
                if (!userStr) {
                    setIsCheckingStatus(false);
                    return;
                }

                const user = JSON.parse(userStr);

                // Check if user role is counsellor
                if (user.role !== 'counsellor') {
                    toast.error("Your profile is not registered as a Counsellor. Please create a new account with Counsellor user type to access this form.");
                    setTimeout(() => {
                        onNavigate?.('index');
                    }, 3000);
                    return;
                }

                // Check if already registered in database
                const response = await fetch(`${API_URL}/counsellors/user/${user.id}`);
                const data = await response.json();

                if (data.isCounsellor) {
                    setRegistrationStatus({
                        isRegistered: true,
                        counsellorData: data.counsellor
                    });
                    toast.info("You are already registered as a counsellor!");
                }
            } catch (error) {
                console.error('Error checking counsellor status:', error);
            } finally {
                setIsCheckingStatus(false);
            }
        };

        checkCounsellorStatus();
    }, [onNavigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addExpertise = () => {
        if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
            setFormData({ ...formData, expertise: [...formData.expertise, expertiseInput.trim()] });
            setExpertiseInput("");
        }
    };

    const removeExpertise = (item: string) => {
        setFormData({ ...formData, expertise: formData.expertise.filter(e => e !== item) });
    };

    const addLanguage = () => {
        if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
            setFormData({ ...formData, languages: [...formData.languages, languageInput.trim()] });
            setLanguageInput("");
        }
    };

    const removeLanguage = (item: string) => {
        setFormData({ ...formData, languages: formData.languages.filter(l => l !== item) });
    };

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        // Prevent submission if already registered
        if (registrationStatus.isRegistered) {
            toast.error("You are already registered as a counsellor!");
            setTimeout(() => {
                onNavigate?.('counsellor-dashboard');
            }, 2000);
            return;
        }

        setIsSubmitting(true);

        try {
            // Get user from localStorage
            const userStr = localStorage.getItem('liftuplabs_user');
            if (!userStr) {
                toast.error("Please login first to become a counsellor");
                setIsSubmitting(false);
                return;
            }

            const user = JSON.parse(userStr);

            const response = await fetch(`${API_URL}/counsellors/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    ...formData,
                    price_30: parseFloat(formData.price_30) || 0,
                    price_60: parseFloat(formData.price_60) || 0,
                }),
            });

            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                toast.success("Successfully registered as a counsellor! Awaiting admin verification.");
                setTimeout(() => {
                    onNavigate?.('counsellor-dashboard');
                }, 2000);
            } else {
                toast.error(data.message || "Failed to register as counsellor");
            }
        } catch (error) {
            console.error('Error registering counsellor:', error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Back Button */}
                <button
                    onClick={() => onNavigate?.('index')}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-600 mb-6 cursor-pointer transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Counselling
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Become a Counsellor
                    </h1>
                    <p className="text-muted-foreground">
                        Join our network of expert counsellors and help students achieve their goals
                    </p>
                    <p className="text-sm text-orange-600 mt-2 font-medium">
                        ℹ️ Note: Only users with Counsellor profile type can complete this registration
                    </p>
                </div>

                {/* Loading State */}
                {isCheckingStatus && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <p className="text-blue-700 font-medium">Checking your registration status...</p>
                    </div>
                )}

                {/* Already Registered Alert */}
                {!isCheckingStatus && registrationStatus.isRegistered && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6">
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-green-900 mb-2">
                                    ✅ You're Already Registered!
                                </h3>
                                <p className="text-green-700 mb-4">
                                    You are already registered as a counsellor in our system.
                                    {registrationStatus.counsellorData?.is_verified
                                        ? " Your profile is verified and active."
                                        : " Your profile is pending admin verification."}
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => onNavigate?.('counsellor-dashboard')}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Go to Dashboard
                                    </Button>
                                    <Button
                                        onClick={() => onNavigate?.('index')}
                                        variant="outline"
                                        className="border-green-600 text-green-700 hover:bg-green-50"
                                    >
                                        Back to Counselling
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Not Registered - Show Form */}
                {!isCheckingStatus && !registrationStatus.isRegistered && (
                    <>
                        {/* Progress Steps */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                {[
                                    { num: 1, label: "Basic Info", icon: User },
                                    { num: 2, label: "Expertise", icon: Briefcase },
                                    { num: 3, label: "Pricing", icon: DollarSign },
                                    { num: 4, label: "Images", icon: ImageIcon },
                                ].map(({ num, label, icon: Icon }) => (
                                    <div key={num} className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= num
                                                ? "bg-orange-600 text-white"
                                                : "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {step > num ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                        </div>
                                        <span className={`hidden sm:block text-sm font-medium ${step >= num ? "text-foreground" : "text-muted-foreground"}`}>
                                            {label}
                                        </span>
                                        {num < 4 && <div className="hidden sm:block w-12 h-0.5 bg-border mx-2" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                            {/* Step 1: Basic Info */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Basic Information</h3>
                                        <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label>Full Name *</Label>
                                            <Input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Dr. Sarah Mitchell"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label>Professional Title *</Label>
                                            <Input
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="Career Coach & Mentor"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label>Bio *</Label>
                                            <Textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                placeholder="Tell students about your background, experience, and how you can help them..."
                                                rows={5}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label>Years of Experience</Label>
                                            <Input
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                                placeholder="10+ years"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Expertise & Languages */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Expertise & Languages</h3>
                                        <p className="text-sm text-muted-foreground">What areas do you specialize in?</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label>Areas of Expertise *</Label>
                                            <div className="flex gap-2 mb-2">
                                                <Input
                                                    value={expertiseInput}
                                                    onChange={(e) => setExpertiseInput(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                                                    placeholder="e.g., Career Counseling"
                                                />
                                                <Button type="button" onClick={addExpertise}>Add</Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.expertise.map((item) => (
                                                    <Badge key={item} className="bg-orange-100 text-orange-700">
                                                        {item}
                                                        <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeExpertise(item)} />
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Languages *</Label>
                                            <div className="flex gap-2 mb-2">
                                                <Input
                                                    value={languageInput}
                                                    onChange={(e) => setLanguageInput(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                                                    placeholder="e.g., English"
                                                />
                                                <Button type="button" onClick={addLanguage}>Add</Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.languages.map((item) => (
                                                    <Badge key={item} className="bg-orange-100 text-orange-700">
                                                        {item}
                                                        <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeLanguage(item)} />
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Pricing */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Session Pricing</h3>
                                        <p className="text-sm text-muted-foreground">Set your consultation rates</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label>30 Minute Session Price ($) *</Label>
                                            <Input
                                                name="price_30"
                                                type="number"
                                                value={formData.price_30}
                                                onChange={handleInputChange}
                                                placeholder="50"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label>60 Minute Session Price ($) *</Label>
                                            <Input
                                                name="price_60"
                                                type="number"
                                                value={formData.price_60}
                                                onChange={handleInputChange}
                                                placeholder="90"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label>Availability Status</Label>
                                            <Input
                                                name="next_available"
                                                value={formData.next_available}
                                                onChange={handleInputChange}
                                                placeholder="Available"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Images */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Profile Images</h3>
                                        <p className="text-sm text-muted-foreground">Add your profile and cover images (URLs)</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label>Profile Image URL</Label>
                                            <Input
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/profile.jpg"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">Recommended: 400x400px</p>
                                        </div>

                                        <div>
                                            <Label>Cover Image URL</Label>
                                            <Input
                                                name="cover_image"
                                                value={formData.cover_image}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/cover.jpg"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">Recommended: 1200x400px</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                {step > 1 ? (
                                    <Button variant="outline" onClick={prevStep}>
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {step < 4 ? (
                                    <Button onClick={nextStep} className="border-2 border-black">
                                        Continue
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="border-2 border-black"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Application"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
