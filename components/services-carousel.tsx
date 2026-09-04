"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/lib/content";
import { Icon } from "@/components/site";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedService } from "@/lib/translations-data";

export function ServicesCarousel({ services }: { services: Service[] }) {
  const { locale, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [slideStep, setSlideStep] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const lastIndex = Math.max(0, services.length - visibleCount);
  const isRTL = locale === "ar";

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(window.innerWidth <= 650 ? 1 : window.innerWidth <= 960 ? 2 : 3);
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const updateSlideStep = () => {
      if (viewportRef.current) setSlideStep(viewportRef.current.clientWidth / visibleCount);
    };
    updateSlideStep();
    window.addEventListener("resize", updateSlideStep);
    return () => window.removeEventListener("resize", updateSlideStep);
  }, [visibleCount]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, lastIndex));
  }, [lastIndex]);

  // When switching languages, reset activeIndex
  useEffect(() => {
    setActiveIndex(0);
  }, [locale]);

  const offset = isRTL ? activeIndex * slideStep : -activeIndex * slideStep;

  return (
    <div className="services-carousel">
      <div className="services-viewport" ref={viewportRef}>
        <div className="services-track" style={{ transform: `translateX(${offset}px)` }}>
          {services.map((rawService) => {
            const service = getLocalizedService(rawService, locale);
            return (
              <article className="surface service-card services-slide" key={rawService.id}>
                <img className="card-image" src={service.image} alt={`${service.name} service`} />
                <div className="card-body">
                  <div className="card-icon"><Icon name={service.icon} size={19} /></div>
                  <h3 className="h3">{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="card-footer">
                    <Link className="card-link" href={`/services/${service.slug}`}>
                      {t("See how we help")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls" aria-label="Services carousel controls">
        <div className="carousel-dots" aria-label="Choose service slide">
          {Array.from({ length: lastIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to service slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          className="carousel-button"
          type="button"
          onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
          disabled={activeIndex === 0}
          aria-label={isRTL ? "الخدمات التالية" : "Previous services"}
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </button>
        <span className="carousel-status" aria-live="polite">
          {activeIndex + 1} / {lastIndex + 1}
        </span>
        <button
          className="carousel-button"
          type="button"
          onClick={() => setActiveIndex((index) => Math.min(lastIndex, index + 1))}
          disabled={activeIndex === lastIndex}
          aria-label={isRTL ? "الخدمات السابقة" : "Next services"}
        >
          {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}
