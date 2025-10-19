'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { DarkVeil } from '@/components/dark-veil';
import { ShieldCheck, FileText, CheckCircle, Scale, Users, Bot, IndianRupee, Languages, Wand, CalendarClock, ArrowRight, BrainCircuit, Search, FileUp, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LexSightLogo } from '@/components/icons';


export default function LandingPage() {
  const whyLexSightPoints = [
    { text: "Contracts filled with confusing jargon", icon: <FileText className="size-6 text-accent" /> },
    { text: "Lawyers/consultants are expensive", icon: <IndianRupee className="size-6 text-accent" /> },
    { text: "Managing compliance deadlines is time-consuming", icon: <CalendarClock className="size-6 text-accent" /> },
    { text: "Most people don’t fully understand their rights", icon: <Scale className="size-6 text-accent" /> },
  ];

  const features = [
    {
      title: 'Text Extraction',
      description: 'Upload PDFs, Word files, or scanned docs. Extract clean text using advanced OCR.',
      icon: <FileUp className="size-8 text-primary" />
    },
    {
      title: 'Clause Segmentation',
      description: 'Break contracts into clear, digestible clauses. Powered by regex + AI for better accuracy.',
      icon: <BrainCircuit className="size-8 text-primary" />
    },
    {
      title: 'Contract Summarizer',
      description: 'Summarizes each clause in plain English, Hindi, and more. Highlights key sections.',
      icon: <Languages className="size-8 text-primary" />
    },
    {
      title: 'Risk Analyzer',
      description: 'Flags risky or unfair clauses, detects missing protections, and provides a risk score with reasoning.',
      icon: <Search className="size-8 text-primary" />
    },
  ];

  const competitiveEdge = [
    { title: 'Modular Design', description: 'Switch between free LLMs (Hugging Face, Groq) or premium ones (Gemini, OpenAI).', icon: <Bot className="size-6 text-primary" /> },
    { title: 'Multilingual Support', description: 'Regional languages included for wider accessibility.', icon: <Languages className="size-6 text-primary" /> },
    { title: 'Clause-wise Clarity', description: 'Easy to navigate and understand, even with no legal background.', icon: <CheckCircle className="size-6 text-primary" /> },
    { title: 'Affordable & Simple', description: 'No legal background required to get started.', icon: <IndianRupee className="size-6 text-primary" /> },
    { title: 'Trust & Security', description: 'Your documents, your control. We prioritize your privacy.', icon: <ShieldCheck className="size-6 text-primary" /> },
  ];

  const trustElements = [
      { text: "Secure document handling", icon: <ShieldCheck className="size-7 text-accent" /> },
      { text: "Backed by modern LLM technology", icon: <Bot className="size-7 text-accent" /> },
      { text: "Made in India, built for everyone", icon: <div className="font-bold text-accent text-2xl">🇮🇳</div> },
      { text: "Trusted by freelancers, startups & MSMEs", icon: <Users className="size-7 text-accent" /> },
  ];

  const roadmapItems = [
    { title: "Smart Legal Docs Generator", description: "NDA, freelance, rent agreements" },
    { title: "Compliance & Tax Tracker", description: "Get timely reminders" },
    { title: "Legal & Finance Chat AI", description: "Plain-language Q&A" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <DarkVeil
          speed={3.0}
          hueShift={50}
          noiseIntensity={0}
          scanlineFrequency={0}
          scanlineIntensity={0}
          warpAmount={0}
        />
      </div>
      <div className="relative min-h-screen w-full overflow-hidden">
        <motion.header
          className="absolute top-0 left-0 right-0 z-10 p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 120,
            delay: 0.1
          }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <LexSightLogo className="size-8 text-primary transition-all duration-300 hover:scale-110" />
                <h1 className="font-headline text-2xl font-bold">LexSight</h1>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
              <Link href="/login">
                <Button variant="outline" className="font-headline transition-all duration-200 hover:shadow-md hover:shadow-primary/20">
                  Login / Sign Up
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.header>

        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-10 text-center md:pt-28">
           <div className="z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 0.6,
                delay: 0.1
              }}
            >
              <div className="flex justify-center items-center gap-3">
                <LexSightLogo className="size-10 text-primary" />
                <h2 className="font-headline text-4xl font-bold tracking-tighter md:text-6xl">
                  LexSight
                </h2>
              </div>
              <p className="mt-2 font-headline text-2xl md:text-3xl text-primary/90">Your AI-Powered Legal Co-Pilot</p>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                Simplify contracts, agreements, and compliance with AI. Understand your rights, flag risks, and manage legal documents in native language — fast, affordable, and accessible.
              </p>
              <motion.div
                className="mt-8 inline-block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
              >
                <Link href="/login">
                  <Button size="lg" className="font-headline text-lg group transform transition-all duration-200 hover:shadow-lg hover:shadow-primary/25">
                    Get Started Free
                    <ArrowRight className="ml-2 size-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </main>

        {/* Why LexSight Section */}
        <section className="py-16 md:py-24 bg-background/50">
            <div className="container mx-auto px-4 text-center">
                <h3 className="font-headline text-3xl md:text-4xl font-bold">The Legal World is Complex.</h3>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {whyLexSightPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{
                              y: -4,
                              scale: 1.05,
                              transition: { type: "spring", damping: 12, stiffness: 200 }
                            }}
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 200,
                              delay: index * 0.05
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-3 cursor-pointer"
                        >
                            {point.icon}
                            <p className="text-muted-foreground">{point.text}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 max-w-3xl mx-auto">
                    <h4 className="font-headline text-2xl md:text-3xl font-bold text-primary">Our Vision</h4>
                    <p className="mt-4 text-muted-foreground text-base md:text-lg">
                        LexSight bridges this gap by acting as your AI legal assistant, making legal and financial clarity accessible to everyone — from freelancers to startups, MSMEs, students, and everyday citizens.
                    </p>
                </div>
            </div>
        </section>

        {/* Core Features Section */}
        <section className="py-16 md:py-24">
             <div className="container mx-auto px-4 text-center">
                <h3 className="font-headline text-3xl md:text-4xl font-bold">Core Features</h3>
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{
                              y: -8,
                              scale: 1.02,
                              rotateX: 5,
                              transition: { type: "spring", damping: 15, stiffness: 200 }
                            }}
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 120,
                              delay: index * 0.15
                            }}
                            viewport={{ once: true }}
                            className="h-full rounded-lg star-border-card transform-gpu"
                            style={{
                              transformStyle: "preserve-3d",
                              perspective: 1000,
                            }}
                        >
                            <div className="h-full p-6 text-left star-border-content glare-card">
                              <CardHeader className="p-0">
                                  {feature.icon}
                                  <CardTitle className="font-headline text-xl font-bold mt-4">{feature.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-0 mt-2">
                                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                              </CardContent>
                            </div>
                        </motion.div>
                    ))}
                 </div>
             </div>
        </section>

        {/* Competitive Edge Section */}
        <section className="py-16 md:py-24 bg-background/50">
            <div className="container mx-auto px-4">
                <h3 className="text-center font-headline text-3xl md:text-4xl font-bold">Competitive Edge</h3>
                <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {competitiveEdge.map((edge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            whileHover={{
                              x: 4,
                              scale: 1.02,
                              transition: { type: "spring", damping: 15, stiffness: 300 }
                            }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 120,
                              delay: index * 0.1
                            }}
                            viewport={{ once: true }}
                            className="flex items-start gap-4 cursor-pointer rounded-lg p-3 -m-3 hover:bg-background/30 transition-colors duration-200"
                        >
                            <div className="mt-1">{edge.icon}</div>
                            <div>
                                <h4 className="font-headline font-bold">{edge.title}</h4>
                                <p className="text-sm text-muted-foreground">{edge.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Trust Elements Section */}
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {trustElements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{
                              y: -2,
                              scale: 1.03,
                              transition: { type: "spring", damping: 15, stiffness: 300 }
                            }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 120,
                              delay: index * 0.1
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-3 text-center cursor-pointer"
                        >
                            {item.icon}
                            <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Roadmap Teaser Section */}
        <section className="py-16 md:py-24 bg-background/50">
            <div className="container mx-auto px-4 text-center">
                <motion.h3
                  className="font-headline text-3xl md:text-4xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 120 }}
                  viewport={{ once: true }}
                >
                  Coming Soon
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <Wand className="mx-auto my-4 h-10 w-10 text-primary" />
                </motion.div>
                <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                    {roadmapItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <motion.div
                              className="text-center"
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              whileHover={{
                                y: -4,
                                scale: 1.02,
                                transition: { type: "spring", damping: 15, stiffness: 200 }
                              }}
                              transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 120,
                                delay: index * 0.1
                              }}
                              viewport={{ once: true }}
                            >
                                <h4 className="font-headline text-lg font-bold">{item.title}</h4>
                                <p className="text-muted-foreground">{item.description}</p>
                            </motion.div>
                            {index < roadmapItems.length - 1 && (
                                <motion.div
                                  className="hidden md:block h-6 w-px bg-border"
                                  initial={{ scaleY: 0 }}
                                  whileInView={{ scaleY: 1 }}
                                  transition={{ delay: 0.5, duration: 0.3 }}
                                  viewport={{ once: true }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 text-center">
            <div className="container mx-auto px-4">
                 <motion.h3
                   className="font-headline text-3xl md:text-4xl font-bold"
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ type: "spring", damping: 20, stiffness: 120 }}
                   viewport={{ once: true }}
                 >
                   Ready to simplify your legal journey?
                 </motion.h3>
                 <motion.div
                   className="mt-8 inline-block"
                   initial={{ opacity: 0, y: 20, scale: 0.9 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   transition={{
                     type: "spring",
                     damping: 15,
                     stiffness: 200,
                     delay: 0.2
                   }}
                   viewport={{ once: true }}
                 >
                   <Link href="/login">
                      <Button size="lg" className="font-headline text-lg group transform transition-all duration-200 hover:shadow-xl hover:shadow-primary/30">
                          Sign Up Free
                          <ArrowRight className="ml-2 size-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                      </Button>
                  </Link>
                 </motion.div>
            </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-border/20">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
                <p>Made with ❤️ By Pratham P. Sharma</p>
            </div>
        </footer>

      </div>
    </>
  );
}