import { supabase } from "./client";
import type { Review } from "../../domain/entities/Review";

export class SupabaseReviewRepository {
  private static mapRowToReview(row: any): Review {
    return {
      id: row.id,
      name: row.name,
      carBought: row.car_bought,
      text: row.text,
      avatar: row.avatar,
      published: row.published,
      createdAt: new Date(row.created_at),
    };
  }

  static async getPublishedReviews(): Promise<Review[]> {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }

    return (data || []).map(this.mapRowToReview);
  }

  static async getAdminReviews(): Promise<Review[]> {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map(this.mapRowToReview);
  }

  static async addReview(review: Omit<Review, "id" | "createdAt">): Promise<void> {
    const { error } = await supabase.from("reviews").insert([
      {
        name: review.name,
        car_bought: review.carBought,
        text: review.text,
        avatar: review.avatar,
        published: review.published,
      },
    ]);

    if (error) throw error;
  }

  static async updateReview(id: string, review: Partial<Omit<Review, "id" | "createdAt">>): Promise<void> {
    const updateData: any = {};
    if (review.name !== undefined) updateData.name = review.name;
    if (review.carBought !== undefined) updateData.car_bought = review.carBought;
    if (review.text !== undefined) updateData.text = review.text;
    if (review.avatar !== undefined) updateData.avatar = review.avatar;
    if (review.published !== undefined) updateData.published = review.published;

    const { error } = await supabase.from("reviews").update(updateData).eq("id", id);
    if (error) throw error;
  }

  static async deleteReview(id: string): Promise<void> {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) throw error;
  }
}
