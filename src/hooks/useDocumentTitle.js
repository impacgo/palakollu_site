import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPlaces, getPackages } from "../lib/contentStore";

const DEFAULT_TITLE = "Palakollu Trails | Godavari Delta Village Experiences";

const STATIC_TITLES = {
  "/places": "Places Around Palakollu | Palakollu Trails",
  "/packages": "Curated Journeys | Palakollu Trails",
  "/about": "About | Palakollu Trails",
  "/contact": "Contact | Palakollu Trails",
  "/admin": "Admin Login | Palakollu Trails",
  "/admin/dashboard": "Dashboard | Palakollu Trails Admin",
  "/admin/packages": "Manage Packages | Palakollu Trails Admin",
  "/admin/places": "Manage Places | Palakollu Trails Admin",
  "/admin/enquiries": "Enquiries | Palakollu Trails Admin",
  "/admin/settings": "Settings | Palakollu Trails Admin",
};

export default function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const placeMatch = location.pathname.match(/^\/places\/([^/]+)/);
    const pkgMatch = location.pathname.match(/^\/packages\/([^/]+)/);
    const adminPlaceMatch = location.pathname.match(/^\/admin\/places\/([^/]+)/);
    const adminPkgMatch = location.pathname.match(/^\/admin\/packages\/([^/]+)/);

    let title = STATIC_TITLES[location.pathname] || DEFAULT_TITLE;

    if (adminPlaceMatch) {
      const place = getPlaces().find((p) => p.id === adminPlaceMatch[1]);
      title = place ? `Edit ${place.name} | Palakollu Trails Admin` : "Edit Place | Palakollu Trails Admin";
    } else if (adminPkgMatch) {
      const pkg = getPackages().find((p) => p.id === adminPkgMatch[1]);
      title = pkg ? `Edit ${pkg.title} | Palakollu Trails Admin` : "Edit Journey | Palakollu Trails Admin";
    } else if (placeMatch) {
      const place = getPlaces().find((p) => p.id === placeMatch[1]);
      title = place ? `${place.name} | Palakollu Trails` : "Place Not Found | Palakollu Trails";
    } else if (pkgMatch) {
      const pkg = getPackages().find((p) => p.id === pkgMatch[1]);
      title = pkg ? `${pkg.title} | Palakollu Trails` : "Journey Not Found | Palakollu Trails";
    }

    document.title = title;
  }, [location.pathname]);
}
