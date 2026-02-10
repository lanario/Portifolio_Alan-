'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiGithub,
    FiLinkedin,
    FiInstagram,
} from 'react-icons/fi';
import { developerData, socialLinks } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { Section } from './Section';

function Contact() {
    return (
        <Section id="contato" variant="default" className="py-20 md:py-24">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Entre em Contato
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Vamos conversar sobre seu próximo projeto ou oportunidade
                    </p>
                </div>

                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full max-w-5xl h-[500px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Imagem de Background */}
                        <Image
                            src="/images/background_image.png"
                            alt="Background"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 90vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-primary-700/20 to-primary-800/30" />

                        {/* Card de Visita Horizontal */}
                        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 md:p-10 w-full max-w-4xl border border-gray-700/50 shadow-2xl"
                            >
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    {/* Lado Esquerdo - Nome e Título */}
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                            {developerData.name}
                                        </h3>
                                        <p className="text-xl text-primary-400 font-medium mb-6">
                                            {developerData.title}
                                        </p>

                                        {/* Redes Sociais */}
                                        <div className="flex justify-center md:justify-start gap-4">
                                            <a
                                                href={socialLinks.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                                                aria-label="GitHub"
                                            >
                                                <FiGithub className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                                            </a>
                                            <a
                                                href={socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors group"
                                                aria-label="LinkedIn"
                                            >
                                                <FiLinkedin className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                                            </a>
                                            <a
                                                href={socialLinks.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-gray-800 hover:bg-pink-600 rounded-lg transition-colors group"
                                                aria-label="Instagram"
                                            >
                                                <FiInstagram className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Lado Direito - Informações de Contato */}
                                    <div className="space-y-4">
                                        {/* Email */}
                                        <a
                                            href={socialLinks.email}
                                            className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                                        >
                                            <div className="p-3 bg-primary-900 rounded-lg group-hover:bg-primary-800 transition-colors flex-shrink-0">
                                                <FiMail className="w-6 h-6 text-primary-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-400 mb-1">Email</p>
                                                <p className="text-white text-sm font-medium truncate">
                                                    {developerData.email}
                                                </p>
                                            </div>
                                        </a>

                                        {/* Telefone/WhatsApp */}
                                        <a
                                            href={socialLinks.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                                        >
                                            <div className="p-3 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors flex-shrink-0">
                                                <FiPhone className="w-6 h-6 text-green-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-400 mb-1">WhatsApp</p>
                                                <p className="text-white text-sm font-medium">
                                                    {developerData.phone}
                                                </p>
                                            </div>
                                        </a>

                                        {/* Localização */}
                                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50">
                                            <div className="p-3 bg-primary-900 rounded-lg flex-shrink-0">
                                                <FiMapPin className="w-6 h-6 text-primary-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-400 mb-1">Localização</p>
                                                <p className="text-white text-sm font-medium">
                                                    {developerData.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

export { Contact };
