// All site copy lives here. Edit text in this file only — components import from it.

export type IconName =
  | "Server"
  | "Megaphone"
  | "LayoutGrid"
  | "TrendingUp"
  | "MapPin"
  | "Mail";

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Pillar {
  icon: IconName;
  title: string;
  text: string;
}

export interface Service {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  image: ImageAsset;
}

export const site = {
  name: "Exact Media",
  legalName: "Exact Media, LLC",
  tagline: "IT Services & Online Advertising",
  url: "https://exactmedia.net",
  meta: {
    title: "Exact Media | IT Services & Online Advertising",
    description:
      "Exact Media is a multi-source advertising platform and IT services provider helping businesses scale their presence, monetize their platforms, and streamline operations.",
    ogImage: {
      src: "/images/og-image.png",
      width: 1200,
      height: 630,
      alt: "Exact Media — IT Services & Online Advertising",
    },
  },
} as const;

export const nav = {
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
  cta: { label: "Get in touch", href: "#contact" } satisfies NavLink,
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
  primaryLabel: "Primary",
  skipLabel: "Skip to content",
};

export const hero = {
  id: "home",
  eyebrow: "IT Services & Online Advertising",
  headline: "Empowering Growth Through Technology",
  subheadline:
    "We deliver innovative IT solutions and tailored advertising strategies that help businesses streamline operations, scale their presence, and stay ahead in an increasingly digital world.",
  primaryCta: { label: "Explore Services", href: "#services" } satisfies NavLink,
  secondaryCta: { label: "Contact Us", href: "#contact" } satisfies NavLink,
  scrollLabel: "Scroll to About section",
  pillars: [
    { icon: "Server", title: "IT Services", text: "Empowering Growth Through Technology" },
    { icon: "Megaphone", title: "Advertisers", text: "Scale Your Presence, Dominate Results" },
  ] satisfies Pillar[],
  image: {
    src: "/images/hero-bg.png",
    alt: "Dimly lit data center corridor with rows of server racks",
    width: 2400,
    height: 1350,
  } satisfies ImageAsset,
};

export const about = {
  id: "about",
  eyebrow: "About Us",
  heading: "The ultimate hub for streamlined advertising solutions",
  paragraphs: [
    "Welcome to Exact Media, the ultimate hub for streamlined advertising solutions. We are a dynamic multi-source advertising platform designed to empower businesses by connecting them to a vast network of ad channels in one intuitive interface.",
    "Our mission is simple: to make advertising smarter, more effective, and accessible for everyone. By harnessing cutting-edge technology, data-driven insights, and diverse ad formats, we enable brands to maximize their reach and achieve measurable results across multiple platforms.",
    "With Exact Media, you can easily manage and optimize campaigns, track performance in real time, and tap into a wide range of audiences – all from a single dashboard. Our commitment to innovation and transparency ensures our clients achieve impactful growth without complexity.",
    "Join us in revolutionizing the way advertising works. Whether you're a start-up looking to make your mark or an enterprise scaling new heights, Exact Media is your trusted partner for multi-channel success.",
  ],
  bullets: [
    "Multi-source ad channels in one interface",
    "Real-time campaign tracking & optimization",
    "Data-driven, transparent results",
  ],
  image: {
    src: "/images/about.png",
    alt: "Marketing professionals reviewing campaign analytics on a monitor",
    width: 1200,
    height: 1400,
  } satisfies ImageAsset,
};

export const services = {
  id: "services",
  eyebrow: "Our Services",
  heading: "Cutting-edge solutions for the digital landscape",
  intro:
    "At Exact Media, we specialize in delivering cutting-edge solutions to meet the diverse needs of businesses in the ever-evolving digital landscape. Our suite of services is crafted to drive growth, optimize performance, and create impactful connections between brands and their audiences.",
  items: [
    {
      id: "advertisers",
      title: "Advertisers",
      icon: "Megaphone",
      description:
        "At Exact Media, we specialize in creating tailored marketing strategies that effectively align with the goals of advertisers. Our focus is on achieving maximum campaign performance through innovative techniques that ensure we reach the right audience at the right time.",
      image: {
        src: "/images/service-advertisers.png",
        alt: "Laptop showing an advertising campaign performance dashboard",
        width: 1200,
        height: 900,
      },
    },
    {
      id: "publishers",
      title: "Publishers",
      icon: "LayoutGrid",
      description:
        "Maximize the value of your digital real estate with Exact Media. We empower publishers to monetize their platforms effectively, providing access to a wide range of advertisers, advanced tools, and robust analytics to help you grow your revenue while maintaining control over your audience experience.",
      image: {
        src: "/images/service-publishers.png",
        alt: "Tablet and phone displaying a digital publication with ad placements",
        width: 1200,
        height: 900,
      },
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Services",
      icon: "TrendingUp",
      description:
        "Unlock the power of digital marketing with Exact Media. We offer a comprehensive suite of services designed to elevate your brand, connect you with your target audience, and drive measurable results across every digital touch point. Whether you're a small business or a large enterprise, our data-driven strategies ensure your marketing efforts are effective, efficient, and impactful.",
      image: {
        src: "/images/service-digital-marketing.png",
        alt: "Connected analytics panels representing multi-channel digital marketing",
        width: 1200,
        height: 900,
      },
    },
    {
      id: "it",
      title: "IT Services",
      icon: "Server",
      description:
        "At Exact Media, we deliver innovative IT solutions that help businesses streamline operations, enhance productivity, and stay ahead in an increasingly digital world. Our IT services are designed to provide comprehensive support, from infrastructure management to cutting-edge technology solutions, ensuring your business runs smoothly and securely.",
      image: {
        src: "/images/service-it.png",
        alt: "IT engineer working on a laptop beside a server rack",
        width: 1200,
        height: 900,
      },
    },
  ] satisfies Service[],
};

export const ctaBand = {
  heading: "Ready to grow with Exact Media?",
  subheading: "Let's talk about your advertising and IT needs.",
  cta: { label: "Get in touch", href: "#contact" } satisfies NavLink,
};

export const contact = {
  id: "contact",
  eyebrow: "Contact",
  heading: "Let's build something together",
  location: {
    icon: "MapPin" as IconName,
    label: "Location",
    company: "EXACT MEDIA, LLC",
    address: "15470 Elk Ridge Lane APT-2, Chesterfield, MO, 62017 United States",
  },
  email: {
    icon: "Mail" as IconName,
    label: "Email",
    text: "Get support via email",
    // TODO: replace with the real support address
    address: "[EMAIL — replace with actual address]",
  },
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your project",
    submit: "Send message",
    submitting: "Sending…",
    success: "Thanks — your message has been sent. We'll be in touch soon.",
    error: "Something went wrong sending your message. Please try again or email us directly.",
    mailtoFallback: "Email us instead",
    mailtoSubject: "Website enquiry",
    validation: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please enter a message.",
      messageTooShort: "Please write at least 10 characters.",
      tooLong: "This is too long. Please shorten it.",
      invalidRequest: "Invalid request.",
    },
  },
};

export const footer = {
  tagline: "IT Services & Online Advertising",
  copyright: "© 2026 Exact Media, LLC. All rights reserved.",
  navLabel: "Footer",
};

export const themeSwitcher = {
  label: "Colour theme",
  toggleLabel: "Choose colour theme",
  closeLabel: "Close theme picker",
  hint: "Preview each palette live",
};
