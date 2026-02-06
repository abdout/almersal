import Link from 'next/link';
import Image from 'next/image';
import type { Locale, Dictionary } from '@/lib/i18n';

interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
}

// Arrow icon for primary nav
function ArrowIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Plus icon for accordion sections
function PlusIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Social media icons
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LineIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isRTL = lang === 'ar';

  // Primary navigation links
  const primaryNav = [
    { label: isRTL ? 'الرئيسية' : 'Home', href: `/${lang}` },
    { label: isRTL ? 'المواضيع' : 'Topics', href: `/${lang}/topics` },
    { label: isRTL ? 'الموقع' : 'Access', href: `/${lang}/access` },
    { label: isRTL ? 'جولة افتراضية' : 'Open Campus', href: `/${lang}/open-campus` },
    { label: isRTL ? 'أعمال الطلاب' : 'Student Works', href: `/${lang}/works` },
    { label: isRTL ? 'معلومات' : 'Information', href: `/${lang}/information` },
  ];

  // School info links
  const schoolInfoLinks = [
    { label: isRTL ? 'مميزاتنا' : 'Features', href: `/${lang}/feature` },
    { label: isRTL ? 'من نحن' : 'About Us', href: `/${lang}/about` },
    { label: isRTL ? 'شراكاتنا' : 'Partnerships', href: `/${lang}/collaboration` },
    { label: isRTL ? 'فريق العمل' : 'Faculty', href: `/${lang}/teachers` },
    { label: isRTL ? 'الاستشارات' : 'Counselor', href: `/${lang}/counselor` },
    { label: isRTL ? 'القبول' : 'Admissions', href: `/${lang}/exam` },
    { label: isRTL ? 'اختبار القبول' : 'AO Exam', href: `/${lang}/ao` },
    { label: isRTL ? 'الرسوم' : 'Tuition', href: `/${lang}/tuition` },
    { label: isRTL ? 'الدعم المالي' : 'Financial Support', href: `/${lang}/studysupport` },
    { label: isRTL ? 'المرافق' : 'Facilities', href: `/${lang}/facilities` },
  ];

  // Department links
  const departmentLinks = [
    { label: isRTL ? 'التصميم المرئي' : 'Visual Design', href: `/${lang}/visualdesign` },
    { label: isRTL ? 'التصميم الداخلي' : 'Interior Design', href: `/${lang}/architecture` },
    { label: isRTL ? 'الإعلام المرئي' : 'Broadcast & Media', href: `/${lang}/audiovisual` },
  ];

  // Employment links
  const employmentLinks = [
    { label: isRTL ? 'دعم التوظيف' : 'Employment Support', href: `/${lang}/employmentsupport` },
    { label: isRTL ? 'خريجونا' : 'Graduate Success', href: `/${lang}/history` },
    { label: isRTL ? 'النتائج' : 'Results', href: `/${lang}/employmentrecord` },
  ];

  // Visitor links
  const visitorLinks = [
    { label: isRTL ? 'طلاب الثانوية' : 'High School', href: `/${lang}/highschool` },
    { label: isRTL ? 'أولياء الأمور' : 'Parents', href: `/${lang}/parents` },
    { label: isRTL ? 'الموظفون' : 'Working Professionals', href: `/${lang}/society` },
    { label: isRTL ? 'الطلاب الدوليون' : 'International Students', href: `/${lang}/international` },
    { label: isRTL ? 'جهات التوظيف' : 'Recruiters', href: `/${lang}/recruitment` },
  ];

  // Social media links
  const socialLinks = [
    { icon: InstagramIcon, href: 'https://www.instagram.com/almersal', label: 'Instagram', wide: false },
    { icon: XIcon, href: 'https://x.com/almersal', label: 'X', wide: false },
    { icon: FacebookIcon, href: 'https://www.facebook.com/almersal', label: 'Facebook', wide: false },
    { icon: LineIcon, href: '#', label: 'LINE', wide: false },
    { icon: YouTubeIcon, href: 'https://www.youtube.com/@almersal', label: 'YouTube', wide: false },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@almersal', label: 'TikTok', wide: true },
  ];

  // Accordion sections for mobile
  const accordionSections = [
    { title: isRTL ? 'عن المؤسسة' : 'About School', links: schoolInfoLinks },
    { title: isRTL ? 'الأقسام' : 'Departments', links: departmentLinks },
    { title: isRTL ? 'التوظيف' : 'Employment', links: employmentLinks },
    { title: isRTL ? 'الزوار' : 'Visitors', links: visitorLinks },
  ];

  return (
    <div data-section-id="footer" data-section-type="footer">
    <footer className="bg-[#ED6C00] text-white">
      {/* Main Navigation */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-10 pt-10 md:pt-16 pb-4 md:pb-12">

        {/* === MOBILE LAYOUT === */}
        <div className="md:hidden">
          {/* Primary Nav - 2 column grid */}
          <div className="grid grid-cols-2 gap-x-8">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between py-5 border-b text-sm hover:opacity-70 transition-opacity"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <span className="font-bold">{item.label}</span>
                <ArrowIcon />
              </Link>
            ))}
          </div>

          {/* Accordion Sections */}
          <div className="mt-2">
            {accordionSections.map((section) => (
              <details key={section.title} className="group border-b" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-bold text-sm">{section.title}</span>
                  <span className="group-open:hidden"><PlusIcon /></span>
                  <span className="hidden group-open:inline-block">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <nav className="pb-4 space-y-2.5 ps-1">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-xs text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </details>
            ))}
          </div>

          {/* Social Icons - Horizontal Row */}
          <div className="mt-8">
            <p className="text-base text-white font-bold mb-4">{isRTL ? 'حساباتنا الرسمية' : 'Almersal Official SNS'}</p>
            <div className="flex items-center justify-between">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label={social.label}
                >
                  <div className={`h-13 bg-white rounded-full flex items-center justify-center text-[#ED6C00] ${social.wide ? 'w-18 px-2' : 'w-13'}`}>
                    {social.wide ? <span className="text-sm font-bold text-[#ED6C00]">{social.label}</span> : <social.icon className="w-6 h-6" />}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Organization Info */}
          <div className="mt-8 text-xs leading-relaxed">
            <p className="text-white/80">{isRTL ? 'شركة المرسال للإنتاج الإعلامي' : 'Almersal Media Production Company'}</p>
            <p className="font-medium mt-1">{isRTL ? 'المرسال للإنتاج الإعلامي' : 'Almersal Media Production'}</p>
            <p className="mt-3 text-white/80">{isRTL ? 'ص.ب 12345' : 'P.O. Box 12345'}</p>
            <p className="text-white/80">{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</p>
          </div>
        </div>

        {/* === DESKTOP LAYOUT === */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Primary Navigation */}
          <div className="col-span-1">
            <div className="border-t border-white/20 mb-0" />
            <nav className="space-y-0">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-5 border-b border-white/20 text-base hover:opacity-70 transition-opacity group"
                >
                  <span>{item.label}</span>
                  <ArrowIcon />
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: School Info + Departments */}
          <div className="mt-8 lg:mt-0">
            <div>
              <div className="border-t border-white/20 mb-5" />
              <h3 className="text-base font-medium mb-5">{isRTL ? 'عن المؤسسة' : 'About School'}</h3>
              <nav className="space-y-3">
                {schoolInfoLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-sm text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-10 pt-8 border-t border-white/20">
              <h3 className="text-base font-medium mb-5">{isRTL ? 'الأقسام' : 'Departments'}</h3>
              <nav className="space-y-3">
                {departmentLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-sm text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-b border-white/20" />
            </div>
          </div>

          {/* Column 3: Employment + Visitors */}
          <div className="mt-8 lg:mt-0">
            <div>
              <div className="border-t border-white/20 mb-5" />
              <h3 className="text-base font-medium mb-5">{isRTL ? 'التوظيف' : 'Employment'}</h3>
              <nav className="space-y-3">
                {employmentLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-sm text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-10 pt-8 border-t border-white/20">
              <h3 className="text-base font-medium mb-5">{isRTL ? 'الزوار' : 'Visitors'}</h3>
              <nav className="space-y-3">
                {visitorLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-sm text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-b border-white/20" />
            </div>
          </div>

          {/* Column 4: Contact Info + Social */}
          <div className="mt-8 lg:mt-0">
            <div className="text-sm leading-relaxed">
              <p className="text-white/80">{isRTL ? 'شركة المرسال للإنتاج الإعلامي' : 'Almersal Media Production Company'}</p>
              <p className="font-medium mt-1">{isRTL ? 'المرسال للإنتاج الإعلامي' : 'Almersal Media Production'}</p>
              <p className="mt-4 text-white/80">{isRTL ? 'ص.ب 12345' : 'P.O. Box 12345'}</p>
              <p className="text-white/80">{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</p>
            </div>
            <div className="mt-8">
              <p className="text-sm text-white/60 mb-4">{isRTL ? 'حساباتنا الرسمية' : 'Almersal Official SNS'}</p>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                    aria-label={social.label}
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#ED6C00]">
                      <social.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-10 pb-8 md:pb-12">
        {/* === MOBILE CARDS === */}
        <div className="flex flex-col gap-3 md:hidden">
          {/* Phone Contact Card */}
          <div className="bg-white rounded-2xl px-6 py-8 text-center">
            <p className="text-base text-gray-600 mb-5 leading-relaxed px-4">
              {isRTL
                ? 'للاستفسارات والحجوزات، يرجى الاتصال بنا عبر الهاتف أو النموذج'
                : 'For inquiries and reservations, please contact us by phone or web form'}
            </p>
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-base text-[#ED6C00] font-medium">Tel.</span>
              <a
                href="tel:+966501234567"
                className="text-[#ED6C00] text-[2.2rem] font-bold tracking-tight hover:opacity-80 transition-opacity"
              >
                050-123-4567
              </a>
            </div>
            <p className="text-[11px] text-[#ED6C00] mt-1">
              {isRTL ? '【ساعات العمل】الأحد - الخميس 9:00〜17:00' : '【Hours】Sun - Thu 9:00〜17:00'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="mt-5 mx-auto block max-w-[280px] bg-[#ED6C00] text-white py-3.5 rounded-full text-sm font-medium hover:bg-[#ED6C00]/90 transition-colors"
            >
              {isRTL ? 'تواصل عبر الويب' : 'Contact via Web'}
            </Link>
          </div>

          {/* Materials Request Card */}
          <div className="bg-white rounded-2xl px-7 py-7 flex items-center justify-between gap-4">
            <p className="text-base text-gray-800 leading-snug">
              {isRTL ? <>لطلب المواد<br />التعريفية</> : <>Request materials<br />for more info</>}
            </p>
            <Link
              href={`/${lang}/request`}
              className="bg-[#2639A6] text-white px-8 py-3.5 rounded-full text-base font-medium whitespace-nowrap hover:bg-[#2639A6]/90 transition-colors flex-shrink-0"
            >
              {isRTL ? 'طلب المواد' : 'Request Materials'}
            </Link>
          </div>
        </div>

        {/* === DESKTOP CARDS === */}
        <div className="hidden md:flex md:flex-col lg:flex-row gap-4">
          {/* Phone Contact Card */}
          <div className="flex-1 bg-white rounded-2xl p-6 lg:p-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              {isRTL
                ? 'للاستفسارات والحجوزات، يرجى الاتصال بنا عبر الهاتف أو النموذج'
                : 'For inquiries and reservations, please contact us by phone or web form'}
            </p>
            <div className="flex flex-row items-center justify-center gap-4 lg:gap-6">
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#ED6C00]">Tel.</span>
                <a
                  href="tel:+966501234567"
                  className="text-[#ED6C00] text-3xl lg:text-4xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                  050-123-4567
                </a>
              </div>
              <span className="text-[12px] text-gray-500">
                {isRTL ? '【ساعات العمل】الأحد - الخميس 9:00〜17:00' : '【Hours】Sun - Thu 9:00〜17:00'}
              </span>
              <Link
                href={`/${lang}/contact`}
                className="bg-[#ED6C00] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#ED6C00]/90 transition-colors"
              >
                {isRTL ? 'تواصل عبر الويب' : 'Contact via Web'}
              </Link>
            </div>
          </div>

          {/* Materials Request Card */}
          <div className="lg:w-72 bg-white rounded-2xl p-6 lg:p-8 text-center flex flex-col justify-center">
            <p className="text-sm text-gray-600 mb-4">
              {isRTL ? 'لطلب المواد التعريفية' : 'Request materials'}
            </p>
            <Link
              href={`/${lang}/request`}
              className="bg-[#2639A6] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#2639A6]/90 transition-colors"
            >
              {isRTL ? 'طلب المواد' : 'Request Materials'}
            </Link>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="pt-4 md:pt-6 lg:pt-8 px-2 md:px-6 lg:px-10 w-full overflow-hidden">
        <div className="flex items-center justify-start gap-1.5 md:gap-4 lg:gap-6 w-full">
          <Image
            src="/logo.png"
            alt="Almersal Logo"
            width={200}
            height={200}
            className="w-11 h-11 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-[8.5rem] xl:h-[8.5rem] flex-shrink-0"
          />
          <span
            className="font-bold tracking-wide whitespace-nowrap text-[5.2vw] md:text-3xl lg:text-[3.25rem] xl:text-[4.85rem] 2xl:text-[5.85rem]"
          >
            {isRTL ? 'المرسال للإنتاج الإعلامي' : 'ALMERSAL MEDIA PRODUCTION'}
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#ED6C00]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-10 pt-2 pb-20 md:pb-10 flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-3">
          <Link
            href={`/${lang}/privacy`}
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </Link>
          <p className="text-sm font-medium text-white/80">
            © {currentYear} {isRTL ? 'شركة المرسال للإنتاج الإعلامي. جميع الحقوق محفوظة.' : 'ALMERSAL MEDIA PRODUCTION CO. ALL RIGHTS RESERVED.'}
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}
