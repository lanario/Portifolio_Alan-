'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { developerData, socialLinks, navigationSections } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils/scroll';

function Footer() {
    const currentYear = new Date().getFullYear();

    function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
        e.preventDefault();
        scrollToSection(sectionId);
    }

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Informações */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-white font-bold text-lg mb-4">
                            {developerData.name}
                        </h3>
                        <p className="text-sm mb-2">{developerData.title}</p>
                        <p className="text-sm">{developerData.location}</p>
                    </motion.div>

                    {/* Links Rápidos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            {navigationSections.slice(1, 4).map((section) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        onClick={(e) => handleLinkClick(e, section.id)}
                                        className="hover:text-white transition-colors cursor-pointer"
                                    >
                                        {section.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Redes Sociais */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-white font-semibold mb-4">Redes Sociais</h3>
                        <div className="flex gap-4">
                            <motion.a
                                href={socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                aria-label="GitHub"
                            >
                                <FiGithub className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href={socialLinks.email}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                aria-label="Email"
                            >
                                <FiMail className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href={socialLinks.phone}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                aria-label="Telefone"
                            >
                                <FiPhone className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="border-t border-gray-800 pt-8 text-center text-sm"
                >
                    <p>
                        © {currentYear} {developerData.name}. Todos os direitos reservados.
                    </p>
                    <p className="mt-2 text-gray-500">

                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

export { Footer };
