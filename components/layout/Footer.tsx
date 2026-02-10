"use client";

import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, Phone, Mail } from "lucide-react";
import { footerNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { useSiteConfig } from "@/context/SiteConfigContext";

const footerLinks = {
  Company: footerNavigation.company,
  Services: footerNavigation.services,
  Resources: footerNavigation.resources,
  Legal: footerNavigation.legal,
};

export default function Footer() {
  const siteConfig = useSiteConfig();
  const social = [
    { Icon: Facebook, href: siteConfig.social.facebook || "#", label: "Facebook" },
    { Icon: Twitter, href: siteConfig.social.twitter || "#", label: "Twitter" },
    { Icon: Instagram, href: siteConfig.social.instagram || "#", label: "Instagram" },
    { Icon: Linkedin, href: siteConfig.social.linkedin || "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-black border-t border-white/[0.08] backdrop-blur-sm glass-footer-top">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 py-10 lg:py-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href={routes.home} className="inline-block mb-4 cursor-pointer">
              <Image
                src="/tradeware-groups-logo-transparent.png"
                alt="Tradeware — Premium Japanese Vehicle Imports"
                width={240}
                height={72}
                className="h-11 md:h-12 w-auto object-contain object-left max-w-[200px] md:max-w-[220px]"
                loading="lazy"
              />
            </a>
            <p className="text-[12px] text-zinc-500 leading-relaxed max-w-xs">
              Premium Japanese vehicle imports. 15+ years · 10,000+ customers worldwide.
            </p>
            <div className="mt-4 space-y-2">
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-[12px] text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {siteConfig.contact.phone}
              </a>
              <div className="flex flex-col gap-0.5">
                {siteConfig.contact.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="flex items-center gap-2 text-[12px] text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer break-all">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    {email}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-zinc-500 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-pointer"
                  aria-label={`${label}`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[10px] font-semibold text-white/90 uppercase tracking-[0.18em] mb-3">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[12px] text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 border-t border-white/[0.06]">
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Tradeware. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={routes.terms}
              className="text-[11px] text-zinc-500 hover:text-zinc-400 transition-colors cursor-pointer"
            >
              Terms
            </a>
            <a
              href={routes.privacy}
              className="text-[11px] text-zinc-500 hover:text-zinc-400 transition-colors cursor-pointer"
            >
              Privacy
            </a>
            <button
              type="button"
              data-gsap-button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-zinc-500 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030305]"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
