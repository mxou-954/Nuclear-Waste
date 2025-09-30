"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Calendar,
  Map,
  Share2,
} from "lucide-react";

export default function NuclearWasteWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("accueil");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (page: any) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => navigateTo("accueil")}
              className="text-2xl font-light tracking-wide text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Déchets <span className="font-semibold">Nucléaires</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavButton
                onClick={() => navigateTo("accueil")}
                active={currentPage === "accueil"}
              >
                Accueil
              </NavButton>
              <NavButton
                onClick={() => navigateTo("chronologie")}
                active={currentPage === "chronologie"}
              >
                Chronologie
              </NavButton>
              <NavButton
                onClick={() => navigateTo("map-monde")}
                active={currentPage === "map-monde"}
              >
                Map Monde
              </NavButton>
              <NavButton
                onClick={() => navigateTo("controverses")}
                active={currentPage === "controverses"}
              >
                Cartographie
              </NavButton>
              <NavButton
                onClick={() => navigateTo("a-savoir")}
                active={currentPage === "a-savoir"}
              >
                À savoir
              </NavButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-2">
              <MobileNavButton onClick={() => navigateTo("accueil")}>
                Accueil
              </MobileNavButton>
              <MobileNavButton onClick={() => navigateTo("chronologie")}>
                Chronologie
              </MobileNavButton>
              <MobileNavButton onClick={() => navigateTo("map-monde")}>
                Map Monde
              </MobileNavButton>
              <MobileNavButton onClick={() => navigateTo("controverses")}>
                Cartographie
              </MobileNavButton>
              <MobileNavButton onClick={() => navigateTo("a-savoir")}>
                À savoir
              </MobileNavButton>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {currentPage === "accueil" && <AccueilPage scrollY={scrollY} />}
        {currentPage === "chronologie" && <ChronologiePage />}
        {currentPage === "map-monde" && <MapMondePage />}
        {currentPage === "controverses" && <ControversesPage />}
        {currentPage === "a-savoir" && <ASavoirPage />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              Projet Master Cartographie des Controverses
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Business School de Clermont-Ferrand • 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ children, onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "text-emerald-600 bg-emerald-50"
          : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function MobileNavButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
    >
      {children}
    </button>
  );
}

