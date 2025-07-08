import { supabase } from '../supabase';
import type { BlogPost, BlogCategory } from '../supabase';

export interface BlogFilters {
  category?: string;
  published?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export class BlogAPI {
  // Get all blog categories
  static async getCategories(): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  // Get all blog posts with filters
  static async getPosts(filters: BlogFilters = {}): Promise<BlogPost[]> {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        images:blog_images(*)
      `);

    // Apply filters
    if (filters.category && filters.category !== 'All') {
      query = query.eq('category.slug', filters.category.toLowerCase().replace(/\s+/g, '-'));
    }

    if (filters.published !== undefined) {
      query = query.eq('published', filters.published);
    } else {
      // Default to published posts only for public access
      query = query.eq('published', true);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
    }

    // Apply pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    // Order by published date (newest first)
    query = query.order('published_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    // Process the data to sort images
    return (data || []).map(post => ({
      ...post,
      images: post.images?.sort((a, b) => a.sort_order - b.sort_order) || []
    }));
  }

  // Get single blog post by ID or slug
  static async getPost(identifier: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        images:blog_images(*)
      `)
      .or(`id.eq.${identifier},slug.eq.${identifier}`)
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    if (!data) return null;

    // Sort images
    return {
      ...data,
      images: data.images?.sort((a, b) => a.sort_order - b.sort_order) || []
    };
  }

  // Get related posts (same category, excluding current post)
  static async getRelatedPosts(postId: string, categoryId?: string, limit = 3): Promise<BlogPost[]> {
    if (!categoryId) return [];

    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        images:blog_images(*)
      `)
      .eq('category_id', categoryId)
      .eq('published', true)
      .neq('id', postId)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map(post => ({
      ...post,
      images: post.images?.sort((a, b) => a.sort_order - b.sort_order) || []
    }));
  }

  // Create a new blog post (admin only)
  static async createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update a blog post (admin only)
  static async updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete a blog post (admin only)
  static async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Add blog image
  static async addPostImage(postId: string, imageData: {
    image_url: string;
    alt_text?: string;
    sort_order?: number;
  }): Promise<void> {
    const { error } = await supabase
      .from('blog_images')
      .insert({
        blog_post_id: postId,
        ...imageData
      });

    if (error) throw error;
  }

  // Get recent posts for homepage
  static async getRecentPosts(limit = 3): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}