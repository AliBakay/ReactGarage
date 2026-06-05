import { useState } from "react";
import { SupabaseCarRepository } from "../../infrastructure/supabase/SupabaseCarRepository";
import { Plus, X, Save, CheckCircle } from "lucide-react";
import type { FuelType } from "../../domain/entities/Car";

export default function AdminAddCarPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    price: "",
    mileage: "",
    fuelType: "gasoline" as FuelType,
    description: "",
    featured: false,
    specs: {
      horsepower: "",
      torque: "",
      engine: "",
      transmission: "Automaat",
      drivetrain: "FWD",
      acceleration: "",
      topSpeed: "",
      seating: "5",
      color: "",
      doors: "5",
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        ...formData,
        year: parseInt(formData.year) || 0,
        price: parseFloat(formData.price) || 0,
        mileage: parseInt(formData.mileage) || 0,
        specs: {
          ...formData.specs,
          horsepower: parseInt(formData.specs.horsepower) || 0,
          torque: parseInt(formData.specs.torque) || 0,
          topSpeed: parseInt(formData.specs.topSpeed) || 0,
          seating: parseInt(formData.specs.seating) || 0,
          doors: parseInt(formData.specs.doors) || 0,
        }
      };

      await SupabaseCarRepository.addCar(payload, files);
      setSuccess(true);
      // Reset form
      setFormData({
        make: "", model: "", year: new Date().getFullYear().toString(), price: "", mileage: "",
        fuelType: "gasoline", description: "", featured: false,
        specs: { horsepower: "", torque: "", engine: "", transmission: "Automaat", drivetrain: "FWD", acceleration: "", topSpeed: "", seating: "5", color: "", doors: "5" }
      });
      setFiles([]);
      setPreviews([]);
      window.scrollTo(0, 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Er ging iets mis bij het toevoegen van de auto.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-garage-surface py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-extrabold text-garage-dark">Auto Toevoegen</h1>
          <p className="text-garage-darkSub mt-2">Voeg een nieuw voertuig toe aan de inventaris.</p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl mb-8 flex items-center gap-4">
            <CheckCircle size={24} className="shrink-0" />
            <div>
              <p className="font-bold">Succesvol toegevoegd!</p>
              <p className="text-sm">De auto is nu zichtbaar in de catalogus.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-8">
            <p className="font-bold mb-1">Fout opgetreden</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basis Informatie */}
          <div className="bg-white p-8 rounded-2xl border border-garage-border shadow-sm">
            <h2 className="font-display font-bold text-xl mb-6 text-garage-dark border-b border-garage-border pb-4">Basis Informatie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Merk</label>
                <input type="text" required className="input-light" placeholder="bijv. BMW" value={formData.make} onChange={e => setFormData(p => ({...p, make: e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Model</label>
                <input type="text" required className="input-light" placeholder="bijv. M3 Competition" value={formData.model} onChange={e => setFormData(p => ({...p, model: e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Bouwjaar</label>
                <input type="text" inputMode="numeric" required className="input-light" placeholder="bijv. 2024" value={formData.year} onChange={e => setFormData(p => ({...p, year: e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Prijs</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-garage-muted font-bold">€</span>
                  <input type="text" inputMode="numeric" required className="input-light pl-8" placeholder="45000" value={formData.price} onChange={e => setFormData(p => ({...p, price: e.target.value}))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Kilometerstand (km)</label>
                <input type="text" inputMode="numeric" required className="input-light" placeholder="bijv. 12000" value={formData.mileage} onChange={e => setFormData(p => ({...p, mileage: e.target.value}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Brandstof</label>
                <select className="input-light" value={formData.fuelType} onChange={e => setFormData(p => ({...p, fuelType: e.target.value as FuelType}))}>
                  <option value="gasoline">Benzine</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Elektrisch</option>
                  <option value="hybrid">Hybride</option>
                  <option value="lpg">LPG</option>
                  <option value="other">Andere</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specificaties */}
          <div className="bg-white p-8 rounded-2xl border border-garage-border shadow-sm">
            <h2 className="font-display font-bold text-xl mb-6 text-garage-dark border-b border-garage-border pb-4">Technische Specificaties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Motor</label>
                <input type="text" className="input-light" placeholder="3.0L Twin-Turbo" value={formData.specs.engine} onChange={e => setFormData(p => ({...p, specs: {...p.specs, engine: e.target.value}}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Vermogen (PK)</label>
                <input type="text" inputMode="numeric" className="input-light" placeholder="bijv. 300" value={formData.specs.horsepower} onChange={e => setFormData(p => ({...p, specs: {...p.specs, horsepower: e.target.value}}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Koppel (Nm)</label>
                <input type="text" inputMode="numeric" className="input-light" placeholder="bijv. 450" value={formData.specs.torque} onChange={e => setFormData(p => ({...p, specs: {...p.specs, torque: e.target.value}}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Transmissie</label>
                <input type="text" className="input-light" value={formData.specs.transmission} onChange={e => setFormData(p => ({...p, specs: {...p.specs, transmission: e.target.value}}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Aandrijving</label>
                <input type="text" className="input-light" placeholder="AWD, RWD..." value={formData.specs.drivetrain} onChange={e => setFormData(p => ({...p, specs: {...p.specs, drivetrain: e.target.value}}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">0-100 km/u (sec)</label>
                <input type="text" className="input-light" placeholder="3.8s" value={formData.specs.acceleration} onChange={e => setFormData(p => ({...p, specs: {...p.specs, acceleration: e.target.value}}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Topsnelheid</label>
                <input type="text" inputMode="numeric" className="input-light" placeholder="bijv. 250" value={formData.specs.topSpeed} onChange={e => setFormData(p => ({...p, specs: {...p.specs, topSpeed: e.target.value}}))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Kleur</label>
                <input type="text" className="input-light" value={formData.specs.color} onChange={e => setFormData(p => ({...p, specs: {...p.specs, color: e.target.value}}))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Zitplaatsen</label>
                  <input type="text" inputMode="numeric" className="input-light" placeholder="bijv. 5" value={formData.specs.seating} onChange={e => setFormData(p => ({...p, specs: {...p.specs, seating: e.target.value}}))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Deuren</label>
                  <input type="text" inputMode="numeric" className="input-light" placeholder="bijv. 5" value={formData.specs.doors} onChange={e => setFormData(p => ({...p, specs: {...p.specs, doors: e.target.value}}))} />
                </div>
              </div>
            </div>
          </div>

          {/* Omschrijving & Status */}
          <div className="bg-white p-8 rounded-2xl border border-garage-border shadow-sm">
            <h2 className="font-display font-bold text-xl mb-6 text-garage-dark border-b border-garage-border pb-4">Omschrijving & Status</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-garage-darkSub uppercase tracking-wider mb-2">Omschrijving</label>
                <textarea rows={4} className="input-light resize-y" placeholder="Beschrijf de staat, opties en historie..." value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded text-garage-accent focus:ring-garage-accent border-garage-border" checked={formData.featured} onChange={e => setFormData(p => ({...p, featured: e.target.checked}))} />
                <div>
                  <p className="font-bold text-garage-dark">Uitgelicht (Featured)</p>
                  <p className="text-sm text-garage-darkSub">Toon deze auto op de homepagina.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Foto's */}
          <div className="bg-white p-8 rounded-2xl border border-garage-border shadow-sm">
            <h2 className="font-display font-bold text-xl mb-6 text-garage-dark border-b border-garage-border pb-4">Foto's Uploaden</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {previews.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-garage-border group">
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeFile(idx)} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <X size={16} />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-2 left-2 bg-garage-accent text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase">
                      Hoofdfoto
                    </span>
                  )}
                </div>
              ))}
              
              <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-garage-border hover:border-garage-accent hover:bg-red-50 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-red-100 rounded-full flex items-center justify-center text-garage-muted group-hover:text-garage-accent mb-2 transition-colors">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-medium text-garage-darkSub group-hover:text-garage-accent">Foto toevoegen</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Acties */}
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={loading} className="btn-primary py-4 px-8 flex items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
              {loading ? "Opslaan..." : "Voertuig Opslaan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