function AccueilPage({ scrollY }: { scrollY: number }) {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=2000&q=80"
            alt="Déchets nucléaires"
            className="w-full h-full object-cover opacity-30"
            style={{ transform: `scale(${1 + scrollY * 0.0005})` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Les Déchets Nucléaires
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light mb-8 max-w-3xl mx-auto">
            Une controverse scientifique, environnementale et sociétale au cœur
            de la transition énergétique française
          </p>
          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all duration-300 hover:gap-4 font-medium"
          >
            Explorer le sujet
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div
            id="intro"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.intro
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
                Contexte énergétique français
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                70% de l'électricité française produite par le nucléaire
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed">
                Le nucléaire est depuis plusieurs décennies au cœur de l'énergie
                française. Cette utilisation, bien qu'elle soit sujette à des
                controverses, a longtemps été défendue comme une solution à la
                fois efficace et qui permettait au pays de limiter la dépendance
                aux énergies fossiles. Cependant, nous n'allons pas nous
                concentrer sur la controverse liée à l'utilisation du nucléaire,
                mais bien sur celle liée aux{" "}
                <strong>déchets nucléaires produits</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div
            id="definition"
            data-animate
            className={`transition-all duration-1000 delay-100 ${
              isVisible.definition
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 lg:order-1">
                <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
                  Définition
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Les déchets nucléaires, qu'est-ce que c'est ?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Les déchets nucléaires sont l'ensemble des matières qui sont
                  entrées en contact avec des particules radioactives durant la
                  production d'électricité dans les centrales nucléaires.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Certains déchets sont peu radioactifs et se dégradent
                  relativement vite, mais d'autres peuvent rester dangereux
                  pendant <strong>des milliers d'années</strong>.
                </p>
              </div>
              <div className="order-1 lg:order-2 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/wiijpg.jpg"
                  alt="Déchets nucléaires"
                  className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-110 hover:rotate-2"
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <StatCard
                number="3"
                label="Catégories de déchets"
                description="Faible, moyenne et haute activité"
              />
              <StatCard
                number="1%"
                label="Déchets haute activité"
                description="Concentrent 99% de la radioactivité"
                highlight
              />
              <StatCard
                number="20 000m³"
                label="Production annuelle"
                description="En France chaque année"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
              Approches de gestion
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Existe-t-il des solutions ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Il n'existe, à ce jour,{" "}
              <strong>aucune solution permettant de détruire</strong> les
              déchets nucléaires. Cependant, plusieurs pistes de gestion sont
              étudiées ou mises en œuvre.
            </p>
          </div>

          {/* Solution 1: Immersion */}
          <div
            id="solution1"
            data-animate
            className={`mb-32 transition-all duration-1000 ${
              isVisible.solution1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Pratique abandonnée
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  L'immersion dans l'Atlantique
                </h3>
                <p className="text-sm text-gray-500 mb-6">1960 - 1990</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Dans les années 60 à 90, la France a eu recours à une pratique
                  jugée aujourd'hui comme scandaleuse : l'immersion des déchets
                  nucléaires dans l'Atlantique. Cette méthode était considérée
                  comme sûre, car on pensait que l'immensité de l'océan pouvait
                  « diluer » la radioactivité.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      32 000
                    </p>
                    <p className="text-sm text-gray-600">Conteneurs immergés</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      9 184t
                    </p>
                    <p className="text-sm text-gray-600">Tonnes de déchets</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Cette pratique a été <strong>interdite en 1993</strong> lors
                  de la convention de Londres. Les fûts présentent aujourd'hui
                  des signes de corrosion, laissant potentiellement s'échapper
                  des substances radioactives.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/soljpg.jpg"
                    alt="Océan Atlantique"
                    className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-110 hover:rotate-2"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4 italic">
                  Projet NODSSUM : 3 350 fûts cartographiés sur 162km²
                </p>
              </div>
            </div>
          </div>

          {/* Solution 2: La Hague */}
          <div
            id="solution2"
            data-animate
            className={`mb-32 transition-all duration-1000 delay-200 ${
              isVisible.solution2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-2 order-2 lg:order-1 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/usine.jpg"
                  alt="Usine de La Hague"
                  className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-110"
                />
              </div>
              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  En activité
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Le recyclage à La Hague
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Suite à l'abandon de l'immersion, la France s'est tournée vers
                  le recyclage des combustibles usés avec l'usine de
                  retraitement de La Hague. Cette méthode permet de réduire le
                  volume de déchets et de valoriser une partie du combustible.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">Avantages</h4>
                  <p className="text-gray-700">
                    Rend le plutonium et l'uranium réutilisables pour une
                    seconde utilisation dans les centrales.
                  </p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Limites</h4>
                  <p className="text-gray-700">
                    Processus coûteux et complexe qui ne supprime pas les
                    déchets les plus dangereux.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution 3: Cigéo */}
          <div
            id="solution3"
            data-animate
            className={`transition-all duration-1000 delay-300 ${
              isVisible.solution3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></span>
                    Projet controversé
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Le projet Cigéo à Bure
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Centre Industriel de Stockage Géologique • Meuse
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    L'un des projets les plus emblématiques et controversés :
                    l'enfouissement des déchets radioactifs à des centaines de
                    mètres sous terre dans des couches géologiques stables.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Les politiques présentent cette solution comme la plus
                    pérenne et scientifiquement encadrée à long terme pour
                    isoler les déchets pendant des centaines de milliers
                    d'années.
                  </p>
                  <div className="bg-white/80 backdrop-blur p-6 rounded-xl">
                    <h4 className="font-bold text-red-700 mb-3">
                      ⚠️ Opposition forte
                    </h4>
                    <p className="text-gray-700">
                      Les habitants et associations écologistes estiment
                      dangereux l'enfouissement sous leurs pieds et s'inquiètent
                      pour les générations futures face aux risques de fuites
                      radioactives.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="overflow-hidden rounded-2xl shadow-2xl mb-4">
                    <img
                      src="/recycl.jpg"
                      alt="Projet Cigéo"
                      className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-110 "
                    />
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    Des manifestations ont éclaté à Bure, témoignant d'une
                    fracture entre logique technoscientifique et revendications
                    citoyennes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">En résumé</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            La gestion des déchets nucléaires en France reste{" "}
            <strong className="text-white">
              très complexe et très controversée
            </strong>{" "}
            car aucune des solutions proposées ne semble faire l'unanimité et
            soulève régulièrement l'indignation. En effet, aucune des solutions
            ne permet d'éliminer les déchets nucléaires et leur dangerosité de
            façon pérenne et définitive.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <CTACard
              icon={<Calendar className="text-emerald-600" size={32} />}
              title="Chronologie"
              description="Explorez l'histoire complète de la gestion des déchets nucléaires"
              link="#"
            />
            <CTACard
              icon={<Map className="text-emerald-600" size={32} />}
              title="Map Monde"
              description="Découvrez la répartition mondiale du nucléaire"
              link="#"
            />
            <CTACard
              icon={<Share2 className="text-emerald-600" size={32} />}
              title="Cartographie"
              description="Naviguez dans la carte des controverses"
              link="#"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ number, label, description, highlight }: any) {
  return (
    <div
      className={`p-8 rounded-2xl ${
        highlight
          ? "bg-emerald-600 text-white"
          : "bg-white border-2 border-gray-100"
      }`}
    >
      <p
        className={`text-4xl font-bold mb-2 ${
          highlight ? "text-white" : "text-gray-900"
        }`}
      >
        {number}
      </p>
      <p
        className={`text-lg font-semibold mb-2 ${
          highlight ? "text-emerald-100" : "text-gray-700"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-sm ${
          highlight ? "text-emerald-100" : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function CTACard({ icon, title, description, link }: any) {
  return (
    <a
      href={link}
      className="group p-8 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center gap-2 text-emerald-600 font-medium">
        En savoir plus
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </div>
    </a>
  );
}

 function ChronologiePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
            Histoire & Événements
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Chronologie des déchets nucléaires
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez l'évolution de la gestion des déchets nucléaires à travers
            les décennies
          </p>
        </div>

        {/* Carte d'intro */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-12">
          <div className="flex items-center justify-center mb-8">
            <Calendar className="text-emerald-600" size={64} />
          </div>
          <p className="text-center text-gray-700 mb-8 text-lg">
            Explorez notre frise chronologique interactive détaillant les moments
            clés de cette controverse.
          </p>
          <div className="text-center">
            <a
              href="/frise_Chronologique"
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-all duration-300 hover:gap-5 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Accéder à la frise chronologique
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


function MapMondePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
            Vue globale
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Map Monde du Nucléaire
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visualisez la répartition mondiale des installations nucléaires et
            des sites de stockage
          </p>
        </div>

        <div className="space-y-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <img
                src="/carte2.jpg"
                alt="Map Monde 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Carte mondiale - Vue principale
              </h3>
              <p className="text-gray-600">
                Répartition des centrales nucléaires et sites de stockage dans
                le monde
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-center bg-gray-100">
              <img
                src="/carte1jpg.jpg"
                alt="Map Monde 2"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Carte mondiale - Vue détaillée
              </h3>
              <p className="text-gray-600">
                Focus sur les zones à forte concentration nucléaire
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControversesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
            Analyse approfondie
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Cartographie des Controverses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorez les différents acteurs, arguments et tensions autour des
            déchets nucléaires
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-12">
          <div className="flex items-center justify-center mb-8">
            <Share2 className="text-emerald-600" size={64} />
          </div>
          <p className="text-center text-gray-700 mb-8 text-lg">
            Naviguez dans notre carte mentale interactive pour comprendre la
            complexité de cette controverse.
          </p>
          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-all duration-300 hover:gap-5 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Accéder à la cartographie Prezi
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ASavoirPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
            Notre équipe
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">À savoir</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Nous sommes trois étudiants en première année de{" "}
              <strong>Master Marketing & Négociation</strong> à la Business
              School de Clermont-Ferrand.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Dans le cadre de notre cours sur les{" "}
              <strong className="text-emerald-600">
                cartographies des controverses
              </strong>
              , nous avons choisi de travailler sur le thème des déchets
              radioactifs.
            </p>
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-8 rounded-r-2xl">
              <p className="text-lg text-gray-700 leading-relaxed">
                Ce sujet nous tient particulièrement à cœur car il touche à des
                enjeux à la fois{" "}
                <strong>environnementaux, sociétaux et éthiques</strong>, et
                soulève de nombreuses controverses qui méritent d'être mieux
                comprises et discutées.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Notre démarche
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900 mb-2">📚 Recherche</p>
                <p className="text-gray-600 text-sm">
                  Analyse approfondie des sources et acteurs
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900 mb-2">
                  🗺️ Cartographie
                </p>
                <p className="text-gray-600 text-sm">
                  Visualisation des controverses et débats
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900 mb-2">💡 Synthèse</p>
                <p className="text-gray-600 text-sm">
                  Présentation claire et accessible
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
