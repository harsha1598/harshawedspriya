import { useEffect, useRef, useState } from 'react';
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

function MusicPlayer({ music }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    audio.volume = music.volume ?? 0.35;
    audio.loop = true;

    const handleEnded = async () => {
      audio.currentTime = 0;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('error', handleError);
    };
  }, [music.volume]);

  if (!music.enabled) {
    return null;
  }

  const handleToggle = async () => {
    const audio = audioRef.current;

    if (!audio || hasError) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setHasError(true);
    }
  };

  return (
    <div className="music-player reveal-on-scroll is-visible">
      <button
        type="button"
        className={`music-player__button ${isPlaying ? 'is-playing' : ''}`}
        onClick={handleToggle}
        disabled={hasError}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        <span className="music-player__icon" aria-hidden="true">
          <span className={`music-player__glyph ${isPlaying ? 'is-pause' : 'is-play'}`} />
        </span>
      </button>
      <audio ref={audioRef} loop preload="metadata" src={withBasePath(music.src)} />
    </div>
  );
}

function Hero({ couple, event, venue, buttons, heroImages }) {
  return (
    <section className="hero reveal-on-scroll is-visible" id="home">
      <div className="hero__curtain-track" aria-hidden="true">
        <span className="hero__curtain hero__curtain--left" />
        <span className="hero__curtain hero__curtain--right" />
      </div>
      <div className="hero__backdrop" />
      <div className="hero__veil hero__veil--left" aria-hidden="true" />
      <div className="hero__veil hero__veil--right" aria-hidden="true" />
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
        <div className="hero__photo-stack">
          <figure className="hero__frame hero__frame--main" data-tilt>
            <img src={withBasePath(heroImages.primary.src)} alt="" />
          </figure>
          <figure className="hero__frame hero__frame--accent" data-tilt>
            <img src={withBasePath(heroImages.secondary.src)} alt="" />
          </figure>
          <span className="hero__orbit hero__orbit--one" />
          <span className="hero__orbit hero__orbit--two" />
        </div>
      </div>
    </section>
  );
}

function Story({ story }) {
  return (
    <section className="story panel reveal-on-scroll" id="story">
      <SectionTitle eyebrow={story.eyebrow} title={story.title} body={story.intro} />
      <div className="story__grid">
        <article className="story__card" data-tilt>
          <div className="story__body">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="story__quote">{story.quote}</blockquote>
        </article>
      </div>
    </section>
  );
}

function CoupleCard({ person }) {
  return (
    <article className="couple-card" data-tilt>
      <div className="couple-card__image">
        <img
          src={withBasePath(person.photo)}
          alt={person.alt}
          loading="lazy"
          style={person.photoPosition ? { objectPosition: person.photoPosition } : undefined}
        />
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
            photoPosition: couple.bridePhotoPosition,
            alt: `${couple.brideName} portrait`,
          }}
        />
        <CoupleCard
          person={{
            role: 'The Groom',
            name: couple.groomName,
            description: couple.groomDescription,
            photo: couple.groomPhoto,
            photoPosition: couple.groomPhotoPosition,
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
          <article className="timeline__item" key={`${item.time}-${item.title}`} data-tilt>
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
            className={`gallery__item ${
              (image.width ?? 1) > (image.height ?? 1)
                ? 'gallery__item--landscape'
                : 'gallery__item--portrait'
            }`}
            style={{
              '--gallery-rotate': `${index % 2 === 0 ? -1 : 1.2}deg`,
              '--gallery-delay': `${index * 0.45}s`,
            }}
            data-tilt
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
  const { theme, nav, hero, music, couple, event, venue, story, schedule, gallery, contact } =
    siteContent;
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    const tiltItems = document.querySelectorAll('[data-tilt]');
    const heroElement = document.querySelector('.hero');
    let curtainTimer;
    let frameId;

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

    const resetTilt = (element) => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--glow-x', '50%');
      element.style.setProperty('--glow-y', '50%');
    };

    const handlePointerMove = (event) => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tiltY = (x - 0.5) * 10;
      const tiltX = (0.5 - y) * 10;

      element.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      element.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      element.style.setProperty('--glow-x', `${(x * 100).toFixed(2)}%`);
      element.style.setProperty('--glow-y', `${(y * 100).toFixed(2)}%`);
    };

    const tiltCleanup = [];

    tiltItems.forEach((item) => {
      resetTilt(item);
      const handlePointerLeave = () => resetTilt(item);
      item.addEventListener('pointermove', handlePointerMove);
      item.addEventListener('pointerleave', handlePointerLeave);
      tiltCleanup.push(() => {
        item.removeEventListener('pointermove', handlePointerMove);
        item.removeEventListener('pointerleave', handlePointerLeave);
        resetTilt(item);
      });
    });

    const updateScrollShift = () => {
      const root = document.documentElement;
      const scrollTop = window.scrollY;
      const shift = Math.min(scrollTop * 0.08, 32);
      const globalDepth = Math.min(scrollTop * 0.05, 26);
      let heroProgress = 0;

      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        const distance = Math.max(window.innerHeight + rect.height, 1);
        heroProgress = Math.min(Math.max((window.innerHeight - rect.top) / distance, 0), 1);
      }

      root.style.setProperty('--scroll-shift', `${shift}px`);
      root.style.setProperty('--page-depth', `${globalDepth.toFixed(2)}px`);
      root.style.setProperty('--hero-progress', heroProgress.toFixed(3));
    };

    frameId = window.requestAnimationFrame(() => {
      curtainTimer = window.setTimeout(() => {
        setIsCurtainOpen(true);
      }, 180);
    });

    updateScrollShift();
    window.addEventListener('scroll', updateScrollShift, { passive: true });
    window.addEventListener('resize', updateScrollShift);

    return () => {
      observer.disconnect();
      tiltCleanup.forEach((cleanup) => cleanup());
      window.removeEventListener('scroll', updateScrollShift);
      window.removeEventListener('resize', updateScrollShift);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(curtainTimer);
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
    <div className={`app-shell ${isCurtainOpen ? 'is-curtain-open' : ''}`} style={themeStyles}>
      <div className="reveal-on-scroll is-visible">
        <FloatingNav
          links={nav.links}
          buttonLabel={nav.mapButtonLabel}
          buttonTarget={venue.mapUrl}
        />
      </div>
      <MusicPlayer music={music} />
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
