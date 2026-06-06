import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SupabaseReviewRepository } from "../../infrastructure/supabase/SupabaseReviewRepository";
import type { Review } from "../../domain/entities/Review";
import { CheckCircle, XCircle, Trash2, Plus, Edit2, X, Save, MessageSquare } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    carBought: "",
    text: "",
    avatar: "",
    published: true,
  });

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const data = await SupabaseReviewRepository.getAdminReviews();
      setReviews(data);
    } catch (error) {
      console.error("Failed to load reviews", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Weet u zeker dat u deze review wilt verwijderen?")) return;
    try {
      await SupabaseReviewRepository.deleteReview(id);
      loadReviews();
    } catch (error) {
      alert("Fout bij verwijderen van review.");
    }
  };

  const togglePublish = async (review: Review) => {
    try {
      await SupabaseReviewRepository.updateReview(review.id, { published: !review.published });
      loadReviews();
    } catch (error) {
      alert("Fout bij bijwerken status.");
    }
  };

  const openModal = (review?: Review) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        name: review.name,
        carBought: review.carBought,
        text: review.text,
        avatar: review.avatar,
        published: review.published,
      });
    } else {
      setEditingReview(null);
      setFormData({
        name: "",
        carBought: "",
        text: "",
        avatar: "",
        published: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await SupabaseReviewRepository.updateReview(editingReview.id, formData);
      } else {
        await SupabaseReviewRepository.addReview(formData);
      }
      setIsModalOpen(false);
      loadReviews();
    } catch (error) {
      alert("Fout bij opslaan van review.");
    }
  };

  return (
    <div className="min-h-screen bg-garage-surface py-28 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Admin Navigation Header */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl border border-garage-border shadow-sm">
          <div className="flex gap-4">
            <Link to="/beheerpaneel" className="px-5 py-2.5 rounded-xl font-bold text-garage-darkSub hover:bg-slate-50 transition-colors">
              Voorraad
            </Link>
            <Link to="/beheerpaneel/reviews" className="px-5 py-2.5 rounded-xl font-bold bg-slate-100 text-garage-dark">
              Reviews
            </Link>
          </div>
          <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 py-2.5">
            <Plus size={18} /> Nieuwe Review
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-extrabold text-garage-dark">Reviews Beheren</h1>
          <p className="text-garage-darkSub mt-2">
            Voeg handmatig klantervaringen toe (bijv. gekopieerd vanuit Google) en bepaal welke zichtbaar zijn op de homepage.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-garage-border shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-garage-darkSub">Reviews laden...</div>
          ) : reviews.length === 0 ? (
            <div className="p-16 text-center">
              <MessageSquare size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-garage-dark font-bold mb-1">Nog geen reviews</p>
              <p className="text-garage-darkSub text-sm mb-6">Voeg de eerste klantervaring toe om te tonen op de homepage.</p>
              <button onClick={() => openModal()} className="btn-primary inline-flex items-center gap-2">
                <Plus size={18} /> Voeg review toe
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-garage-bg text-white">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Klant</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Gekocht</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Review</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">Zichtbaar</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-garage-border">
                  {reviews.map(review => (
                    <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-garage-accent/10 text-garage-accent font-bold flex items-center justify-center text-xs">
                            {review.avatar}
                          </div>
                          <span className="font-bold text-garage-dark">{review.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-garage-darkSub">
                        {review.carBought}
                      </td>
                      <td className="px-6 py-4 text-sm text-garage-darkSub max-w-xs truncate">
                        {review.text}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => togglePublish(review)}
                          className={`p-2 rounded-xl transition-colors ${review.published ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-slate-400 bg-slate-100 hover:bg-slate-200'}`}
                          title={review.published ? 'Klik om te verbergen' : 'Klik om te publiceren'}
                        >
                          {review.published ? <CheckCircle size={20} /> : <XCircle size={20} />}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openModal(review)} className="p-2 text-garage-darkSub hover:text-garage-accent bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(review.id)} className="p-2 text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-garage-muted hover:text-garage-dark transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="font-display text-2xl font-bold text-garage-dark mb-6">
                {editingReview ? "Review Bewerken" : "Review Toevoegen"}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-garage-darkSub mb-1.5">Naam Klant</label>
                  <input type="text" required className="input-light" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-garage-darkSub mb-1.5">Initialen (bijv. AB)</label>
                  <input type="text" required maxLength={2} className="input-light uppercase" value={formData.avatar} onChange={e => setFormData(p => ({...p, avatar: e.target.value.toUpperCase()}))} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-garage-darkSub mb-1.5">Gekochte Auto (Optioneel)</label>
                  <input type="text" className="input-light" placeholder="bijv. BMW M4" value={formData.carBought} onChange={e => setFormData(p => ({...p, carBought: e.target.value}))} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-garage-darkSub mb-1.5">Review Tekst</label>
                  <textarea required rows={4} className="input-light resize-none" value={formData.text} onChange={e => setFormData(p => ({...p, text: e.target.value}))} />
                </div>
                <label className="flex items-center gap-3 cursor-pointer py-2">
                  <input type="checkbox" className="w-5 h-5 rounded text-garage-accent focus:ring-garage-accent" checked={formData.published} onChange={e => setFormData(p => ({...p, published: e.target.checked}))} />
                  <span className="font-bold text-garage-dark">Direct publiceren op homepage</span>
                </label>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-garage-darkSub hover:bg-slate-100 rounded-xl transition-colors">
                    Annuleren
                  </button>
                  <button type="submit" className="btn-primary py-3 px-6 flex items-center gap-2">
                    <Save size={18} /> Opslaan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
