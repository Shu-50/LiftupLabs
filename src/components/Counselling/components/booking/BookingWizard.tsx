import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Check, Clock, Calendar, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingWizardProps {
  counsellorName: string;
  price30: number;
  price60: number;
  onComplete?: () => void;
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM"
];

export function BookingWizard({ counsellorName, price30, price60, onComplete }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState<30 | 60>(30);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");

  const price = duration === 30 ? price30 : price60;

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Generate next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
    };
  });

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
      {/* Progress Steps */}
      <div className="px-6 py-4 bg-secondary/50 border-b border-border">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Duration", icon: Clock },
            { num: 2, label: "Schedule", icon: Calendar },
            { num: 3, label: "Confirm", icon: CreditCard },
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
              {num < 3 && <div className="hidden sm:block w-12 h-0.5 bg-border mx-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Choose Session Duration</h3>
                <p className="text-sm text-muted-foreground">Select how long you'd like to meet with {counsellorName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 30 as const, label: "30 Minutes", desc: "Quick consultation", price: price30 },
                  { value: 60 as const, label: "60 Minutes", desc: "In-depth session", price: price60 },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDuration(option.value)}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${duration === option.value
                      ? "border-black bg-primary/5"
                      : "border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    <div className="font-semibold text-foreground">{option.label}</div>
                    <div className="text-sm text-muted-foreground mb-3">{option.desc}</div>
                    <div className="text-2xl font-bold text-orange-600">${option.price}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Pick a Date & Time</h3>
                <p className="text-sm text-muted-foreground">Select when you'd like to have your session</p>
              </div>

              {/* Date Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Date</Label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableDates.slice(0, 7).map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`flex-shrink-0 w-16 py-3 rounded-xl border-2 text-center transition-all ${selectedDate === date.value
                        ? "border-black bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                        }`}
                    >
                      <div className="text-xs text-muted-foreground">{date.dayName}</div>
                      <div className="text-lg font-bold text-foreground">{date.dayNum}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Label className="text-sm font-medium mb-3 block">Select Time</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${selectedTime === time
                          ? "border-black bg-primary/5 text-foreground"
                          : "border-gray-300 hover:border-gray-400 text-foreground"
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Confirm Your Booking</h3>
                <p className="text-sm text-muted-foreground">Review your session details and complete booking</p>
              </div>

              {/* Summary */}
              <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Counsellor</span>
                  <span className="font-medium text-foreground">{counsellorName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">{duration} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {selectedDate && new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{selectedTime}</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-orange-600">${price}</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-sm font-medium mb-2 block">
                  What would you like to discuss? (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Share any context or topics you'd like to cover..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-secondary/30 border-t border-border flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <Button
            onClick={nextStep}
            disabled={step === 2 && (!selectedDate || !selectedTime)}
            className="border-2 border-black"
          >
            Continue
          </Button>
        ) : (
          <Button onClick={onComplete} className="border-2 border-black">
            Confirm & Pay ${price}
          </Button>
        )}
      </div>
    </div>
  );
}
