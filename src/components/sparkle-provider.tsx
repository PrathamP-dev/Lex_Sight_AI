'use client';

import React, { createContext, useContext, useEffect } from 'react';

const SparkleContext = createContext<((e: MouseEvent) => void) | null>(null);

export const useSparkle = () => {
    return useContext(SparkleContext);
};

const PARTICLE_COUNT = 12;
const PARTICLE_SIZE = 5; // Base size in pixels
const PARTICLE_SPEED = 60; // Base speed in pixels

const THEME_COLORS = [
    'hsl(180, 100%, 25%)', // deep teal (primary)
    'hsl(175, 68%, 95%)', // light teal (background)
];

export const SparkleProvider = ({ children }: { children: React.ReactNode }) => {

    const createBurst = (e: MouseEvent) => {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * PARTICLE_SPEED;
            const size = Math.random() * PARTICLE_SIZE + 2;

            const xEnd = Math.cos(angle) * speed;
            const yEnd = Math.sin(angle) * speed;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Use theme colors
            const color = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
            particle.style.background = color;
            
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            
            const animation = particle.animate(
              [
                {
                  transform: 'translate(-50%, -50%) scale(1)',
                  opacity: 1,
                },
                {
                  transform: `translate(calc(-50% + ${xEnd}px), calc(-50% + ${yEnd}px)) scale(0)`,
                  opacity: 0.2,
                },
              ],
              {
                duration: 600 + Math.random() * 300,
                easing: 'cubic-bezier(0.17, 0.84, 0.44, 1)',
              }
            );

            animation.onfinish = () => {
                particle.remove();
            };
        }
    };

    useEffect(() => {
        window.addEventListener('click', createBurst);
        return () => window.removeEventListener('click', createBurst);
    }, []);

    return (
        <SparkleContext.Provider value={createBurst}>
            {children}
        </SparkleContext.Provider>
    );
};
