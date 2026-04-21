"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

// Load script once at module level
function loadGoogleMapsScript() {
  if (typeof window === "undefined") return;
  if (document.getElementById("google-maps-script")) return;
  if (window.google?.maps?.places) return;

  const script = document.createElement("script");
  script.id = "google-maps-script";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=tr`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Call immediately when module loads
loadGoogleMapsScript();

export default function PlacesAutocomplete({ placeholder, onSelect, value }) {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceTimer = useRef(null);
  const serviceRef = useRef(null);

  // Poll until google.maps.places is ready
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        serviceRef.current =
          new window.google.maps.places.AutocompleteService();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const fetchSuggestions = (val) => {
    if (!val || val.length < 2 || !serviceRef.current) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    serviceRef.current.getPlacePredictions(
      {
        input: val,
        componentRestrictions: { country: "tr" },
        language: "tr",
      },
      (predictions, status) => {
        setLoading(false);
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
          setOpen(true);
        } else {
          setSuggestions([]);
          setOpen(false);
        }
      }
    );
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);

    // Reset placeId if user types manually after selecting
    onSelect({ location: val, placeId: "" });

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelect = (prediction) => {
    const location = prediction.description;
    const placeId = prediction.place_id;

    setInputValue(location);
    setSuggestions([]);
    setOpen(false);
    onSelect({ location, placeId });
  };

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin
          size={14}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 z-10"
        />
        {loading && (
          <Loader2
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/40 animate-spin"
          />
        )}
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onBlur={handleBlur}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-card border border-border/60 focus:border-gold/60 text-foreground text-sm placeholder:text-muted-foreground/40 pl-10 pr-10 py-4 outline-none transition-colors duration-200"
        />
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-border/60 bg-card shadow-xl shadow-black/40 overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
          {suggestions.map((pred) => (
            <button
              key={pred.place_id}
              type="button"
              onMouseDown={() => handleSelect(pred)}
              className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-secondary/60 transition-colors duration-150 border-b border-border/20 last:border-b-0"
            >
              <MapPin size={13} className="text-gold/50 mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm text-foreground">
                  {pred.structured_formatting?.main_text}
                </span>
                <span className="text-xs text-muted-foreground">
                  {pred.structured_formatting?.secondary_text}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}