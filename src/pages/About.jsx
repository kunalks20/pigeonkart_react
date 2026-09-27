import React from "react";

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image stretched across the entire page, blurred and
          scaled up slightly so the blur never shows a sharp edge at the
          section boundary. Replace /images/aboutus-background.jpg with a real
          photo (kitchen, ingredients, packaging in progress, etc.). */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-110"
        style={{ backgroundImage: "url('/images/aboutus-background.jpg')" }}
      />
      <div className="absolute inset-0 bg-ink/70" />

      {/* Heading + body copy both sit on top of the same background now,
          instead of the body switching to a plain section below. */}
      <div className="relative max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="uppercase tracking-[0.25em] text-sm text-turmeric font-semibold mb-3">
          Our story
        </p>
        <h1 className="font-display text-4xl font-700 text-cream drop-shadow-md mb-10">
          About Us
        </h1>

        <div className="text-left space-y-4">
          <p className="text-cream/90 leading-relaxed">
            Bringing the taste of traditional India to modern cities. We're
            connecting local achar & namkeen makers from our markets and small
            communities with customers in metro cities—so authentic,
            time-honoured flavours can travel beyond their hometowns. From
            naturally fermented achar made without vinegar to traditional
            namkeen prepared with age-old recipes, these are flavours rooted in
            tradition, made by local hands, and meant to be enjoyed everywhere.
            Local makers. Traditional flavours. Wider reach.
          </p>
        </div>
      </div>
    </section>
  );
}
