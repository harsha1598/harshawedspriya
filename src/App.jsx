import { useEffect } from 'react';
import siteContent from './content/siteContent.json';

const fontOptions = {
  cormorant: '"Cormorant Garamond", serif',
  manrope: '"Manrope", sans-serif',
};

function withBasePath(path) {
  if (!path || /^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedBase = import.meta.env.BASE_URL || '/';
  const normalizedPath = path.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}

function buildMapEmbedUrl(venue) {
  const query = [venue.name, venue.address].filter(Boolean).join(', ');

  if (!query) {
    return '';
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}

function SectionTitle({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p className="section-copy">{body}</p> : null}
    </div>
  );
}

const sparkleItems = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${6 + index * 6.4}%`,
  delay: `${(index % 7) * 0.8}s`,
  duration: `${8 + (index % 5) * 1.6}s`,
}));

function SparkleField() {
  return (
    <div className="sparkles" aria-hidden="true">
      {sparkleItems.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.left,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}
    </div>
  );
}

function FloatingNav({ links, buttonLabel, buttonTarget }) {
  return (
    <div className="floating-nav">
      <div className="floating-nav__brand">
        <span className="floating-nav__brand-mark">||</span>
        <span>{siteContent.nav.brandLabel}</span>
        <span className="floating-nav__brand-mark">||</span>
      </div>
      <nav aria-label="Section navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="button button--ghost" href={buttonTarget} target="_blank" rel="noreferrer">
        {buttonLabel}
      </a>
    </div>
  );
}

function Hero({ couple, event, venue, buttons, heroImages }) {
  return (
    <section className="hero reveal-on-scroll is-visible" id="home">
      <div className="hero__backdrop" />
      <div className="hero__light-rays" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <SparkleField />
      <div className="hero__content">
        <div className="hero__arch" aria-hidden="true">
          <span className="hero__arch-line hero__arch-line--outer" />
          <span className="hero__arch-line hero__arch-line--inner" />
        </div>
        <div className="hero__ornament" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="hero__kicker">{siteContent.hero.kicker}</p>
        <p className="eyebrow">{event.tagline}</p>
        <h1>
          <span>{couple.brideName}</span>
          <span className="hero__ampersand">&amp;</span>
          <span>{couple.groomName}</span>
        </h1>
        <p className="hero__subtitle">{siteContent.hero.subKicker}</p>
        <p className="hero__date">{event.fullDate}</p>
        <p className="hero__lead">{event.invitationLine}</p>
        <div className="hero__meta">
          <div>
            <span className="hero__meta-label">Time</span>
            <strong>{event.ceremonyTime}</strong>
          </div>
          <div>
            <span className="hero__meta-label">Venue</span>
            <strong>{venue.name}</strong>
          </div>
        </div>
        <div className="hero__actions">
          <a className="button" href={buttons.primary.href}>
            {buttons.primary.label}
          </a>
          <a className="button button--ghost" href={buttons.secondary.href}>
            {buttons.secondary.label}
          </a>
        </div>
        <div className="hero__scroll-cue" aria-hidden="true">
          <span>Scroll for the celebration</span>
          <i />
        </div>
      </div>
      <div className="hero__visuals" aria-hidden="true">
        <figure className="hero__frame hero__frame--main">
          <img src={withBasePath(heroImages.primary.src)} alt="" />
        </figure>
        <figure className="hero__frame hero__frame--accent">
          <img src={withBasePath(heroImages.secondary.src)} alt="" />
        </figure>
      </div>
    </section>
  );
}

function Story({ story }) {
  return (
    <section className="story panel reveal-on-scroll" id="story">
      <SectionTitle eyebrow={story.eyebrow} title={story.title} body={story.intro} />
      <div className="story__grid">
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <blockquote>{story.quote}</blockquote>
    </section>
  );
}

function CoupleCard({ person }) {
  return (
    <article className="couple-card">
      <div className="couple-card__image">
        <img src={withBasePath(person.photo)} alt={person.alt} loading="lazy" />
      </div>
      <div className="couple-card__body">
        <p className="eyebrow">{person.role}</p>
        <h3>{person.name}</h3>
        <p>{person.description}</p>
      </div>
    </article>
  );
}

function CoupleSection({ couple }) {
  return (
    <section className="couple panel reveal-on-scroll" id="couple">
      <SectionTitle
        eyebrow={couple.sectionEyebrow}
        title={couple.sectionTitle}
        body={couple.sectionBody}
        align="center"
      />
      <div className="couple__grid">
        <CoupleCard
          person={{
            role: 'The Bride',
            name: couple.brideName,
            description: couple.brideDescription,
            photo: couple.bridePhoto,
            alt: `${couple.brideName} portrait`,
          }}
        />
        <CoupleCard
          person={{
            role: 'The Groom',
            name: couple.groomName,
            description: couple.groomDescription,
            photo: couple.groomPhoto,
            alt: `${couple.groomName} portrait`,
          }}
        />
      </div>
    </section>
  );
}

function Timeline({ schedule }) {
  return (
    <section className="timeline panel reveal-on-scroll" id="schedule">
      <SectionTitle
        eyebrow={schedule.eyebrow}
        title={schedule.title}
        body={schedule.description}
      />
      <div className="timeline__list">
        {schedule.events.map((item) => (
          <article className="timeline__item" key={`${item.time}-${item.title}`}>
            <p className="timeline__time">{item.time}</p>
            <div>
              <h3>{item.title}</h3>
              <p>{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VenueCard({ venue }) {
  const mapEmbedUrl = buildMapEmbedUrl(venue);

  return (
    <section className="venue panel reveal-on-scroll" id="venue">
      <div className="venue__card">
        <SectionTitle eyebrow={venue.eyebrow} title={venue.title} body={venue.description} />
        <div className="venue__content">
          <div>
            <h3>{venue.name}</h3>
            <p>{venue.address}</p>
            <p>{venue.landmark}</p>
          </div>
          <div className="venue__actions">
            <a className="button" href={venue.mapUrl} target="_blank" rel="noreferrer">
              Open Map
            </a>
            <a className="button button--ghost" href={`tel:${venue.phone}`}>
              Contact Venue
            </a>
          </div>
        </div>
        {mapEmbedUrl ? (
          <div className="venue__map-shell">
            <iframe
              className="venue__map"
              title={`${venue.name} map`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Gallery({ gallery }) {
  return (
    <section className="gallery panel reveal-on-scroll" id="gallery">
      <SectionTitle eyebrow={gallery.eyebrow} title={gallery.title} body={gallery.description} />
      <div className={`gallery__grid gallery__grid--${gallery.variant}`}>
        {gallery.images.map((image, index) => (
          <figure
            key={image.src}
            className="gallery__item"
            style={{ '--gallery-rotate': `${index % 2 === 0 ? -1 : 1.2}deg` }}
          >
            <span className="gallery__frame-glow" aria-hidden="true" />
            <img src={withBasePath(image.src)} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer({ contact, event }) {
  return (
    <footer className="footer reveal-on-scroll" id="contact">
      <p className="eyebrow">{contact.eyebrow}</p>
      <h2>{contact.title}</h2>
      <p>{contact.description}</p>
      <div className="footer__contacts">
        <a href={`tel:${contact.phone}`}>{contact.phoneLabel}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
      <p className="footer__note">{event.footerNote}</p>
    </footer>
  );
}

function App() {
  const { theme, nav, hero, couple, event, venue, story, schedule, gallery, contact } =
    siteContent;

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    revealItems.forEach((item) => observer.observe(item));

    const updateScrollShift = () => {
      const shift = Math.min(window.scrollY * 0.08, 32);
      document.documentElement.style.setProperty('--scroll-shift', `${shift}px`);
    };

    updateScrollShift();
    window.addEventListener('scroll', updateScrollShift, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollShift);
    };
  }, []);

  const themeStyles = {
    '--color-bg': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-surface-strong': theme.colors.surfaceStrong,
    '--color-text': theme.colors.text,
    '--color-muted': theme.colors.muted,
    '--color-accent': theme.colors.accent,
    '--color-accent-soft': theme.colors.accentSoft,
    '--color-leaf': theme.colors.leaf,
    '--color-leaf-soft': theme.colors.leafSoft,
    '--color-line': theme.colors.line,
    '--hero-overlay': theme.heroOverlay,
    '--font-heading': fontOptions[theme.fonts.heading] || fontOptions.cormorant,
    '--font-body': fontOptions[theme.fonts.body] || fontOptions.manrope,
  };

  return (
    <div className="app-shell" style={themeStyles}>
      <div className="reveal-on-scroll is-visible">
        <FloatingNav
          links={nav.links}
          buttonLabel={nav.mapButtonLabel}
          buttonTarget={venue.mapUrl}
        />
      </div>
      <main className="page-shell">
        <Hero
          couple={couple}
          event={event}
          venue={venue}
          buttons={hero.buttons}
          heroImages={hero.images}
        />
        {story.enabled ? <Story story={story} /> : null}
        {couple.enabled ? <CoupleSection couple={couple} /> : null}
        {schedule.enabled ? <Timeline schedule={schedule} /> : null}
        {venue.enabled ? <VenueCard venue={venue} /> : null}
        {gallery.enabled ? <Gallery gallery={gallery} /> : null}
      </main>
      <Footer contact={contact} event={event} />
    </div>
  );
}

export default App;
