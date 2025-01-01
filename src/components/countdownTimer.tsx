'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';

interface TimeBlockProps {
 value: number;
 label: string;
}

interface TimeLeft {
 days: number;
 hours: number;
 minutes: number;
 seconds: number;
}

const CountdownTimer = () => {
 const [timeLeft, setTimeLeft] = useState<TimeLeft>({
   days: 0,
   hours: 0,
   minutes: 0,
   seconds: 0
 });
 const [showCelebration, setShowCelebration] = useState(false);

 useEffect(() => {
   const calculateTimeLeft = () => {
     const now = new Date();
     const nextYear = new Date(now.getFullYear() + 1, 0, 1);
     const difference = nextYear.getTime() - now.getTime();

     if (difference > 0) {
       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
       const seconds = Math.floor((difference % (1000 * 60)) / 1000);
       setTimeLeft({ days, hours, minutes, seconds });
     } else {
       setShowCelebration(true);
     }
   };

   calculateTimeLeft();
   const timer = setInterval(calculateTimeLeft, 1000);
   return () => clearInterval(timer);
 }, []);

 useEffect(() => {
   if (showCelebration) {
     const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
     const confettiConfig = {
       particleCount: 100,
       spread: 70,
       origin: { y: 0.6 },
       colors: colors,
     };

     const animateConfetti = () => {
       const confettiInterval = setInterval(() => {
         confetti({
           ...confettiConfig,
           origin: { x: Math.random(), y: Math.random() - 0.2 }
         });
       }, 300);

       setTimeout(() => clearInterval(confettiInterval), 3000);
     };

     animateConfetti();
   }
 }, [showCelebration]);

 const TimeBlock = ({ value, label }: TimeBlockProps) => (
   <div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
     <span className="text-4xl font-bold text-white">{value}</span>
     <span className="text-sm text-slate-300">{label}</span>
   </div>
 );

 if (showCelebration) {
   return (
     <Card className="w-96 bg-slate-900">
       <CardContent className="p-6">
         <div className="text-center">
           <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">
             Happy New Year
           </h1>
           <p className="text-2xl text-gold animate-pulse">
             from DAVID
           </p>
         </div>
       </CardContent>
     </Card>
   );
 }

 return (
   <Card className="w-96 bg-slate-900">
     <CardContent className="p-6">
       <h2 className="text-2xl font-bold text-center text-white mb-6">
         New Year Countdown
       </h2>
       <div className="grid grid-cols-4 gap-4">
         <TimeBlock value={timeLeft.days} label="Days" />
         <TimeBlock value={timeLeft.hours} label="Hours" />
         <TimeBlock value={timeLeft.minutes} label="Minutes" />
         <TimeBlock value={timeLeft.seconds} label="Seconds" />
       </div>
     </CardContent>
   </Card>
 );
};

export default CountdownTimer;