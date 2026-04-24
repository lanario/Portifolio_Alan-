'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { developerData, siteConfig } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils/scroll';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    // Animações baseadas no scroll - header totalmente transparente no topo
    const backgroundColor = useTransform(
        scrollY,
        [0, 150, 300],
        ['rgba(0, 0, 0, 0)', 'rgba(17, 24, 39, 0.7)', 'rgba(17, 24, 39, 0.95)']
    );

    const borderColor = useTransform(
        scrollY,
        [0, 150, 300],
        ['rgba(31, 41, 55, 0)', 'rgba(31, 41, 55, 0.3)', 'rgba(31, 41, 55, 1)']
    );

    const blurValue = useTransform(scrollY, [0, 150, 300], [0, 5, 10]);

    const backdropFilter = useTransform(blurValue, (blur) =>
        blur > 0 ? `blur(${blur}px)` : 'none'
    );

    const borderBottomStyle = useTransform(borderColor, (color) =>
        color === 'rgba(31, 41, 55, 0)' ? 'none' : `1px solid ${color}`
    );

    return (
        <>
            <motion.header
                style={{
                    backgroundColor,
                    borderBottom: borderBottomStyle,
                    backdropFilter,
                    WebkitBackdropFilter: backdropFilter,
                }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-4">
                        <button
                            type="button"
                            onClick={() => scrollToSection('hero')}
                            className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                            aria-label="Ir para o início"
                        >
                            <Image
                                src={siteConfig.logoPath}
                                alt={`${developerData.name} — logo`}
                                width={160}
                                height={40}
                                className="h-8 w-auto max-h-9 max-w-[140px] sm:max-w-[160px] object-contain object-left"
                                priority
                            />
                        </button>

                        {/* Navegação Desktop */}
                        <div className="hidden md:flex md:flex-1 md:justify-end">
                            <Navigation />
                        </div>

                        {/* Botão Menu Mobile */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                            aria-label="Abrir menu"
                        >
                            <FiMenu className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Menu Mobile */}
            <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
        </>
    );
}

export { Header };