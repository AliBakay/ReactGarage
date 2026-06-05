import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, ExternalLink, Search } from "lucide-react";
import { SupabaseCarRepository } from "../../infrastructure/supabase/SupabaseCarRepository";
import type { Car } from "../../domain/entities/Car";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    setLoading(true);
    try {
      const data = await SupabaseCarRepository.getAdminCars();
      setCars(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je deze auto wilt verwijderen? Dit wist ook alle foto's!")) return;
    try {
      await SupabaseCarRepository.deleteCar(id);
      setCars(p => p.filter(c => c.id !== id));
    } catch (err) {
      alert("Fout bij verwijderen: " + (err as Error).message);
    }
  }

  const filteredCars = cars.filter(c => 
    c.make.toLowerCase().includes(search.toLowerCase()) || 
    c.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display font-black text-3xl text-garage-dark mb-2">Beheerpaneel</h1>
            <p className="text-garage-darkSub text-sm">Beheer je wagenpark, pas auto's aan en publiceer nieuwe occasions.</p>
          </div>
          <Link
            to="/beheerpaneel/toevoegen"
            className="flex items-center gap-2 bg-garage-accent text-white px-5 py-2.5 rounded-xl font-bold hover:bg-garage-accent2 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={18} /> Nieuwe Auto Toevoegen
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Zoek op merk of model..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full font-medium"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Auto</th>
                  <th className="px-6 py-4">Prijs</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Auto's laden...</td></tr>
                ) : filteredCars.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Geen auto's gevonden.</td></tr>
                ) : (
                  filteredCars.map(car => (
                    <motion.tr 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      key={car.id} 
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={car.imagesUrl[0] || 'https://placehold.co/100x100?text=Geen+Foto'} alt={car.model} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <p className="font-bold text-garage-dark">{car.make} {car.model}</p>
                            <p className="text-xs text-slate-500">{car.year} • {car.mileage} km</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-display font-bold text-garage-dark">
                        €{car.price.toLocaleString('nl-NL')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          car.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {car.status === 'published' ? 'Online' : 'Concept'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/cars/${car.id}`} target="_blank" className="p-2 text-slate-400 hover:text-garage-accent hover:bg-slate-100 rounded-lg transition-colors" title="Bekijk op website">
                            <ExternalLink size={16} />
                          </Link>
                          <Link to={`/beheerpaneel/bewerken/${car.id}`} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-slate-100 rounded-lg transition-colors" title="Bewerken">
                            <Edit2 size={16} />
                          </Link>
                          <button onClick={() => handleDelete(car.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors" title="Verwijderen">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
