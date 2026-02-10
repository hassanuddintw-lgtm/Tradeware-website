"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { headerNavigation, isNavItemActive } from "@/config/navigation";
import { routes } from "@/config/routes";
import CarLogo from "@/components/ui/CarLogo";
import UniversalSearch from "@/components/ui/UniversalSearch";
import { navbarScroll } from "@/lib/animations";

export default function ModernHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const cleanup = navbarScroll(headerRef.current, { scrolledClass: "scrolled", threshold: 24 });
    return cleanup;
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navigation = headerNavigation.map((item) => ({
    name: item.label,
    href: item.href,
    isActive: isNavItemActive(pathname, item),
    hasDropdown: !!item.children,
    dropdownItems: item.children?.map((child) => ({
      name: child.label,
      href: child.href,
      isActive: isNavItemActive(pathname, child),
    })),
  }));

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300 ease-out max-md:bg-black/70 max-md:backdrop-blur-xl max-md:border-b max-md:border-white/[0.06] max-md:shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem] max-md:h-12 max-md:min-h-[48px]">
            <div className="max-md:scale-[1.05] max-md:origin-left shrink-0 min-w-0">
              <CarLogo />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                  onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
                >
                  <a
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (!item.hasDropdown) setOpenDropdown(null);
                    }}
                    className={`group/link relative flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${
                      item.isActive ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    )}
                    {item.isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-px bg-cyan-500/90" />
                    )}
                    {!item.isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-px bg-cyan-500/60 scale-x-0 origin-center transition-transform duration-200 group-hover/link:scale-x-100" />
                    )}
                  </a>

                  {item.hasDropdown && openDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 pt-1 -ml-1"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="min-w-[180px] py-1.5 rounded-lg bg-[#0a0a0d]/95 backdrop-blur-xl border border-white/[0.06] shadow-xl z-50 relative">
                        {item.dropdownItems?.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => {
                              setOpenDropdown(null);
                              setMobileMenuOpen(false);
                            }}
                            className={`block px-3 py-2 text-[10px] font-medium tracking-wider transition-colors cursor-pointer ${
                                subItem.isActive
                                  ? "text-cyan-400 bg-white/[0.04]"
                                  : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                            }`}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3 max-md:gap-2">
              <UniversalSearch />
              <a
                href={routes.login}
                className="hidden md:inline-flex items-center px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Admin Login
              </a>
              <a
                href={routes.inventory}
                data-gsap-button
                className="inline-flex items-center justify-center px-4 py-2 bg-cyan-500 text-black text-[10px] font-semibold uppercase tracking-[0.1em] rounded-lg hover:bg-cyan-400 transition-colors cursor-pointer max-md:px-3.5 max-md:py-2 max-md:rounded-xl max-md:text-[10px] max-md:min-h-[44px] max-md:ring-1 max-md:ring-cyan-400/30 max-md:shadow-md max-md:shadow-cyan-500/15"
              >
                <span className="hidden md:inline">Explore Stock</span>
                <span className="md:hidden">Explore</span>
              </a>

              {/* Hamburger - mobile only (lg:hidden) */}
              <button
                type="button"
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 max-md:w-11 max-md:min-w-[44px] max-md:min-h-[44px] rounded-lg max-md:rounded-xl max-md:border max-md:border-white/10 text-white/90 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer z-0"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-[min(360px,92vw)] mobile-drawer-glass shadow-2xl overflow-y-auto z-10 flex flex-col"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between h-12 min-h-[48px] px-4 border-b border-white/[0.08] shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Menu</span>
                <motion.button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </motion.button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 pt-5 pb-5 space-y-0.5">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3.5 px-4 -mx-4 rounded-xl text-[14px] font-semibold tracking-tight transition-colors cursor-pointer min-h-[44px] flex items-center ${
                        item.isActive ? "text-cyan-400 bg-cyan-500/10" : "text-white hover:text-cyan-400 hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </a>
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="pl-5 mt-0.5 mb-1.5 space-y-0.5 border-l border-white/10 ml-4">
                        {item.dropdownItems.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-3 pl-3 text-[13px] transition-colors cursor-pointer min-h-[40px] flex items-center -ml-px ${
                              subItem.isActive ? "text-cyan-400 font-medium" : "text-zinc-500 hover:text-white"
                            }`}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 pt-4 pb-6 border-t border-white/[0.08] bg-white/[0.02] backdrop-blur-sm space-y-3 shrink-0">
                <a
                  href={routes.inventory}
                  data-gsap-button
                  className="block w-full py-3.5 text-center bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-cyan-400 transition-colors cursor-pointer min-h-[48px] flex items-center justify-center ring-1 ring-cyan-400/20 shadow-lg shadow-cyan-500/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explore Stock
                </a>
                <a
                  href={routes.login}
                  className="block w-full py-3.5 text-center text-zinc-400 hover:text-white text-xs font-medium uppercase tracking-wider rounded-xl border border-white/[0.12] hover:border-white/20 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </a>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
